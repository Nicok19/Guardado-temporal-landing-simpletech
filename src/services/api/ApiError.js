/**
 * Error normalizado de la API.
 * - status: código HTTP (0 si no hubo respuesta: red caída, timeout, CORS).
 * - fieldErrors: { campo: 'mensaje' } para mostrar errores por input en los formularios.
 */
export class ApiError extends Error {
  constructor(message, { status = 0, code = null, fieldErrors = {}, details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.details = details;
  }

  get isNetworkError() {
    return this.status === 0;
  }

  get isValidationError() {
    return this.status === 400 || this.status === 422;
  }
}
