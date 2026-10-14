// Rutas del backend, relativas a VITE_API_BASE_URL. Centralizadas para cambiarlas en un solo lugar.
export const ENDPOINTS = {
  contact: {
    submit: '/contact', // POST  → ContactRequest
    interests: '/contact/interests', // GET   → InterestOption[]
  },
};
