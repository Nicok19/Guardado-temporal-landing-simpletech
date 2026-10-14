import { env } from '@/config/env';
import { http } from './api/httpClient';
import { ENDPOINTS } from './api/endpoints';
import { mockResponse } from './api/mock';

/**
 * @typedef {Object} NewsletterRequest
 * @property {string}   email
 * @property {string}   name     opcional
 * @property {string[]} topics   ids de NEWSLETTER_TOPICS (opcional)
 * @property {string}   lang     idioma de la página: 'es' | 'en' | 'pt' | 'fr'
 * @property {string}   source   página desde la que se suscribió (ej. "/blog")
 *
 * @typedef {Object} NewsletterResponse
 * @property {string} id
 */

/** Suscribe al newsletter. @param {NewsletterRequest} payload @returns {Promise<NewsletterResponse>} */
export function subscribeNewsletter(payload, { signal } = {}) {
  if (env.useMocks) {
    if (env.isDev) console.info('[mock] POST', ENDPOINTS.newsletter.subscribe, payload);
    return mockResponse({ id: `mock-${Date.now()}` }, 900);
  }
  return http.post(ENDPOINTS.newsletter.subscribe, payload, { signal });
}
