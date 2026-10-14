// Variables de entorno (ver .env.example). Solo las que empiezan con PUBLIC_ llegan al navegador.
const apiBaseUrl = (import.meta.env.PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

export const env = {
  apiBaseUrl,
  // Sin backend configurado se usan mocks, así los formularios funcionan igual.
  useMocks: !apiBaseUrl || import.meta.env.PUBLIC_USE_MOCKS === 'true',
  apiTimeoutMs: Number(import.meta.env.PUBLIC_API_TIMEOUT_MS) || 15000,
  isDev: import.meta.env.DEV,
};
