import { isBlank, isEmail } from '@/utils/validators';
import { CONTACT_DEFAULT_INTERESTS } from '@/data/contact';

export const CONTACT_INITIAL_VALUES = {
  name: '',
  company: '',
  email: '',
  interests: CONTACT_DEFAULT_INTERESTS,
  message: '',
};

/**
 * Validación del lado del cliente. El backend debe validar lo mismo (y puede devolver más errores).
 * Obligatorios: nombre, empresa, email válido y al menos una opción de "Me interesa".
 */
export function validateContact(v) {
  const errors = {};
  if (isBlank(v.name)) errors.name = 'Ingresá tu nombre.';
  if (isBlank(v.company)) errors.company = 'Ingresá tu empresa.';
  if (isBlank(v.email)) errors.email = 'Ingresá tu email.';
  else if (!isEmail(v.email)) errors.email = 'Revisá el formato del email.';
  if (!v.interests.length) errors.interests = 'Elegí al menos una opción.';
  return errors;
}

/** true si los obligatorios están completos (habilita el botón de enviar). */
export const isContactComplete = (v) => Object.keys(validateContact(v)).length === 0;

/** Valores del formulario → payload que recibe el backend (ContactRequest). */
export const toContactRequest = (v, source) => ({
  name: v.name.trim(),
  company: v.company.trim(),
  email: v.email.trim(),
  interests: v.interests,
  message: v.message.trim(),
  source,
});
