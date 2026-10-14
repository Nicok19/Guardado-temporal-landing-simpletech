import { suiteModulePath } from '@/config/routes';

// Contenido de las páginas de Ecosistema: /ecosistema, /ecosistema/partners, /ecosistema/api y /ecosistema/ia-conversacional.

// Fotos: las de las páginas originales de simpletech.uy, o de Unsplash con licencia gratuita
// (images.unsplash.com/photo-…). Nunca de Unsplash+ (plus.unsplash.com/premium_photo-…), que es paga.
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&w=1600&auto=format&fit=crop`;

// Foto ancha debajo del encabezado de cada página (PhotoBand)
export const ECOSISTEMA_PHOTOS = {
  ecosistema: {
    src: unsplash('1522071820081-009f0129c71c'),
    alt: 'Equipo trabajando en conjunto alrededor de una mesa con laptops',
  },
  partners: {
    src: unsplash('1521791136064-7986c2920216'),
    alt: 'Dos personas dándose la mano en una oficina',
  },
  api: {
    src: unsplash('1555066931-4365d14bab8c'),
    alt: 'Código en la pantalla de una laptop',
  },
  ia: {
    src: unsplash('1593733925160-6f78dc0be8b6'),
    alt: 'Persona escribiendo un mensaje en su celular',
    position: 'center 40%',
  },
};
export const API_CHANNELS = ['WhatsApp', 'Instagram', 'Facebook', 'SMS', 'Webchat'];

export const API_BENEFITS = [
  {
    n: '01',
    k: 'Ahorro de tiempo y dinero',
    t: 'Recursos más eficientes',
    d: 'No necesitás un equipo de desarrollo interno especializado para integrar interfaces y aplicaciones empresariales.',
  },
  {
    n: '02',
    k: 'Foco en lo importante',
    t: 'Talento mejor aprovechado',
    d: 'Las integraciones con la API evitan desarrollos complejos y tus expertos pueden dedicarse a proyectos más desafiantes.',
  },
  {
    n: '03',
    k: 'Transformación digital',
    t: 'La tecnología a tu servicio',
    d: 'Las integraciones resueltas con nuestra API llevan tu negocio hacia nuevas tecnologías.',
  },
  {
    n: '04',
    k: 'Mejora integral de la experiencia',
    t: 'Revolucioná tu CX',
    d: 'Automatizá las operaciones de tu negocio y hacé más eficiente cada interacción con tus clientes.',
  },
];

export const IA_HIGHLIGHTS = [
  'Resolución inteligente e instantánea',
  'IA entrenada a tu medida',
  'Ninguna conversación perdida',
  'IA que entiende intenciones',
];

// IA integrada en cada módulo de SimpleSuite
export const IA_MODULES = [
  {
    t: 'Automatización inteligente 24/7',
    d: 'Bots con IA que entienden intenciones, gestionan procesos y resuelven consultas sin intervención humana.',
    module: 'SimpleBots',
    href: suiteModulePath('simplebots'),
  },
  {
    t: 'Agentes humanos potenciados por IA',
    d: 'Funcionalidades con IA que aceleran la atención y multiplican la productividad del equipo en tiempo real.',
    module: 'SimpleAgents',
    href: suiteModulePath('simpleagents'),
  },
  {
    t: 'Campañas que activan experiencias con IA',
    d: 'Tus envíos masivos se convierten en experiencias asistidas por IA cuando los usuarios contestan.',
    module: 'SimpleSend',
    href: suiteModulePath('simplesend'),
  },
  {
    t: 'Datos para mejorar la experiencia',
    d: 'Insights conversacionales, métricas predictivas y dashboards que impulsan decisiones inteligentes.',
    module: 'SimpleStats',
    href: suiteModulePath('simplestats'),
  },
];

export const IA_INTEGRATION = [
  'Consultar información de tus sistemas para responder mejor',
  'Registrar información o solicitudes internas',
  'Conectar múltiples procesos en un único flujo',
  'Actualizar información en tiempo real',
  'Ejecutar acciones sin intervención manual',
];

// Funcionalidades con IA para los agentes humanos
export const IA_AGENT_FEATURES = [
  {
    t: 'Resumen de conversación',
    d: 'Un panorama completo de cada interacción en segundos: puntos clave, desarrollo de la conversación y resultado final.',
  },
  {
    t: 'Sentimientos e intenciones',
    d: 'La IA identifica emociones, estados de ánimo e intenciones, incluso cuando no se dicen de forma explícita, para responder con empatía y criterio.',
  },
  {
    t: 'Speech to text',
    d: 'Transcribe audios en tiempo real a texto claro y accionable, listo para analizar, buscar o responder sin volver a escuchar.',
  },
  {
    t: 'Tags y respuestas sugeridas',
    d: 'Sugiere etiquetas y respuestas frecuentes según el contenido de cada conversación, detectando temas, motivos y contexto.',
  },
  {
    t: 'Resumen de documentos',
    d: 'Interpreta el documento, analiza su estructura y contenido, y lo transforma en un resumen claro y ordenado.',
  },
  {
    t: 'Desglose de datos',
    d: 'Organiza la información principal del documento: datos clave, importes, fechas relevantes y conceptos.',
  },
];

export const IA_WHATSAPP_BENEFITS = [
  'Resolución más rápida y eficiente en WhatsApp',
  'Menos tiempo de espera en situaciones críticas',
  'Mayor tasa de resolución en el primer contacto',
  'Respuestas claras, incluso ante la frustración',
  'Atención escalable que potencia al equipo humano',
];

// Bloques destacados al pie de /ecosistema/ia-conversacional
export const IA_SPOTLIGHTS = [
  {
    k: 'VOICEBOT',
    t: 'Automatizá tus llamadas',
    img: {
      src: unsplash('1766066014237-00645c74e9c6'),
      alt: 'Operadora con auricular atendiendo en un contact center',
    },
    d: 'Llamadas entrantes y salientes atendidas por un agente de IA de voz que entiende y resuelve.',
    items: [
      'Comprende lenguaje natural en llamadas reales',
      'Responde con tono empático y adaptado al usuario',
      'Consulta o registra datos en CRM, ERP o sistemas internos',
      'Deriva a un operador en WhatsApp con todo el contexto',
      'Conversa naturalmente, sin los límites de un IVR',
      'Gestiona consultas, reclamos, turnos, cobranzas y más',
    ],
  },
  {
    k: 'BIOMETRÍA',
    t: 'Transacciones seguras en WhatsApp',
    img: {
      src: unsplash('1677442135730-64f105e0ea05'),
      alt: 'Dos rostros en 3D con malla de reconocimiento facial',
    },
    d: 'Verificación de identidad con IA para operaciones sensibles, firmas digitales y validaciones dentro del chat.',
    items: ['Biometría de voz', 'Biometría facial', 'Firma digital y OCR', 'Verificación de liveness'],
  },
];

// Página /ecosistema: la intención detrás del ecosistema.
export const ECOSISTEMA_PRINCIPLES = [
  {
    t: 'Sumar, no reemplazar',
    d: 'Nos integramos con lo que tu empresa ya usa: sus sistemas, sus canales y sus equipos.',
  },
  {
    t: 'Conectar, no aislar',
    d: 'Cada pieza conversa con las demás. Datos, IA y personas trabajan en un mismo flujo.',
  },
  {
    t: 'Crecer juntos',
    d: 'Partners, clientes y desarrolladores amplían lo que la plataforma puede hacer.',
  },
];

// El papel de cada pieza (el nombre y el link salen del menú: data/navigation.js)
export const ECOSISTEMA_PIECES = [
  { href: '/ecosistema/partners', role: 'Las alianzas que nos respaldan.' },
  { href: '/ecosistema/api', role: 'La puerta para que tus sistemas se sumen.' },
  { href: '/ecosistema/ia-conversacional', role: 'La inteligencia que recorre todo.' },
];
