// Demo animada de SimplePipeline ("Caso Viajes"): un mensaje recorre router → agente → integración.
// Cada nodo tiene su posición en dos diseños (ver FLOW_LAYOUTS): `h` horizontal (desktop/tablet) y
// `v` vertical (celular). Todos los nodos de un diseño tienen la misma altura, así las conexiones quedan alineadas.
export const FLOW_LAYOUTS = {
  h: { w: 1025, h: 310, nodeH: 66, compact: false },
  v: { w: 340, h: 490, nodeH: 46, compact: true },
};

export const FLOW_NODES = {
  entrada: {
    t: 'Mensaje entrante',
    d: 'WhatsApp o Web',
    badge: 'Inicio',
    dot: '#28c76f',
    h: { x: 0, y: 132, w: 160 },
    v: { x: 95, y: 0, w: 150 },
  },
  router: {
    t: 'Router',
    d: 'Clasifica la intención',
    badge: 'Clasificar',
    dot: '#ff9f43',
    h: { x: 205, y: 132, w: 160 },
    v: { x: 95, y: 92, w: 150 },
  },
  ventas: {
    t: 'Ventas',
    d: 'Paquetes y vuelos',
    badge: 'Agente',
    engine: 'motor IA · A',
    dot: '#00249C',
    h: { x: 410, y: 24, w: 170 },
    v: { x: 0, y: 200, w: 104 },
  },
  postventa: {
    t: 'Postventa',
    d: 'Cambios y reclamos',
    badge: 'Agente',
    engine: 'motor IA · C',
    dot: '#00249C',
    h: { x: 410, y: 132, w: 170 },
    v: { x: 118, y: 200, w: 104 },
  },
  faq: {
    t: 'FAQ',
    d: 'Preguntas frecuentes',
    badge: 'Agente',
    engine: 'motor IA · B',
    dot: '#00249C',
    h: { x: 410, y: 240, w: 170 },
    v: { x: 236, y: 200, w: 104 },
  },
  api: {
    t: 'Sistema de reservas',
    d: 'Disponibilidad y emisión',
    badge: 'Integración',
    dot: '#1e9aff',
    h: { x: 630, y: 24, w: 190 },
    v: { x: 0, y: 320, w: 172 },
  },
  venta: {
    t: 'Venta confirmada',
    d: 'Link de pago enviado',
    badge: 'Fin',
    dot: '#28c76f',
    h: { x: 850, y: 24, w: 175 },
    v: { x: 0, y: 440, w: 172 },
  },
  fin: {
    t: 'Consulta resuelta',
    d: 'Fin de la asistencia',
    badge: 'Fin',
    dot: '#28c76f',
    h: { x: 630, y: 186, w: 190 },
    v: { x: 192, y: 320, w: 148 },
  },
};

// [desde, hasta]
export const FLOW_EDGES = [
  ['entrada', 'router'],
  ['router', 'ventas'],
  ['router', 'postventa'],
  ['router', 'faq'],
  ['ventas', 'api'],
  ['api', 'venta'],
  ['postventa', 'fin'],
  ['faq', 'fin'],
];

export const FLOW_SCENARIOS = [
  { msg: 'Hola, quiero irme de viaje a la playa', path: ['entrada', 'router', 'ventas', 'api', 'venta'] },
  { msg: 'Me cambiaron el horario del vuelo', path: ['entrada', 'router', 'postventa', 'fin'] },
  { msg: '¿Qué documentos necesito para viajar?', path: ['entrada', 'router', 'faq', 'fin'] },
];

export const AI_ENGINES = [
  { name: 'Claude', icon: 'https://cdn.simpleicons.org/claude/F9F6EE' },
  { name: 'OpenAI' },
  { name: 'Grok' },
  { name: 'Gemini', icon: 'https://cdn.simpleicons.org/googlegemini/F9F6EE' },
  { name: 'Copilot', icon: 'https://cdn.simpleicons.org/githubcopilot/F9F6EE' },
  { name: 'Komo' },
];
