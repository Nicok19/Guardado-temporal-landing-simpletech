// Contenido de las animaciones de la Home.
// Textos del hero (se escriben con efecto máquina de escribir: ver hero/Typewriter.astro).
// `highlight` = parte del título que va en dorado (tiene que estar dentro de `text`).
export const HERO_TITLE = { text: 'Convertimos conversaciones en resultados', highlight: 'resultados' };
export const HERO_SUBTITLE = 'Conecta, resuelve y escala';

// ---- Animación del hero ------------------------------------------------------------------
// Una sola animación en loop: conversación → pipeline → llamada → (vuelve a empezar).
// `ms` = cuánto dura cada escena. Las transiciones (fade + escala) duran HERO_FADE_MS y se
// superponen con el final de la escena que sale. HERO_TICK_MS = ritmo de los pasos internos.
export const HERO_TICK_MS = 1300;
export const HERO_FADE_MS = 900;
export const HERO_SCENES = [
  { id: 'chat', ms: 9100 },
  { id: 'pipeline', ms: 7800 },
  { id: 'voice', ms: 7800 },
];

// Escena 1 · Conversación. `agent: true` = mensaje del lado de la empresa (antes muestra "escribiendo…").
export const HERO_CHAT_TYPING = 'escribiendo…'; // texto para lectores de pantalla del indicador
export const HERO_CHAT = [
  { who: 'Cliente', t: 'Hola, ¿dónde está mi envío?' },
  { who: 'Agente', t: 'Tu pedido #48213 llega hoy entre 14 y 16 h.', agent: true },
  { who: 'Cliente', t: '¡Perfecto, gracias!' },
];

// Escena 2 · Pipeline (estilo n8n). La posición de cada nodo está en hero/PipelineScene.jsx.
export const HERO_FLOW = [
  { id: 'entrada', t: 'Mensaje entrante', sub: 'WhatsApp', color: '#28c76f' },
  {
    id: 'agente',
    t: 'Agente IA',
    sub: 'consulta el pedido',
    color: '#7367f0',
  },
  { id: 'resultado', t: 'Respuesta', sub: 'al cliente', color: '#28c76f' },
];

// Escena 3 · Llamada de voz.
export const HERO_VOICE = {
  agent: 'Asistente de voz IA',
  status: 'Llamada en curso',
  initials: 'IA',
};

export const TELEPHONY_ITEMS = [
  { i: '☏', t: 'Telefonía IP · UCaaS', d: 'Central telefónica en la nube, escalable y con el mayor ROI.' },
  { i: '◎', t: 'Contact Center · CCaaS', d: 'Colas, IVR y supervisión en tiempo real.' },
  { i: '∿', t: 'VoiceBots con IA', d: 'Atención telefónica que comprende y resuelve 24/7.' },
  { i: '⌗', t: 'Infraestructura VoIP', d: 'Hardware, cableado estructurado y networking.' },
];
