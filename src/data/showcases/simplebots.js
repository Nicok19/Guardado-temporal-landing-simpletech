// Página de SimpleBots (/simplesuite/simplebots), estructura inspirada en zendesk.com.mx/service/ai:
// hero, tarjetas de solución, filas que alternan texto y tarjeta animada, casos y preguntas frecuentes.
// Fuentes: https://www.simpletech.uy/simplebots/ (funcionalidades y canales) y los casos de data/caseStudies.js.
// Los chats son ilustrativos; métricas y citas son reales.
export default {
  // Con `hero`, pages/simplesuite/[modulo].astro usa el diseño nuevo (hero, filas alternadas, preguntas y formulario).
  hero: {
    kicker: 'SIMPLEBOTS · BUILDER',
    title: 'Bots que resuelven desde el primer mensaje.',
    lead: 'Diseñá flujos conversacionales sin código, potenciados con IA y conectados a tus sistemas, y publicalos en todos tus canales.',
    image: {
      src: '/uploads/simplebots-hero.png',
      alt: 'Clienta consultando por un producto mientras el bot avanza en la regla y le envía precios y condiciones',
    },
  },

  // Tarjetas debajo del hero (qué resuelve SimpleBots). `icon` → ProductShowcase/icons.jsx
  solutions: [
    { icon: 'flow', t: 'Diseñá sin código', d: 'Árboles de decisión que se arman arrastrando bloques.' },
    { icon: 'spark', t: 'Entendé con IA', d: 'Comprensión de lenguaje natural para consultas abiertas.' },
    { icon: 'plug', t: 'Conectá tus sistemas', d: 'Web Services y Webhooks para consultar y actualizar datos.' },
    { icon: 'handoff', t: 'Derivá con contexto', d: 'El bot pasa a una persona con toda la conversación.' },
  ],

  // Filas que alternan texto y tarjeta animada. `card.type` → tarjetas de sections/ProductShowcase/cards.
  rows: [
    {
      kicker: 'EDITOR SIN CÓDIGO',
      title: 'Flujos a tu medida, sin escribir código.',
      text: 'Armá árboles de decisión que se ejecutan según lo que responde cada cliente, validá cada dato con expresiones regulares y probá el bot antes de publicarlo.',
      card: {
        type: 'image',
        src: '/uploads/simplebots-editor.png',
        alt: 'Editor de reglas de SimpleBots con un bloque de Inteligencia Artificial',
      },
    },
    {
      kicker: 'OMNICANALIDAD',
      title: 'Un bot. Todos tus canales.',
      text: 'Diseñás el bot una sola vez y lo publicás en WhatsApp, Instagram, Messenger, SMS y Webchat. Tus clientes escriben por donde prefieren y reciben la misma respuesta.',
      card: {
        type: 'channels',
        blue: true,
        label: 'PUBLICADO EN',
        centerIcon: 'flow',
        items: ['WhatsApp', 'Instagram', 'Messenger', 'SMS', 'Webchat'],
      },
    },
    {
      kicker: 'SEGUIMIENTO DE ACCIONES',
      title: 'Registrá acciones con banderas personalizadas.',
      text: 'Definí banderas para las acciones que tu empresa quiere identificar y registrá cada vez que un usuario las realiza, para analizar su comportamiento y hacer un seguimiento de sus interacciones.',
      card: {
        type: 'image',
        src: '/uploads/simplebots-banderas.png',
        alt: 'Listado de banderas de SimpleBots con el registro de cada activación',
      },
    },
    {
      kicker: 'ESTADÍSTICAS',
      title: 'Visualizá tus datos con gráficas claras.',
      text: 'Transformá los datos de tus conversaciones en gráficas que te permitan analizar resultados, identificar tendencias y entender mejor la actividad de tu equipo.',
      card: {
        type: 'image',
        src: '/uploads/simplebots-dashboard.png',
        alt: 'Dashboard de SimpleBots con los estados de los templates de WhatsApp',
      },
    },
  ],

  // Casos en pestañas: slugs de data/cases.js que usan SimpleBots.
  cases: {
    kicker: 'CASOS CON SIMPLEBOTS',
    title: 'Bots que ya están resolviendo.',
    slugs: ['dhl-uruguay', 'honda-chile', 'montes-del-plata', 'ta-ta', 'lider-bci'],
  },

  // Preguntas frecuentes de SimpleBots (respuestas basadas en las funcionalidades de simpletech.uy/simplebots).
  faqs: [
    {
      q: '¿Qué es SimpleBots?',
      a: 'Es la plataforma de SimpleSuite para diseñar y gestionar flujos conversacionales: bots de lógica profunda, conectados a tus sistemas y potenciados con IA.',
    },
    {
      q: '¿Necesito saber programar?',
      a: 'No. Los flujos se diseñan en un editor visual, arrastrando bloques con condiciones, variables y validaciones.',
    },
    {
      q: '¿En qué canales funciona?',
      a: 'Un mismo bot se publica en WhatsApp, Instagram, Messenger, SMS y Webchat.',
    },
    {
      q: '¿Se integra con nuestros sistemas?',
      a: 'Sí. Con Web Services y Webhooks el bot consulta y actualiza datos de tu CRM, ERP o sistemas propios en tiempo real.',
    },
    {
      q: '¿Qué pasa si el bot no puede resolver una consulta?',
      a: 'La deriva a una persona de tu equipo en SimpleAgents, con el historial completo de la conversación.',
    },
    {
      q: '¿Usa inteligencia artificial?',
      a: 'Sí. Comprende lenguaje natural para resolver consultas abiertas y detecta el tono de cada conversación con análisis de sentimiento.',
    },
  ],
};
