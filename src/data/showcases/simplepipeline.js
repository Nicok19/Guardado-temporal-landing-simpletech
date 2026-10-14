// Página de SimplePipeline (/simplepipeline), estructura inspirada en zendesk.com.mx/service/ai:
// hero, tarjetas de solución, filas que alternan texto y tarjeta animada y preguntas frecuentes.
// El "Caso Viajes" (pipeline animado) sale de data/pipelineFlow.js; los textos, de la página anterior de SimplePipeline.
// No hay casos de clientes con SimplePipeline: la página no lleva pestañas de casos.
import { AI_ENGINES, FLOW_NODES } from '@/data/pipelineFlow';

// Logos de simpleicons en azul de marca (en data/pipelineFlow.js vienen en crema, para fondos oscuros).
const engines = AI_ENGINES.map((e) => ({ ...e, icon: e.icon?.replace(/\/F9F6EE$/, '/00249C') }));
const engineName = (label) => engines['ABC'.indexOf(label.slice(-1))].name; // 'motor IA · A' → primer motor

export default {
  // Mismo diseño que las plataformas de SimpleSuite (pages/simplepipeline.astro). También alimenta su bloque en /simplesuite.
  hero: {
    kicker: 'SIMPLEPIPELINE · AGENTES IA',
    title: 'Un flujo. Muchos agentes de IA.',
    lead: 'SimplePipeline orquesta múltiples agentes y múltiples motores de IA para automatizar procesos de punta a punta, con reglas de negocio e integración a tus sistemas.',
    image: {
      src: '/uploads/simplepipeline-hero.png',
      alt: 'Persona trabajando en el editor de flujo de SimplePipeline mientras un pipeline clasifica la intención con IA',
    },
  },

  // Tarjetas debajo del hero (qué resuelve SimplePipeline). `icon` → ProductShowcase/icons.jsx
  solutions: [
    {
      icon: 'users',
      t: 'Agentes especializados',
      d: 'Cada agente domina un tema: ventas, postventa, reclamos o preguntas frecuentes.',
    },
    {
      icon: 'spark',
      t: 'Múltiples motores de IA',
      d: 'Elegí el modelo más adecuado para cada agente y cambialo sin rehacer el flujo.',
    },
    {
      icon: 'flow',
      t: 'Router y reglas de negocio',
      d: 'Clasificadores que derivan cada consulta al agente correcto y validan cada paso.',
    },
    {
      icon: 'plug',
      t: 'Integración con tus sistemas',
      d: 'APIs hacia CRM, ERP o sistemas propios para consultar datos y ejecutar acciones.',
    },
  ],

  // Filas que alternan texto y tarjeta animada. `card.type` → tarjetas de sections/ProductShowcase/cards.
  // `full`: el texto arriba y la tarjeta a todo el ancho (el pipeline del Caso Viajes).
  rows: [
    {
      full: true,
      kicker: 'PIPELINE · CASO VIAJES',
      title: 'Diseñá visualmente cómo se resuelve cada consulta.',
      text: 'Cada mensaje entra por un router que lo clasifica, pasa al agente especializado y termina en una acción en tus sistemas. Así se ve el flujo de una agencia de viajes.',
      card: { type: 'flow', flowName: 'Caso Viajes' },
    },
    {
      kicker: 'MÚLTIPLES MOTORES DE IA',
      title: 'El mejor modelo para cada tarea.',
      text: 'Cada agente usa el motor de IA que mejor rinde para su tarea, en costo, velocidad y precisión, y lo podés cambiar sin rehacer el flujo.',
      card: {
        type: 'engines',
        agents: ['ventas', 'postventa', 'faq'].map((id) => ({
          t: FLOW_NODES[id].t,
          engine: engineName(FLOW_NODES[id].engine),
        })),
        engines,
      },
    },
    {
      kicker: 'BRING YOUR OWN AI',
      title: 'Tus modelos, tus claves.',
      text: 'Conectá los modelos que tu empresa ya contrató, con tus propias claves y tus políticas de datos. SimplePipeline los orquesta.',
      card: {
        type: 'checklist',
        blue: true,
        heading: 'BYAI',
        text: 'Conectá los modelos que tu empresa ya contrató, con tus propias claves. SimplePipeline los orquesta.',
        items: ['Tus claves API', 'Tus políticas de datos', 'Sin dependencia de un proveedor'],
      },
    },
    {
      kicker: 'PROCESOS POR ETAPAS',
      title: 'Procesos complejos, simplificados.',
      text: 'Un proceso largo se divide en etapas que la IA resuelve y valida una a una: cotizar, pedir datos, emitir o registrar, sin pasos manuales.',
      card: {
        type: 'checklist',
        blue: true,
        numbered: true,
        heading: 'Caso Viajes · venta',
        items: [
          'Clasificar la consulta',
          'Asesorar y cotizar el paquete',
          'Pedir los datos del pasajero',
          'Emitir en el sistema de reservas',
          'Enviar el link de pago',
        ],
      },
    },
    {
      kicker: 'INTEGRACIÓN',
      title: 'Del mensaje entrante a la acción en tu sistema.',
      text: 'Los agentes consultan datos y ejecutan acciones en tu CRM, ERP o sistemas propios, para que la conversación termine con el proceso resuelto.',
      card: {
        type: 'editor',
        panels: { rules: 'Recorrido', test: 'Conversación' },
        flowName: 'Caso Viajes',
        rules: [
          { t: 'Router', v: 'Clasifica: ventas' },
          { t: 'Agente Ventas', v: 'Asesora y cotiza' },
          { t: 'Integración', v: 'Sistema de reservas' },
        ],
        action: 'Venta confirmada y link de pago enviado',
        chat: [
          { t: 'Hola, quiero irme de viaje a la playa', out: true },
          { t: '¡Qué lindo plan! ¿Para cuántas personas y en qué fecha?' },
          { t: 'Dos personas, en enero', out: true },
          { t: 'Te reservé el paquete: te mando el link de pago. 🏖️' },
        ],
      },
    },
  ],

  // Preguntas frecuentes de SimplePipeline (respuestas basadas en las funcionalidades de la página anterior).
  faqs: [
    {
      q: '¿Qué es SimplePipeline?',
      a: 'Es una plataforma para diseñar flujos con agentes de IA especializados, que orquesta múltiples motores de IA y se integra con tus sistemas para automatizar procesos de punta a punta.',
    },
    {
      q: '¿Qué es un agente especializado?',
      a: 'Un agente de IA que domina un tema, como ventas, postventa, reclamos o preguntas frecuentes. Un router clasifica cada consulta y la deriva al agente correcto.',
    },
    {
      q: '¿Qué motores de IA puedo usar?',
      a: 'Varios: elegís el modelo más adecuado para cada agente según costo, velocidad y precisión, y lo cambiás sin rehacer el flujo.',
    },
    {
      q: '¿Puedo usar los modelos que ya contratamos?',
      a: 'Sí. Con Bring your own AI conectás tus propios modelos con tus claves y tus políticas de datos, sin depender de un proveedor.',
    },
    {
      q: '¿Se integra con nuestros sistemas?',
      a: 'Sí. Mediante APIs, los agentes consultan datos y ejecutan acciones en tu CRM, ERP o sistemas propios.',
    },
    {
      q: '¿Qué procesos se pueden automatizar?',
      a: 'Procesos de punta a punta, como cotizar, reservar, emitir o registrar, divididos en etapas que la IA resuelve y valida una a una.',
    },
  ],
};
