// Página de SimpleSend (/simplesuite/simplesend), estructura inspirada en zendesk.com.mx/service/ai:
// hero, tarjetas de solución, filas que alternan texto y tarjeta animada, casos y preguntas frecuentes.
// Fuentes: https://www.simpletech.uy/simplesend/ (ahí figura con su nombre anterior, WittySend) y los casos
// Honda Chile y DHL (data/caseStudies.js). La campaña, el embudo y el chat son ilustrativos; métricas y citas, reales.
export default {
  // Con `hero`, pages/simplesuite/[modulo].astro usa el diseño nuevo (hero, filas alternadas, preguntas y formulario).
  hero: {
    kicker: 'SIMPLESEND · CAMPAÑAS',
    title: 'Campañas que llegan y convierten.',
    lead: 'Activá campañas de WhatsApp y SMS masivas y personalizadas en tiempo real, y hacé que cada respuesta vuelva a la conversación con tu equipo.',
    image: {
      src: '/uploads/simplesend-hero.png',
      alt: 'Cliente recibiendo una promoción en el celular y el resumen de la campaña enviada por cuatro canales',
    },
  },

  // Tarjetas debajo del hero (qué resuelve SimpleSend). `icon` → ProductShowcase/icons.jsx
  solutions: [
    { icon: 'send', t: 'Llegá a todos', d: 'Mensajes masivos por WhatsApp Business API y SMS.' },
    { icon: 'list', t: 'Personalizá cada envío', d: 'Listas y variables para hablarle a cada cliente.' },
    { icon: 'clock', t: 'Enviá en el momento justo', d: 'Programá tus campañas y seguí su entrega.' },
    { icon: 'chart', t: 'Decidí con datos', d: 'Las métricas clave para optimizar cada campaña.' },
  ],

  // Filas que alternan texto y tarjeta animada. `card.type` → tarjetas de sections/ProductShowcase/cards.
  rows: [
    {
      kicker: 'MENSAJES MASIVOS',
      title: 'De una lista a miles de conversaciones.',
      text: 'Elegí el canal, la lista y las variables, programá el envío y seguí en vivo cuántos mensajes se entregan, se leen y se responden.',
      card: {
        type: 'campaign',
        name: 'Campaña de seguridad',
        settings: [
          { t: 'Canal', v: 'WhatsApp' },
          { t: 'Lista', v: 'Clientes con recall pendiente' },
          { t: 'Variables', v: 'nombre · modelo' },
          { t: 'Programación', v: 'Hoy, 10:00' },
        ],
        template:
          'Hola {{nombre}}, tu {{modelo}} tiene una campaña de seguridad pendiente. ¿Agendamos tu visita al taller?',
        fill: { nombre: 'Carolina', modelo: 'CR-V' },
        funnel: [
          { label: 'Enviados', value: 12480 },
          { label: 'Entregados', value: 12105 },
          { label: 'Leídos', value: 9870 },
          { label: 'Respondidos', value: 3410 },
        ],
      },
    },
    {
      kicker: 'WHATSAPP + SMS',
      title: 'Si WhatsApp no llega, llega por SMS.',
      text: 'Combiná los canales de mensajería de mayor penetración a nivel global: si un mensaje de WhatsApp no se entrega, SimpleSend lo envía por SMS para que ningún cliente quede afuera.',
      card: {
        type: 'fallback',
        blue: true,
        primary: 'WhatsApp',
        backup: 'SMS',
        note: 'El SMS no depende de internet, es un canal poco saturado y tiene una tasa de apertura muy alta.',
      },
    },
    {
      kicker: 'RELACIONES',
      title: 'Cada respuesta vuelve a la conversación.',
      text: 'Cuando un cliente responde a una campaña, la conversación sigue con tu bot o con tu equipo en SimpleAgents. Así lo vive Honda Chile.',
      link: { label: 'Ver el caso de Honda Chile', href: '/caso/honda-chile' },
      card: {
        type: 'quote',
        logo: '/uploads/logos/honda.png',
        logoDark: true,
        client: 'Honda',
        quote:
          // Fragmento textual de la cita completa del caso (entra mejor en la tarjeta de la fila).
          'Lo que más valoro es poder llegar masivamente a nuestros clientes de forma sencilla. Es muy fácil crear un template, incluir tu mensaje, una imagen, una URL; la herramienta es amigable.',
        author: 'Carolina Zenteno',
        role: 'Jefa CRM · Experiencia de Clientes',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/carolina-zenteno.webp',
        href: '/caso/honda-chile',
        chat: [
          { t: 'Tu vehículo tiene una campaña de seguridad pendiente. ¿Agendamos?' },
          { t: 'Sí, quiero agendar', out: true },
          { t: '¡Genial! Te pedimos unos datos 👇' },
        ],
        result: {
          t: 'La respuesta vuelve a la conversación',
          d: 'Una ejecutiva la atiende en SimpleAgents',
          icon: 'handoff',
        },
      },
    },
    {
      kicker: 'RESULTADOS',
      title: 'Campañas que se miden en conversiones.',
      text: 'Honda Chile duplicó la conversión de sus campañas de recall con WhatsApp, y DHL automatiza campañas en más de 40 países de LATAM y el Caribe.',
      link: { label: 'Ver el caso de DHL', href: '/caso/dhl' },
      card: {
        type: 'results',
        main: { prefix: 'x', value: 2, label: 'conversión en campañas de recall con WhatsApp', client: 'Honda Chile' },
        extra: { value: '+40', label: 'países de LATAM y el Caribe con campañas automatizadas', client: 'DHL' },
      },
    },
  ],

  // Casos en pestañas: slugs de data/cases.js que usan SimpleSend.
  cases: {
    kicker: 'CASOS CON SIMPLESEND',
    title: 'Campañas que ya convierten.',
    slugs: ['honda-chile', 'dhl', 'verde', 'grupo-santa-rosa'],
  },

  // Preguntas frecuentes de SimpleSend (respuestas basadas en las funcionalidades de simpletech.uy/simplesend).
  faqs: [
    {
      q: '¿Qué es SimpleSend?',
      a: 'Es la plataforma de SimpleSuite para activar campañas por canales de mensajería en tiempo real: envíos masivos, personalizados y medibles.',
    },
    {
      q: '¿Por qué canales puedo enviar?',
      a: 'Por WhatsApp, a través de WhatsApp Business API, y por SMS, un canal que no depende de internet y tiene una tasa de apertura muy alta.',
    },
    {
      q: '¿Puedo personalizar los mensajes?',
      a: 'Sí. Organizás tus audiencias en listas y usás variables, como el nombre del cliente, para que cada mensaje sea personal.',
    },
    {
      q: '¿Qué pasa cuando un cliente responde?',
      a: 'La respuesta vuelve a la conversación: la puede seguir un bot de SimpleBots o una persona de tu equipo en SimpleAgents.',
    },
    {
      q: '¿Puedo programar los envíos?',
      a: 'Sí. Agendás cada campaña para el momento justo y seguís la entrega de cada mensaje.',
    },
    {
      q: '¿Se integra con nuestros sistemas?',
      a: 'Sí. SimpleSend se conecta sin complejidades con tus aplicaciones y sistemas.',
    },
  ],
};
