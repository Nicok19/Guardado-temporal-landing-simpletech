// Fallback local de las opciones del formulario (el backend las sirve en GET /contact/interests).
export const CONTACT_INTERESTS = [
  { id: 'simplesuite', label: 'SimpleSuite' },
  { id: 'ia-conversacional', label: 'IA Conversacional' },
  { id: 'contact-center', label: 'Contact Center' },
  { id: 'partner', label: 'Ser partner' },
];

// Opciones que no se ofrecen en el formulario aunque el backend las mande.
export const CONTACT_HIDDEN_INTERESTS = ['simplepipeline'];

// Sin opción preelegida: "Me interesa" es obligatorio y la persona tiene que elegir.
export const CONTACT_DEFAULT_INTERESTS = [];
