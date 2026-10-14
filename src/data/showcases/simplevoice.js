// Página de SimpleVoice (/simplesuite/simplevoice), estructura inspirada en zendesk.com.mx/service/ai:
// hero, tarjetas de solución, filas que alternan texto y tarjeta animada, casos y preguntas frecuentes.
// No hay página oficial del producto: las fuentes son la nota del blog
// https://www.simpletech.uy/voicebots-para-transformar-tu-atencion-telefonica-con-ia/ (VoiceBots) y el caso
// Aliaxis (telefonía IP con 3CX, data/caseStudies.js). La llamada y la transcripción son ilustrativas.
export default {
  // Con `hero`, pages/simplesuite/[modulo].astro usa el diseño nuevo (hero, filas alternadas, preguntas y formulario).
  hero: {
    kicker: 'SIMPLEVOICE · VOZ + IA',
    title: 'Ni “marque 1”, ni “marque 2”.', // espacios duros: cada "ni “marque N”" queda en una línea
    lead: 'VoiceBots con IA que entienden, resuelven y derivan, 24/7, integrados a tu telefonía en la nube y a tus sistemas.',
    image: {
      src: '/uploads/simplevoice-hero.png',
      alt: 'Agente atendiendo una llamada en curso con una llamada entrante en la cola de Ventas',
    },
  },

  // Tarjetas debajo del hero (qué resuelve SimpleVoice). `icon` → ProductShowcase/icons.jsx
  solutions: [
    { icon: 'bot', t: 'Atendé 24/7', d: 'Cientos de llamadas simultáneas, a cualquier hora.' },
    { icon: 'spark', t: 'Hablá natural', d: 'El cliente habla libre, interrumpe o cambia de tema.' },
    { icon: 'shield', t: 'Validá identidades', d: 'Biometría de voz segura, sin fricción.' },
    { icon: 'phone', t: 'Unificá tu telefonía', d: 'Central, IVR y colas de contact center en la nube.' },
  ],

  // Filas que alternan texto y tarjeta animada. `card.type` → tarjetas de sections/ProductShowcase/cards.
  rows: [
    {
      kicker: 'VOICEBOTS CON IA',
      title: 'Tus clientes hablan libre. El VoiceBot entiende.',
      text: 'Comprende números, fechas y direcciones dichos en voz alta, y ejecuta acciones durante la llamada en tu CRM, ERP, agendas o pasarelas de pago.',
      card: {
        type: 'call',
        line: 'Línea de atención',
        caller: 'Cliente · +598 •• ••• 214',
        transcript: [
          { t: 'Hola, quiero cambiar mi turno del jueves.' },
          { t: 'Claro. ¿Te queda bien el viernes a las 10?', out: true },
          { t: 'Mejor a las 11, si se puede.' },
          { t: 'Listo: viernes a las 11. Te llega la confirmación por WhatsApp.', out: true },
        ],
        action: { t: 'Turno reprogramado', d: 'Agenda · confirmación por WhatsApp' },
      },
    },
    {
      kicker: 'BIOMETRÍA DE VOZ',
      title: 'Tu voz es tu clave.',
      text: 'Validá la identidad de cada cliente por su voz para habilitar operaciones seguras, sin preguntas de seguridad ni contraseñas.',
      card: {
        type: 'biometrics',
        blue: true,
        phrase: 'Quiero consultar el saldo de mi cuenta',
        steps: ['Escuchando', 'Analizando la voz', 'Identidad verificada'],
        note: 'Biometría de voz para validar identidades: operaciones seguras, sin fricción.',
      },
    },
    {
      kicker: 'DERIVACIÓN INTELIGENTE',
      title: 'Cuando hace falta una persona, llega con contexto.',
      text: 'Si el VoiceBot detecta frustración o una consulta compleja, transfiere la llamada a un agente con la transcripción. Y el cliente puede seguir por WhatsApp sin repetir información.',
      link: { label: 'Conocé SimpleAgents', href: '/simplesuite/simpleagents' },
      card: {
        type: 'handoff',
        blue: true,
        from: 'VoiceBot',
        to: 'Agente',
        context: ['Transcripción de la llamada', 'Datos del cliente', 'Motivo de la consulta'],
      },
    },
    {
      kicker: 'TELEFONÍA IP',
      title: 'Una sola red de voz. Menos costos.',
      text: 'Aliaxis conectó sus sucursales de toda Latinoamérica en una única central telefónica en la nube, con llamadas por interno entre países.',
      link: { label: 'Ver el caso de Aliaxis', href: '/caso/aliaxis' },
      card: {
        type: 'results',
        main: { value: 100, suffix: 'K+', label: 'USD de ahorro en telecomunicaciones', client: 'Aliaxis' },
        extra: { value: '0', label: 'costo extra para sumar sucursales y usuarios', client: 'Aliaxis' },
      },
    },
  ],

  // Casos en pestañas: slugs de data/cases.js que usan SimpleVoice.
  cases: {
    kicker: 'CASOS CON SIMPLEVOICE',
    title: 'Comunicaciones que ya escalan.',
    slugs: ['aliaxis', 'summum', 'la-boliviana-ciacruz'],
  },

  // Preguntas frecuentes de SimpleVoice (respuestas basadas en la nota de VoiceBots y la telefonía IP).
  faqs: [
    {
      q: '¿Qué es SimpleVoice?',
      a: 'Es la plataforma de SimpleSuite que lleva la IA conversacional a tu atención telefónica: VoiceBots integrados a tu telefonía en la nube y a tus sistemas.',
    },
    {
      q: '¿En qué se diferencia de un IVR tradicional?',
      a: 'No hay menús de “marque 1”: el cliente habla con naturalidad, puede interrumpir o cambiar de tema, y el VoiceBot entiende y resuelve.',
    },
    {
      q: '¿Puede hacer gestiones durante la llamada?',
      a: 'Sí. Se integra con CRM, ERP, pasarelas de pago, agendas y validadores de identidad para resolver la consulta en la misma llamada.',
    },
    {
      q: '¿Cómo valida la identidad del cliente?',
      a: 'Con biometría de voz: la identidad se verifica por la voz del cliente, de forma segura y sin fricción.',
    },
    {
      q: '¿Qué pasa si el cliente necesita hablar con una persona?',
      a: 'El VoiceBot deriva la llamada a un agente con el contexto, por ejemplo si detecta frustración. El cliente también puede seguir por WhatsApp sin repetir información.',
    },
    {
      q: '¿Puedo personalizar la voz?',
      a: 'Sí. Podés ajustar el tono, el género, el acento o la jerga local para que suene como tu marca.',
    },
  ],
};
