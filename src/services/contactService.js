import { env } from '@/config/env';
import { CONTACT_INTERESTS } from '@/data/contact';
import { http } from './api/httpClient';
import { ENDPOINTS } from './api/endpoints';
import { mockResponse } from './api/mock';

/**
 * @typedef {Object} InterestOption
 * @property {string} id     Valor que se envía al backend.
 * @property {string} label  Texto visible.
 *
 * @typedef {Object} ContactRequest
 * @property {string}   name
 * @property {string}   company
 * @property {string}   email
 * @property {string[]} interests  ids de InterestOption
 * @property {string}   message
 * @property {string}   source     página desde la que se envió (ej. "/partners")
 *
 * @typedef {Object} ContactResponse
 * @property {string} id
 */

/** Opciones de "Me interesa". @returns {Promise<InterestOption[]>} */
export function getContactInterests({ signal } = {}) {
  if (env.useMocks) return mockResponse(CONTACT_INTERESTS, 250);
  return http.get(ENDPOINTS.contact.interests, { signal });
}

/** Envía el formulario de contacto. @param {ContactRequest} payload @returns {Promise<ContactResponse>} */
export function submitContactRequest(payload, { signal } = {}) {
  if (env.useMocks) {
    if (env.isDev) console.info('[mock] POST', ENDPOINTS.contact.submit, payload);
    return mockResponse({ id: `mock-${Date.now()}` }, 900);
  }
  return http.post(ENDPOINTS.contact.submit, payload, { signal });
}
