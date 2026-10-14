import { env } from '@/config/env';
import { ApiError } from './ApiError';

const DEFAULT_ERROR = 'No pudimos completar la solicitud. Intentá de nuevo en unos minutos.';

function buildUrl(path, params) {
  const url = `${env.apiBaseUrl}${path}`;
  if (!params) return url;
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ).toString();
  return qs ? `${url}?${qs}` : url;
}

async function parseBody(res) {
  const type = res.headers.get('content-type') || '';
  if (res.status === 204) return null;
  return type.includes('application/json') ? res.json() : res.text();
}

/**
 * Wrapper de fetch: JSON por defecto, timeout, cancelación y errores normalizados (ApiError).
 *
 * Contrato de error esperado del backend (flexible):
 *   { "message": "...", "code": "...", "errors": { "email": "Email inválido" } }
 */
export async function request(
  path,
  { method = 'GET', body, params, headers, signal, timeoutMs = env.apiTimeoutMs } = {},
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new DOMException('Timeout', 'TimeoutError')), timeoutMs);
  if (signal) signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true });

  let res;
  try {
    res = await fetch(buildUrl(path, params), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (signal?.aborted) throw err; // cancelado por quien llamó: no es un error a mostrar
    const timedOut = controller.signal.reason?.name === 'TimeoutError';
    throw new ApiError(timedOut ? 'El servidor tardó demasiado en responder.' : DEFAULT_ERROR, { status: 0 });
  } finally {
    clearTimeout(timer);
  }

  const data = await parseBody(res).catch(() => null);
  if (!res.ok) {
    const payload = data && typeof data === 'object' ? data : {};
    throw new ApiError(payload.message || DEFAULT_ERROR, {
      status: res.status,
      code: payload.code ?? null,
      fieldErrors: payload.errors ?? {},
      details: data,
    });
  }
  return data;
}

export const http = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
