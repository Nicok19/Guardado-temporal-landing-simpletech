// Página de SimpleAgents (/simplesuite/simpleagents), estructura inspirada en zendesk.com.mx/service/ai:
// hero, tarjetas de solución, filas que alternan texto y tarjeta animada, casos y preguntas frecuentes.
// Fuentes: https://www.simpletech.uy/simpleagent/ (funcionalidades) y el caso Honda Chile (data/caseStudies.js).
// Los chats, la bandeja y el tablero son ilustrativos; métricas y citas son reales.
export default {
  // Con `hero`, pages/simplesuite/[modulo].astro usa el diseño nuevo (hero, filas alternadas, preguntas y formulario).
  hero: {
    kicker: 'SIMPLEAGENTS · OMNICANAL',
    title: 'Atención humana potenciada con bots e IA.',
    lead: 'Cada conversación llega con su contexto a la bandeja del agente indicado, en todos tus canales, para que tu equipo atienda más y mejor.',
    image: {
      src: '/uploads/simpleagents-hero.png',
      alt: 'Agente de soporte respondiendo a una clienta desde la bandeja de Soporte de SimpleAgents',
    },
  },

  // Tarjetas debajo del hero (qué resuelve SimpleAgents). `icon` → ProductShowcase/icons.jsx
  solutions: [
    {
      icon: 'inbox',
      t: 'Centralizá la atención',
      d: 'WhatsApp, Instagram, Messenger y Webchat en una bandeja unificada.',
    },
    { icon: 'handoff', t: 'Derivá sin perder el hilo', d: 'Del bot al agente y viceversa, con el historial completo.' },
    { icon: 'spark', t: 'Atendé con IA', d: 'Respuestas sugeridas, resúmenes y etiquetado automático.' },
    { icon: 'chart', t: 'Supervisá en vivo', d: 'Colas, tiempos de espera y SLA en tiempo real.' },
  ],

  // Filas que alternan texto y tarjeta animada. `card.type` → tarjetas de sections/ProductShowcase/cards.
  rows: [
    {
      kicker: 'OMNICANALIDAD',
      title: 'Todos tus canales, una sola bandeja.',
      text: 'Atendé de forma simultánea hasta 4 vistas de los distintos canales de mensajería, con bandejas de entrada organizadas y personalizadas para cada equipo.',
      card: {
        type: 'image',
        src: '/uploads/simpleagents-bandeja.png',
        alt: 'Chat de SimpleAgents con las bandejas y cuatro vistas para atender conversaciones a la vez',
      },
    },
    {
      kicker: 'MODO BOT Y MODO AGENTE',
      title: 'Del bot al agente, sin perder el hilo.',
      text: 'Los bots resuelven lo repetitivo y, cuando hace falta una persona, la conversación pasa al agente indicado con el historial, los datos del contacto y las notas. Y puede volver al bot.',
      link: { label: 'Conocé SimpleBots', href: '/simplesuite/simplebots' },
      card: {
        type: 'handoff',
        blue: true,
        from: 'Bot',
        to: 'Agente',
        context: ['Historial completo', 'Datos del contacto', 'Notas de la interacción'],
      },
    },
    {
      kicker: 'BANDEJAS',
      title: 'Cada conversación, en la bandeja correcta.',
      text: 'Organizá las conversaciones en bandejas para que tus agentes puedan encontrar fácilmente los chats que necesitan atender. Distribuí las consultas según el equipo, canal o tipo de atención, facilitando la gestión diaria, el seguimiento de cada conversación y el trabajo en equipo.',
      card: {
        type: 'image',
        src: '/uploads/simpleagents-bandejas.png',
        alt: 'Lista de bandejas de SimpleAgents y el panel de bandejas del chat',
      },
    },
    {
      kicker: 'RESPUESTAS RÁPIDAS',
      title: 'Respuestas rápidas para tus agentes.',
      text: 'Creá mensajes frecuentes para que tus agentes puedan responder consultas habituales de forma rápida y sencilla. Ahorrá tiempo, mantené la consistencia en las respuestas y agilizá la atención sin tener que escribir el mismo mensaje una y otra vez.',
      card: {
        type: 'image',
        src: '/uploads/simpleagents-respuestas.png',
        alt: 'Lista de mensajes frecuentes de SimpleAgents',
      },
    },
  ],

  // Casos en pestañas: slugs de data/cases.js que usan SimpleAgents.
  cases: {
    kicker: 'CASOS CON SIMPLEAGENTS',
    title: 'Equipos que ya atienden mejor.',
    slugs: ['honda-chile', 'lider-bci'],
  },

  // Preguntas frecuentes de SimpleAgents (respuestas basadas en las funcionalidades de simpletech.uy/simpleagent).
  faqs: [
    {
      q: '¿Qué es SimpleAgents?',
      a: 'Es la plataforma de SimpleSuite que combina bots e IA con atención humana: centraliza todas tus conversaciones y las lleva, con su contexto, a la bandeja del agente indicado.',
    },
    {
      q: '¿Qué canales puede atender mi equipo?',
      a: 'WhatsApp, Instagram, Messenger y Webchat en una bandeja unificada, con hasta 4 vistas simultáneas.',
    },
    {
      q: '¿Cómo pasa una conversación del bot al agente?',
      a: 'Con el modo bot y el modo agente: el bot transfiere la conversación al agente correcto con el historial completo, y después puede volver al bot.',
    },
    {
      q: '¿Puedo organizar a mi equipo por áreas?',
      a: 'Sí. Podés crear bandejas personalizadas y roles con jerarquías y permisos para gestionar a cada equipo.',
    },
    {
      q: '¿Cómo ayuda la IA a los agentes?',
      a: 'Con respuestas sugeridas, resúmenes de conversación y etiquetado automático, para atender más rápido.',
    },
    {
      q: '¿Se puede atender desde el celular?',
      a: 'Sí. SimpleAgents tiene una app nativa para Android e iOS para atender desde cualquier lugar.',
    },
  ],
};
