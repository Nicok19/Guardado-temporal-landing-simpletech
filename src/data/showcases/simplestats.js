// Página de SimpleStats (/simplesuite/simplestats), estructura inspirada en zendesk.com.mx/service/ai:
// hero, tarjetas de solución, filas que alternan texto y tarjeta animada, casos y preguntas frecuentes.
// Fuentes: https://www.simpletech.uy/simplestats/ (titulares, +30 métricas, funcionalidades) y el caso
// Montes del Plata (reportes de Power BI). El tablero, la alerta y el chat son ilustrativos.
export default {
  // Con `hero`, pages/simplesuite/[modulo].astro usa el diseño nuevo (hero, filas alternadas, preguntas y formulario).
  hero: {
    kicker: 'SIMPLESTATS · ANALYTICS',
    title: 'Tus datos, tus decisiones.',
    lead: 'Métricas en tiempo real para medir, mejorar y escalar tu atención: datos centralizados de bots, agentes y canales, listos para actuar.',
    image: {
      src: '/uploads/simplestats-hero.png',
      alt: 'Supervisora con sus vistas de SimpleStats: tiempo de respuesta y conversaciones por bandeja',
    },
  },

  // Tarjetas debajo del hero (qué resuelve SimpleStats). `icon` → ProductShowcase/icons.jsx
  solutions: [
    { icon: 'chart', t: 'Medí en tiempo real', d: 'Más de 30 métricas en vivo, con datos centralizados.' },
    { icon: 'bell', t: 'Detectá desvíos', d: 'Avisos automáticos cuando un indicador sale de rango.' },
    { icon: 'users', t: 'Seguí a tu equipo', d: 'Chats activos de cada agente y posibles demoras.' },
    { icon: 'grid', t: 'Reportes a tu medida', d: 'Informes personalizables y exportación a BI.' },
  ],

  // Filas que alternan texto y tarjeta animada. `card.type` → tarjetas de sections/ProductShowcase/cards.
  rows: [
    {
      kicker: 'TABLEROS EN VIVO',
      title: 'Visión total del desempeño de tu equipo.',
      text: 'Chats activos, agentes en línea, tiempos de espera y mensajes por canal en un tablero que se actualiza en tiempo real, para supervisores, analistas de datos y líderes de CX.',
      card: {
        type: 'dashboard',
        board: 'Tablero · Atención al cliente',
        kpis: [
          { label: 'Chats activos', values: [128, 134, 131, 142, 139] },
          { label: 'Agentes en línea', values: [24, 24, 26, 25, 26] },
          { label: 'Espera prom.', values: ['1:42', '1:38', '1:51', '1:35', '1:29'] },
          { label: 'Sin atender', values: [3, 2, 4, 1, 0] },
        ],
        bars: {
          title: 'Mensajes por canal',
          items: [
            { label: 'WhatsApp', values: [820, 860, 845, 910, 940] },
            { label: 'Instagram', values: [310, 295, 340, 330, 360] },
            { label: 'Facebook', values: [180, 210, 195, 220, 205] },
            { label: 'SMS', values: [90, 110, 95, 120, 115] },
          ],
        },
      },
    },
    {
      kicker: '+30 MÉTRICAS',
      title: 'Todo lo que pasa, medido.',
      text: 'Estados, gestión de chats, actividad, flujos de tus bots, tiempos promedio, transferencias y la actividad saliente de cada envío de WhatsApp: datos en tiempo real y bajo demanda.',
      card: {
        type: 'image',
        src: '/uploads/simplestats-metricas.png',
        alt: 'Vista de SimpleStats con chats abiertos, tomados y cerrados, tiempo de atención y tablas de agentes y bandejas',
      },
    },
    {
      kicker: 'VISTAS PERSONALIZADAS',
      title: 'Vistas personalizadas y datos a tu medida.',
      text: 'Creá vistas personalizadas para organizar y consultar la información que necesitás. Elegí los datos relevantes para tu análisis y descargalos para compartirlos con tu equipo o trabajar con ellos cuando quieras.',
      card: {
        type: 'image',
        src: '/uploads/simplestats-vistas.png',
        alt: 'Vistas predefinidas de SimpleStats y un gráfico con el estado de los mensajes',
      },
    },
    {
      kicker: 'TABLAS Y REPORTES',
      title: 'Cada agente y cada bandeja, en detalle.',
      text: 'Consultá tablas por agente y por bandeja con los chats abiertos, tomados, cerrados y expirados, la actividad de cada uno y las transferencias. Filtrá y ordená los datos, y descargalos para armar tus reportes.',
      card: {
        type: 'image',
        src: '/uploads/simplestats-agentes.png',
        alt: 'Tabla de agentes de SimpleStats con la actividad y los chats de cada uno en los últimos 7 días',
      },
    },
  ],

  // Casos con resultados medidos (no figuran como clientes de SimpleStats: el título no lo afirma).
  cases: {
    kicker: 'RESULTADOS MEDIBLES',
    title: 'Lo que se mide, se mejora.',
    slugs: ['lider-bci', 'honda-chile', 'dhl', 'montes-del-plata'],
  },

  // Preguntas frecuentes de SimpleStats (respuestas basadas en las funcionalidades de simpletech.uy/simplestats).
  faqs: [
    {
      q: '¿Qué es SimpleStats?',
      a: 'Es la plataforma de SimpleSuite que convierte datos en acción: visualizás tus métricas en tiempo real, detectás desvíos y actuás rápido.',
    },
    {
      q: '¿Qué métricas puedo ver?',
      a: 'Más de 30 en tiempo real: estados, gestión de chats, actividad, flujos, tiempos promedio, agentes en línea, mensajes y contactos por canal, y chats sin atender.',
    },
    {
      q: '¿Para quién está pensado?',
      a: 'Para supervisores, analistas de datos y líderes de CX que necesitan medir, mejorar y escalar la atención.',
    },
    {
      q: '¿Puedo armar mis propios reportes?',
      a: 'Sí. Los informes son detallados y personalizables, y los datos se pueden integrar con tus herramientas de BI.',
    },
    {
      q: '¿Me avisa cuando algo sale de lo normal?',
      a: 'Sí. SimpleStats envía avisos automáticos cuando un indicador sale de rango, como el tiempo de espera de una bandeja.',
    },
    {
      q: '¿Mide también los bots y las campañas?',
      a: 'Sí. Hace seguimiento de los flujos de tus bots y su eficiencia, y de la actividad saliente de cada envío de WhatsApp.',
    },
  ],
};
