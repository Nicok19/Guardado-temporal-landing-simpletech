// Contenido de las páginas /caso/:slug. Para publicar un caso nuevo:
// 1) agregá aquí una entrada con su slug, 2) poné `slug` en el caso dentro de data/cases.js.
// Campos opcionales (si están, la página muestra esa sección):
// - about + why (+ quote) · story (bloques con points y quote; storyLayout: 'rows' = un bloque por fila)
// - solutions + related · flow (+ flowTitle, flowLabel, flowImage)
// - comparison + awards + awardsImage · achievements
// - achievements (+ chart: gráfico de barras a la izquierda, ver AchievementsSection)
// - conclusion + testimonial (uno o varios) + closingTitle
const DHL_IMG = 'https://www.simpletech.uy/wp-content/uploads/2026/03/';

export const CASE_STUDIES = {
  // Fuente: https://www.simpletech.uy/portfolio/dhl/ (ahí la plataforma figura también como WittySuite).
  dhl: {
    lead: 'SimpleSuite impulsando las operaciones de DHL en más de 40 países de Latinoamérica y el Caribe.',
    facts: [
      { label: 'INDUSTRIA', value: 'Logística y distribución' },
      { label: 'ALCANCE', value: 'LATAM y Caribe' },
      { label: 'PLATAFORMA', value: 'SimpleSuite' },
    ],
    metrics: [
      { value: '+40', label: 'países de Latinoamérica y el Caribe', highlight: true },
      { value: '5', label: 'áreas del negocio con soluciones automatizadas' },
      { value: '24/7', label: 'atención automatizada a colaboradores por WhatsApp' },
    ],
    about: {
      title: 'Sobre DHL',
      paragraphs: [
        'DHL es una de las compañías de logística más reconocidas del mundo.',
        'Su liderazgo en envíos internacionales, transporte, almacenamiento y supply chain la posiciona como un referente de la industria.',
      ],
    },
    why: {
      title: 'Un socio tecnológico estratégico',
      text: 'Simpletech se ha convertido en un socio tecnológico estratégico para DHL, impulsando el uso y el escalamiento de soluciones digitales que optimizan procesos y mejoran la experiencia del cliente. Lo que comenzó como proyectos puntuales hoy se aplica en distintas regiones, demostrando la capacidad de Simpletech para acompañar a empresas internacionales en su avance hacia la automatización.',
    },
    solutions: {
      title: 'Soluciones con impacto real',
      items: [
        {
          area: 'Retail & Marketing',
          text: 'Gestión integral de comunicaciones comerciales: envío automatizado de campañas, segmentación dinámica y activación de journeys multicanal.',
          benefits:
            'Optimiza el contacto con clientes, agiliza respuestas y estandariza procesos de marketing a escala regional.',
          img: `${DHL_IMG}01_retail_marketing_dhl-simpletech-1024x458.webp`,
          alt: 'Campañas de marketing de DHL por WhatsApp en tres celulares',
        },
        {
          area: 'Logística y Operaciones',
          text: 'Gestión de notificaciones logísticas y operativas, orientada al envío automatizado de avisos sobre paquetes retenidos y al seguimiento de envíos.',
          benefits:
            'Optimiza la comunicación con destinatarios, reduce fricciones en la operación y agiliza la resolución de incidencias, estandarizando procesos clave de logística a escala.',
          img: `${DHL_IMG}02_logistica_operaciones_dhl-simpletech-1024x458.webp`,
          alt: 'Notificación de seguimiento de un paquete de DHL en un celular',
        },
        {
          area: 'Recursos Humanos',
          text: 'Gestión de consultas internas de Recursos Humanos, con atención automatizada a colaboradores a través de WhatsApp.',
          benefits:
            'Centraliza y agiliza el acceso a información sobre beneficios, licencias y políticas internas, disponible 24/7. Optimiza la comunicación interna, reduce la carga operativa del equipo de RR.HH. y fortalece una estrategia de transformación digital centrada en las personas.',
          img: `${DHL_IMG}04_recursos_humanos_dhl-simpletech-1024x458.webp`,
          alt: 'Consulta de un colaborador al canal de RR.HH. de DHL Express por WhatsApp',
        },
        {
          area: 'Servicio al Cliente',
          text: 'Gestión de comunicaciones de servicio al cliente, enfocada en el envío automatizado de notificaciones cuando falta documentación en envíos retenidos en aduana.',
          benefits:
            'Optimiza la interacción con clientes, habilita la derivación fluida a agentes humanos ante respuestas y acelera la resolución de casos, estandarizando la atención a gran escala.',
          img: `${DHL_IMG}04_servicio_al_cliente_dhl-simpletech-1024x458.webp`,
          alt: 'Conversaciones de servicio al cliente de DHL por WhatsApp en tres celulares',
        },
        {
          area: 'Bot conversacional',
          text: 'Automatización de envíos internacionales para reactivar las operaciones logísticas en contextos de alta demanda: los usuarios agendan envíos online con un chatbot personalizado en WhatsApp, ingresando los datos del paquete de forma autónoma y digital.',
          benefits:
            'Optimiza la organización de la demanda, descongestiona los puntos de atención física e integra el pago del servicio, agilizando el proceso de punta a punta y asegurando la continuidad operativa.',
          img: `${DHL_IMG}05_bot_conversacional_dhl-simpletech-1024x458.webp`,
          alt: 'Menú del chatbot de DHL en WhatsApp con horarios, locales, promociones y tarifas',
        },
      ],
      related: [
        { label: 'DHL Chile', href: '/caso/dhl-chile' },
        { label: 'DHL Uruguay', href: '/caso/dhl-uruguay' },
      ],
    },
  },

  // Fuente: https://www.simpletech.uy/dhl-chile/
  'dhl-chile': {
    lead: 'DHL Chile: una solución para el área de Recursos Humanos con Agentes de IA, a través de WhatsApp.',
    facts: [
      { label: 'INDUSTRIA', value: 'Logística y distribución' },
      { label: 'PAÍS', value: 'Chile' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '+300', label: 'colaboradores con atención de RR.HH. por WhatsApp', highlight: true },
      { value: '24/7', label: 'respuestas sobre beneficios, licencias y políticas internas' },
      { value: '4', label: 'temas cubiertos: beneficios, licencias, vacaciones y políticas internas' },
    ],
    about: {
      title: 'Sobre DHL Chile',
      paragraphs: [
        'DHL Chile forma parte de una de las redes logísticas más importantes del mundo y reúne a más de 300 colaboradores en el país.',
        'Con una cultura centrada en las personas y la mejora continua, la empresa busca optimizar sus procesos internos para brindar una comunicación más ágil, cercana y accesible para todo su equipo.',
      ],
    },
    story: [
      {
        kicker: '01 · CONTEXTO',
        title: 'Muchas consultas, la misma cercanía.',
        text: 'En su búsqueda continua por mejorar la experiencia de sus colaboradores, DHL identificó oportunidades de mejora en la comunicación interna de Recursos Humanos: el equipo recibía a diario muchas consultas sobre beneficios, licencias, vacaciones y políticas internas. Antes había probado soluciones internas para centralizar la información, pero el uso no alcanzó los niveles esperados, lo que reforzó la importancia de un canal más cercano y familiar.',
      },
      {
        kicker: '02 · DESAFÍO',
        title: 'Agilizar sin perder calidez.',
        text: 'Agilizar la gestión de consultas internas y mejorar la experiencia del colaborador, sin perder la cercanía que caracteriza la cultura de DHL. RR.HH. necesitaba liberar tiempo operativo para tareas de mayor valor estratégico y, a la vez, ofrecer una atención eficiente y disponible en todo momento, con una herramienta conectada a los hábitos de comunicación de sus colaboradores.',
      },
      {
        kicker: '03 · SOLUCIÓN',
        title: 'Agentes de IA para RR.HH. en WhatsApp.',
        text: 'Junto a Simpletech, DHL implementó Agentes de IA para el equipo de RR.HH. a través de WhatsApp, el canal más utilizado por sus colaboradores. El agente automatiza las respuestas a las consultas más frecuentes con información clara y actualizada, las 24 horas, y refuerza el compromiso de la empresa con una transformación digital centrada en las personas.',
      },
    ],
    flowTitle: 'Una conversación simple y natural por WhatsApp.',
    flowLabel: 'ASISTENTE VIRTUAL DE RR.HH. · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2025/11/Simpletech_Caso-de-exito-dhL-rrhh_2025_03.png',
      alt: 'Conversación con el asistente de RR.HH. de DHL Express Chile por WhatsApp',
    },
    flow: [
      {
        t: 'El colaborador escribe',
        d: 'Inicia la conversación escribiendo al número de RR.HH. en WhatsApp.',
        dot: '#28c76f',
      },
      { t: 'La IA da la bienvenida', d: 'Responde con un saludo y consulta en qué puede ayudar.', dot: '#7367f0' },
      {
        t: 'Interpreta la intención',
        d: 'Entiende qué necesita el colaborador a partir de su mensaje.',
        dot: '#DCD291',
      },
      {
        t: 'Responde al instante',
        d: 'Brinda la información sobre beneficios, licencias o políticas internas, con un tono claro, empático y propio de DHL.',
        dot: '#00cfe8',
      },
    ],
    achievements: {
      title: 'Impacto',
      items: [
        {
          t: 'Atención más ágil',
          d: 'Un modelo de atención interna más ágil, coherente y disponible para todos los colaboradores.',
        },
        {
          t: 'Menos carga operativa',
          d: 'El equipo de RR.HH. redujo su carga operativa y ganó tiempo para enfocarse en proyectos estratégicos.',
        },
        {
          t: 'Un punto de contacto clave',
          d: 'La herramienta refuerza la comunicación y acerca la información de manera simple, rápida y segura.',
        },
      ],
    },
    conclusion: [
      'La colaboración entre DHL y Simpletech demuestra cómo la inteligencia artificial aplicada a la gestión interna puede potenciar la eficiencia y la experiencia del empleado.',
      'El caso de DHL Chile es ejemplo de cómo una herramienta accesible, cercana y bien implementada puede convertirse en un aliado estratégico del área de Recursos Humanos. Además, el uso de WhatsApp como medio de interacción facilita el acceso, la inmediatez y la adopción por parte de los colaboradores.',
      'Con esta implementación, DHL dio un paso clave hacia un modelo de Recursos Humanos más digital, accesible y enfocado en las personas.',
    ],
    testimonial: {
      quote:
        'La implementación fue súper organizada. El soporte fue excelente, las reuniones y el trabajo conjunto, especialmente cuando eran nuestro backup de IT, hicieron que la implementación del proyecto fuera muy rápida. No tuvimos ningún inconveniente ni con la creación ni con la atención.',
      author: 'Pricilla Faunes',
      role: 'HR Analyst',
      company: 'DHL Chile',
    },
  },

  // Fuente: https://www.simpletech.uy/dhl-uruguay/
  'dhl-uruguay': {
    lead: 'Desarrollamos con agilidad un chatbot en WhatsApp que permitió reorganizar el sistema de envíos y atención al cliente colapsado en Uruguay.',
    facts: [
      { label: 'INDUSTRIA', value: 'Logística y distribución' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '+40', label: 'años de DHL en el mercado uruguayo', highlight: true },
      { value: '+220', label: 'países en los que opera DHL' },
      { value: '+380.000', label: 'colaboradores de DHL en el mundo' },
    ],
    about: {
      title: 'Sobre DHL',
      paragraphs: [
        'DHL es el líder global en la industria de logística y tiene una trayectoria de más de 40 años en el mercado uruguayo.',
        'La empresa cuenta con más de 380.000 colaboradores, en más de 220 países, que impactan en el sector de envíos internacionales, servicios de mensajería y transporte de cargas.',
      ],
    },
    story: [
      {
        kicker: '01 · CONTEXTO',
        title: 'Una crisis que imposibilitaba la operación.',
        text: 'DHL Uruguay necesitaba reactivar el sistema de envíos hacia el mercado de Cuba. «Previo a la agenda electrónica, teníamos colapsados todos los locales de DHL», recuerda Sofía Storace, Head of Retail.',
      },
      {
        kicker: '02 · LA SOLUCIÓN',
        title: 'Un chatbot 100% a medida en WhatsApp.',
        text: 'Diseñamos con agilidad un chatbot customizado para que los clientes ingresen los datos de su paquete con campos implementados según las necesidades de DHL y su sistema logístico. Así gestionan la etapa más engorrosa del proceso de forma remota, autónoma y digital, con un sistema automatizado de agenda online.',
      },
      {
        kicker: '03 · SEGUNDA ETAPA',
        title: 'Pago integrado con Abitab.',
        text: 'Integramos una pasarela de pago para abonar el costo de los envíos a través de Abitab, de modo que el ingreso del pedido se completa de forma integral con el bot de la cuenta oficial de WhatsApp de DHL. Hoy el usuario solo asiste al local para depositar su paquete, sin ninguna gestión administrativa en el lugar.',
      },
    ],
    flowTitle: 'Del WhatsApp al local, sin trámites.',
    flowLabel: 'CHATBOT DE ENVÍOS · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/Caso-de-exito-DHL-Simpletech.webp',
      alt: 'Conversación con el chatbot de DHL Uruguay en WhatsApp: ubicación, nombre y sucursal',
    },
    flow: [
      { t: 'El cliente escribe', d: 'Inicia la conversación en la cuenta oficial de WhatsApp de DHL.', dot: '#28c76f' },
      {
        t: 'Ingresa los datos del envío',
        d: 'Completa los datos del paquete con campos pensados para el sistema logístico de DHL.',
        dot: '#7367f0',
      },
      {
        t: 'Paga con Abitab',
        d: 'Abona el costo del envío a través de la pasarela de pago integrada.',
        dot: '#DCD291',
      },
      { t: 'Deja el paquete', d: 'Asiste al local solo para depositar el paquete, sin trámites.', dot: '#00cfe8' },
    ],
    achievements: {
      title: 'Resultados',
      items: [
        {
          t: 'Envíos reactivados',
          d: 'DHL Uruguay logró reactivar el sistema de envíos hacia Cuba con una agenda online automatizada.',
        },
        {
          t: 'Demanda organizada',
          d: '«Luego de la implementación, logramos trabajar de forma ordenada, organizando la demanda y el sistema de envíos.»',
        },
        {
          t: 'Locales descongestionados',
          d: 'La gestión pasó a hacerse de forma remota y digital, y el local quedó solo para recibir paquetes.',
        },
        {
          t: 'Proceso integral',
          d: 'Del ingreso de los datos al pago, todo el pedido se completa con el bot de WhatsApp.',
        },
      ],
    },
    testimonial: {
      quote: [
        'Valoramos trabajar con proveedores como Simpletech que son aliados, que nos entienden y ponen de sí para trabajar mano a mano, solucionar temas, pensar en procesos, guiarnos y colaborar más allá de la venta.',
        'Se trabaja muy cómodo con Simpletech. Por sobre todas las cosas, con un alto profesionalismo y conocimiento de la causa. Hacen mucho más fácil el trabajo. Tal es así que seguimos buscando nuevas formas de potenciar juntos nuestro crecimiento.',
      ],
      author: 'Sofía Storace',
      role: 'Head of Retail',
      company: 'DHL Uruguay',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Sofia-Storace-DHL.webp',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/aliaxis-global-supplier/
  aliaxis: {
    lead: 'Aliaxis optimizó y unificó sus comunicaciones, interconectó sucursales a nivel internacional y redujo en cientos de miles de dólares la inversión en telecomunicaciones.',
    facts: [
      { label: 'INDUSTRIA', value: 'Manufactura' },
      { label: 'ALCANCE', value: 'Latinoamérica' },
      { label: 'TECNOLOGÍA', value: 'Telefonía IP · 3CX' },
    ],
    metrics: [
      { value: '100K+', label: 'USD de ahorro en inversión en telecomunicaciones', highlight: true },
      { value: '1', label: 'sistema de comunicaciones unificadas para toda Latinoamérica' },
      { value: '0', label: 'costo extra para sumar sucursales y usuarios' },
    ],
    about: {
      title: 'Sobre Aliaxis',
      paragraphs: [
        'Aliaxis es la empresa más grande del mundo en la industria de tuberías y accesorios para la conducción de fluidos.',
        'Es un grupo multinacional, líder mundial en la fabricación y distribución de sistemas para manipulación de fluidos, principalmente para servicios de construcción, infraestructura, industrias y servicios públicos. Con sede en Bruselas, Bélgica, tiene una facturación de 3.000 millones de euros y más de 16.000 empleados.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'Según sus palabras, la atención recibida y el entendimiento de los desafíos de Aliaxis por parte del equipo de Simpletech fue uno de los factores que incidieron en la decisión. De forma muy ágil se instaló la solución para que pudiera ser testeada, y eso les transmitió seguridad y solidez.',
    },
    story: [
      {
        kicker: '01 · PRIMER DESAFÍO',
        title: 'Comunicaciones a nivel continental.',
        text: 'Aliaxis utilizaba una red tradicional de telefonía con una solución propietaria de Avaya. Necesitaba optimizar sus comunicaciones a nivel continental a medida que crecía la demanda que generaba su expansión, aprovechando al máximo su infraestructura y reduciendo costos de forma significativa.',
        points: [
          {
            t: 'Objetivo',
            d: 'Hacer más eficiente la comunicación global de la compañía, eliminar la diversidad de dispositivos y aplicaciones, y reducir los costos fijos innecesarios en comunicaciones.',
          },
          {
            t: 'Solución',
            d: 'Un sistema de comunicaciones unificadas para toda la corporación en Latinoamérica con telefonía IP de 3CX: troncal SIP, salientes por la opción más económica e intercompany por internos. Sumar sucursales y usuarios pasó a ser rápido, seguro y sin costos extra, con internos móviles, módulo de call center, mensajería y videoconferencias web en una misma plataforma. Hoy el equipo cuenta con un único punto de contacto que vuelve accesibles a todas las personas, en cualquier momento y lugar.',
          },
        ],
      },
      {
        kicker: '02 · SEGUNDO DESAFÍO',
        title: 'Alta disponibilidad y optimización de recursos.',
        text: 'Asegurar un servicio de telefonía constante y sin interrupciones, con menos costos de manejo, supervisión y mantenimiento.',
        points: [
          {
            t: 'Objetivo',
            d: 'Reducir costos en manejo, supervisión y mantenimiento de su red de telefonía, asegurando un servicio constante sin interrupciones.',
          },
          {
            t: 'Solución',
            d: 'Un sistema con respaldos automáticos y restablecimiento en caso de fallas, que incluye una licencia de espera adicional (Standby License) para el equipo secundario. Así la central queda replicada con conmutación por error incorporada, sin comprar dos licencias por separado.',
          },
        ],
      },
      {
        kicker: '03 · TERCER DESAFÍO',
        title: 'Liberar al equipo de IT.',
        text: 'En cada país, Aliaxis tiene industrias de grandes dimensiones con un número elevado de internos: el departamento de IT, además de los equipos industriales, tenía que ocuparse de la telefonía y su cableado.',
        points: [
          { t: 'Objetivo', d: 'Liberar al equipo de IT de las incidencias de la telefonía.' },
          {
            t: 'Solución',
            d: 'Con 3CX, IT se olvidó de la administración de la central: tiene una interfaz muy intuitiva y las líneas y extensiones se agregan fácilmente, sin cargos ni licencias adicionales. Al ser VoIP, alcanza con la red de datos e inalámbrica, sin cableado telefónico.',
          },
        ],
      },
      {
        kicker: '04 · CUARTO DESAFÍO',
        title: 'Microsoft Teams conectado a la red pública.',
        text: 'Aliaxis usa Microsoft Teams como herramienta complementaria de comunicación, pero no permitía llamar fuera de la organización. En 2020, con el aumento del trabajo remoto por la pandemia, encontrar una solución se volvió indispensable.',
        points: [
          { t: 'Objetivo', d: 'Conectar Microsoft Teams a la PSTN (red de telefonía pública).' },
          {
            t: 'Solución',
            d: 'Integramos Microsoft Teams con 3CX de forma segura y confiable, mediante un controlador de borde de sesión (SBC) completamente basado en software.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Desde el primer momento el equipo de Simpletech se mantuvo muy atento a nuestras consultas, con la rapidez y eficiencia que los caracteriza, salvando las dificultades que uno piensa pueden surgir al instalar una solución tecnológica a distancia.',
      author: 'Orlando Chaves',
      role: 'Infrastructure Manager Latinoamérica',
      company: 'Aliaxis',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/honda-chile/ (ahí los productos figuran con sus nombres anteriores:
  // WittySuite, WittySend, WittyAgent y WittyBots).
  'honda-chile': {
    lead: 'Honda Chile escaló su gestión de clientes logrando un servicio más eficiente a través de WhatsApp Business con SimpleSuite.',
    facts: [
      { label: 'INDUSTRIA', value: 'Automotriz' },
      { label: 'PAÍS', value: 'Chile' },
      { label: 'INTEGRACIÓN', value: 'Salesforce' },
    ],
    metrics: [
      { value: 'x2', label: 'tasa de conversión de las campañas de recall con WhatsApp', highlight: true },
      { value: '18%', label: 'de cierre de ventas en WhatsApp: la 2da mejor tasa de cierre' },
      { value: '0', label: 'clientes sin atender (antes, el 16% de las llamadas quedaba sin respuesta)' },
    ],
    about: {
      title: 'Sobre Honda Chile',
      paragraphs: [
        'Honda Chile es agente oficial de la icónica marca japonesa de automóviles, que se ha destacado en el mercado automotriz por su innovación, calidad y compromiso con la excelencia.',
        'Importa y distribuye vehículos en el país a través de concesionarias oficiales, y centraliza la atención de venta, postventa y campañas de recall o seguridad, derivando al concesionario y taller oficial correspondiente según la ubicación del cliente.',
        'Un recall o campaña de seguridad es un llamado preventivo de la marca para corregir de forma gratuita, y en talleres oficiales, vehículos con sistemas o componentes potencialmente riesgosos para el usuario y sus acompañantes.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'Inicialmente, la prioridad era la fácil integración con Salesforce. Buscaban un proveedor accesible capaz de conectarse con Salesforce, ejecutar campañas outbound, implementar un chatbot para atención automatizada y vincularse con un contact center operado por agentes.',
      quote: {
        text: 'Valoramos mucho la flexibilidad de la empresa y la herramienta. Siempre hay una predisposición positiva hacia nuestras sugerencias de cambios y problemáticas. Con ustedes siempre es «Sí, se puede, hagámoslo».',
        author: 'Carolina Zenteno',
        role: 'Jefa CRM · Experiencia de Clientes',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/carolina-zenteno.webp',
      },
    },
    storyLayout: 'rows',
    story: [
      {
        kicker: '01 · PRIMER DESAFÍO',
        title: 'Una atención que no escalaba.',
        text: 'La atención era 1 a 1 y cualquier acción saturaba los canales, generando molestias en concesionarias y clientes: el 16% de las llamadas quedaba sin atender, más de 1.200 clientes en un año. Las campañas de recall por email y SMS pedían llamar por teléfono, pero cada ejecutiva atendía una llamada a la vez y se formaban colas de 20 o 30 llamadas en espera; muchos clientes desistían.',
        points: [
          {
            t: 'Solución',
            d: 'Se habilitó WhatsApp como canal, potenciado por SimpleSuite: las campañas de recall se envían de forma masiva a bases segmentadas con SimpleSend, y varias ejecutivas atienden el mismo número desde SimpleAgents, con varias conversaciones en simultáneo. Ya no queda ningún cliente sin atender.',
          },
        ],
        quote: {
          text: 'Desde el primer envío vimos buenos resultados, sobre todo considerando que a esos clientes no los habíamos contactado por este medio. Un gran beneficio de esto es el hecho de mantener el canal abierto con el cliente de forma permanente.',
          author: 'Leandro Contreras',
          role: 'Encargado Experiencia Clientes',
          photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Leandro-Contreras-Honda-Chile.webp',
        },
      },
      {
        kicker: '02 · SEGUNDO DESAFÍO',
        title: 'Recalls que llevaban 10 a 12 minutos por cliente.',
        text: 'Las campañas de recall requerían solicitarle mucha información al cliente y entre 10 y 12 minutos de dedicación de cada ejecutivo, algo insostenible e imposible de escalar ante el gran volumen de clientes.',
        points: [
          {
            t: 'Solución',
            d: 'Se automatizó con un chatbot de SimpleBots la obtención de la información necesaria para solicitar un recall. La ejecutiva ya no hace preguntas repetitivas y gana tiempo para tareas de mayor valor, como la atención personalizada o la agenda final del servicio.',
          },
        ],
      },
      {
        kicker: '03 · TERCER DESAFÍO',
        title: 'Una marca, un solo número.',
        text: 'Centralizar la comunicación de la marca en un único número y darles a las concesionarias una herramienta estándar para atender a sus clientes.',
        points: [
          {
            t: 'Solución',
            d: 'La comunicación se organizó en bandejas específicas para cada concesionaria oficial. El cliente elige la zona en la que vive o quiere comprar y SimpleSuite lo deriva por georreferenciación a la bandeja de la concesionaria más cercana. En los recalls, lo atiende una ejecutiva de Honda, que luego lo deriva a la concesionaria que prefiera.',
          },
        ],
        quote: {
          text: 'La implementación fue muy fluida; manteníamos reuniones periódicas programadas, lo que nos permitía avanzar de manera constante. Además, su equipo es super completo: había un especialista en cada área, y Leonardo supervisaba a cada miembro para garantizar que todos llegaran a la siguiente reunión con su parte hecha, y todos eran muy eficientes.',
          author: 'Carolina Zenteno',
          role: 'Jefa CRM · Experiencia de Clientes',
          photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/carolina-zenteno.webp',
        },
      },
    ],
    flowTitle: 'Un chatbot que ordena cada consulta.',
    flowLabel: 'CHATBOT HONDA AUTOS · WHATSAPP',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Chatbots-Honda.png',
      alt: 'Chatbot de Honda Autos en WhatsApp con opciones de ventas, servicio técnico y campañas de seguridad',
    },
    flow: [
      {
        t: 'Bienvenida y menú',
        d: 'El bot saluda y ofrece las opciones: ventas, servicio técnico o campaña de seguridad.',
        dot: '#28c76f',
      },
      {
        t: 'Recall guiado',
        d: 'Explica qué es un recall, verifica si el vehículo está afectado y recolecta los datos necesarios.',
        dot: '#7367f0',
      },
      {
        t: 'Derivación por zona',
        d: 'Según la ubicación del cliente, lo deriva a la bandeja de la concesionaria más cercana.',
        dot: '#DCD291',
      },
      {
        t: 'La ejecutiva agenda',
        d: 'Con los datos ya cargados, la ejecutiva se enfoca en la atención personalizada y la agenda del servicio.',
        dot: '#00cfe8',
      },
    ],
    closingTitle: '¿Qué es lo que más valoran de la solución?',
    testimonial: [
      {
        quote:
          'La capacidad de atención múltiple, la flexibilidad a los cambios, y el hecho de que se puedan automatizar ciertas consultas o solicitudes de información para que la ejecutiva no tenga que perder el tiempo solicitándolas.',
        author: 'Leandro Contreras',
        role: 'Encargado Experiencia Clientes',
        company: 'Honda Chile',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Leandro-Contreras-Honda-Chile.webp',
      },
      {
        quote:
          'Lo que más valoro es poder llegar masivamente a nuestros clientes de forma sencilla. Es muy fácil crear un template, incluir tu mensaje, una imagen, una URL; la herramienta es amigable. Además, permite que uno sea libre y haga lo que quiera: el límite es infinito, ¡la creatividad a flor de piel!',
        author: 'Carolina Zenteno',
        role: 'Jefa CRM · Experiencia de Clientes',
        company: 'Honda Chile',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/carolina-zenteno.webp',
      },
    ],
  },

  // Fuente: https://www.simpletech.uy/portfolio/montes-del-plata/
  'montes-del-plata': {
    lead: 'Una solución eficiente e innovadora para gestionar por WhatsApp el arribo de camiones de madera de terceros al Complejo Industrial de Montes del Plata.',
    facts: [
      { label: 'INDUSTRIA', value: 'Forestal-industrial' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '~20', label: 'camiones diarios de madera de terceros, agendados por WhatsApp', highlight: true },
      { value: '2', label: 'días para reservar cupo: el mismo día o el siguiente' },
      { value: '0', label: 'veces que el conductor se baja del camión para registrar su arribo' },
    ],
    about: {
      title: 'Sobre Montes del Plata',
      paragraphs: [
        'Montes del Plata es una empresa forestal-industrial dedicada a la producción de pulpa de celulosa de Eucalyptus.',
        'Fue fundada en 2009 por Arauco (Chile) y Stora Enso (Suecia-Finlandia), dos compañías líderes en el sector forestal a nivel mundial.',
      ],
    },
    why: {
      title: 'Objetivo del proyecto',
      text: 'Coordinar la llegada y descarga de camiones de madera de terceros en el Complejo Industrial, para acortar los tiempos de espera de los conductores y favorecer una mejor planificación del abastecimiento a nivel logístico.',
      quote: {
        text: 'Hasta que el conductor de madera de terceros no llegaba al Complejo Industrial, no tenía certeza de contar con un cupo para ese día. Además, al no tener limitantes de cupos por hora, no era posible distribuir las llegadas, lo que complejizaba la operación.',
        author: 'Victoria Fernández',
        role: 'Data & Analytics Leader',
      },
    },
    storyLayout: 'rows',
    story: [
      {
        kicker: '01 · CONTEXTO',
        title: 'Un tótem, un cupo diario y mucha incertidumbre.',
        text: 'Montes del Plata recibe en el entorno de 20 camiones diarios de madera de terceros. Para gestionar su llegada, se asociaba un límite diario de unidades a descargar por empresa en su sistema de gestión forestal. Al arribar al Complejo Industrial, los conductores registraban su viaje en un tótem y, si había cupos disponibles, se dirigían a la balanza.',
      },
      {
        kicker: '02 · DESAFÍOS',
        title: 'Esperas largas y sin previsibilidad.',
        text: 'El sistema anterior hacía difícil planificar la descarga y dejaba a los conductores sin saber cuánto iban a esperar.',
        points: [
          {
            t: 'Falta de previsibilidad',
            d: 'No había una agenda con horarios asignados, lo que dificultaba planificar la descarga según los atributos de la madera. El conductor no tenía reserva y desconocía cuánto debería aguardar en la playa de espera.',
          },
          {
            t: 'Tiempos de espera prolongados',
            d: 'Si un conductor llegaba cuando ya se habían alcanzado los cupos diarios, se generaban retrasos en el ingreso.',
          },
          {
            t: 'Soporte técnico y hardware',
            d: 'La solución anterior, muy customizada, requería bastante soporte de operaciones y TI, y el escáner de remitos fallaba de forma recurrente.',
          },
          {
            t: 'Problemas documentales tardíos',
            d: 'Las irregularidades en la documentación del conductor o del camión se detectaban recién al llegar e interactuar con el tótem, sin posibilidad de resolverlas antes.',
          },
          {
            t: 'Gran cantidad de usuarios',
            d: 'La solución debía ser intuitiva y fácil de adoptar, para que la capacitación de los conductores fuese lo más amena posible.',
          },
        ],
      },
      {
        kicker: '03 · SOLUCIÓN',
        title: 'Una agenda de arribos en WhatsApp.',
        text: 'Desarrollamos e implementamos un sistema de gestión de agendas para la playa de arribos a través de WhatsApp, un canal familiar y de fácil adopción.',
        points: [
          {
            t: 'Agenda de llegadas',
            d: 'Los conductores agendan, modifican o cancelan su reserva por WhatsApp, con fecha y hora asignadas, para el mismo día o el siguiente.',
          },
          {
            t: 'Control de documentación',
            d: 'Antes de agendarse, se verifican la cédula y la matrícula consultando su estado en otros sistemas, para detectar problemas a tiempo.',
          },
          {
            t: 'Registro automatizado de arribo',
            d: 'Al llegar, el conductor avisa por el mismo bot. Con la matrícula se valida la reserva y se habilita el ingreso solo si está cerca de la playa de espera (georreferenciación) y dentro de la tolerancia horaria definida. Todo sin bajarse del camión.',
          },
        ],
        quote: {
          text: 'Ahora dar soporte a los conductores es más intuitivo que antes, ya que podemos simular los mismos pasos a través del bot. Además evitamos fallas asociadas al escáner del remito: actualmente esa foto la envían por WhatsApp y la almacenamos automáticamente en un sitio compartido, de acuerdo a la fecha de llegada.',
          author: 'Victoria Fernández',
          role: 'Data & Analytics Leader',
        },
      },
      {
        kicker: '04 · ADOPCIÓN',
        title: 'Mejor de lo esperado.',
        text: '¿Qué tan rápido se adaptaron los choferes al uso de la herramienta?',
        quote: {
          text: 'Fue mejor de lo que esperábamos. Se coordinó tanto con las empresas proveedoras como con operaciones de madera, para darles soporte ante cualquier consulta. El camino fue muy guiado, a través de videos con ejemplos. Además, todos los pasos del bot fueron diseñados para ser fáciles de interpretar, y ante cualquier error el mensaje es bien específico, para que sea posible solucionar lo antes posible.',
          author: 'Victoria Fernández',
          role: 'Data & Analytics Leader',
        },
      },
    ],
    flowTitle: 'Reservar cupo y avisar el arribo, desde WhatsApp.',
    flowLabel: 'AGENDA DE ARRIBOS · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2024/12/Reserva-de-cupo-por-wpp.png',
      alt: 'Chat de Montes del Plata en WhatsApp para reservar un cupo, con fotos del código QR y del remito',
    },
    flow: [
      {
        t: 'Elige reservar un cupo',
        d: 'Ingresa la matrícula del camión y su documento: el bot los valida contra los sistemas de la empresa.',
        dot: '#28c76f',
      },
      {
        t: 'Elige día y hora',
        d: 'Envía la foto del código QR e indica si llega en el día o al siguiente, y a qué hora.',
        dot: '#7367f0',
      },
      {
        t: 'Envía el remito',
        d: 'Manda la foto del remito, confirma el número y concreta la reserva.',
        dot: '#DCD291',
      },
      {
        t: 'Notifica el arribo',
        d: 'Al llegar a planta avisa por el mismo bot y, si está cerca y en horario, se habilita su ingreso.',
        dot: '#00cfe8',
      },
    ],
    achievements: {
      title: 'Resultados',
      items: [
        {
          t: 'Menos tiempo de espera',
          d: 'Los conductores reservan según la hora en que estiman llegar y, si se atrasan, pueden modificar su reserva.',
        },
        {
          t: 'Mayor organización',
          d: 'El flujo de camiones de madera de terceros se volvió ordenado y predecible.',
        },
        {
          t: 'Mejor experiencia de los choferes',
          d: 'Agendar la llegada por anticipado evita esperas y optimiza su tiempo.',
        },
        {
          t: 'Previsibilidad de maderas',
          d: 'Un mejor control y previsión para gestionar de forma eficiente el mix de madera recibido en el Complejo Industrial.',
        },
      ],
    },
    conclusion: [
      'Este caso demuestra cómo es posible usar WhatsApp para implementar un sistema de agenda que mejore la eficiencia operativa, reduzca los tiempos de espera y mejore la experiencia de los usuarios.',
    ],
    closingTitle: '¿Qué más valoran de trabajar con Simpletech?',
    testimonial: [
      {
        quote:
          'Valoramos la rapidez con la que implementamos las reglas del bot de WhatsApp y con la que íbamos haciendo los cambios requeridos. También destacamos la capacitación en el uso de la herramienta, permitiendo que nosotros mismos hagamos ediciones.',
        author: 'Victoria Fernández',
        role: 'Data & Analytics Leader',
        company: 'Montes del Plata',
      },
      {
        quote:
          'Para los proveedores de madera de terceros fue una gran ayuda porque les dio mayor visibilidad de los horarios de descarga. Ahora saben si sus camiones ya reservaron y a qué hora van a llegar. Se confeccionaron reportes de Power BI a medida, que los ayudan en el día a día para hacer seguimiento a las reservas.',
        author: 'Victoria Fernández',
        role: 'Data & Analytics Leader',
        company: 'Montes del Plata',
      },
    ],
  },

  // Fuente: https://www.simpletech.uy/portfolio/ta-ta-supermercados/ (ahí la plataforma figura con su nombre
  // anterior, WittyBots).
  'ta-ta': {
    lead: 'Cómo a través de WhatsApp Ta-Ta logró simplificar el reporte y monitoreo de incidencias en Jira, mejorando la experiencia de sus clientes internos.',
    facts: [
      { label: 'INDUSTRIA', value: 'Retail' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'INTEGRACIÓN', value: 'Jira Service Management' },
    ],
    metrics: [
      { value: '+200', label: 'puntos de venta de Ta-Ta en Uruguay', highlight: true },
      { value: '19', label: 'departamentos con sucursales físicas: el 100% del territorio' },
      { value: '+60', label: 'años de trayectoria en el retail uruguayo' },
    ],
    about: {
      title: 'Sobre Ta-Ta',
      paragraphs: [
        'Ta-Ta Supermercados es una empresa de retail con una trayectoria de más de 60 años en Uruguay. Es una de las líderes del sector, con operaciones en más de 200 puntos de venta y presencia en el 100% del territorio uruguayo, a través de sucursales físicas en los 19 departamentos.',
        'Multi Ahorro Hogar, BAS, woOw! y Frontoy son empresas asociadas a la marca que operan en paralelo, atendiendo diferentes verticales del negocio.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'Encontraron en Simpletech un aliado tecnológico para lograr sus objetivos de omnicanalidad e innovación. Atender ideas disruptivas, que más tarde siempre se volvieron realidad, es otra fortaleza que señalan como diferencial y que influyó en la decisión.',
      quote: {
        text: 'Más que escuchar propuestas nos gusta escuchar proveedores que se alineen a nuestro horizonte y objetivos de ser una empresa omnicanal e innovadora. Nosotros no solo queremos un chatbot. Queremos MÁS que un chatbot. Simpletech lo entendió desde el inicio y por eso los elegimos.',
        author: 'Ignacio Gorriti',
        role: 'Coordinador de Soporte Integral',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Ignacio-Gorriti-TaTa.webp',
      },
    },
    storyLayout: 'rows',
    story: [
      {
        kicker: '01 · DESAFÍO',
        title: 'Reportar incidencias, para todos.',
        text: 'Fieles a su filosofía de «innovación, atención a los detalles y mejora continua», buscaron una herramienta para mejorar la experiencia de sus clientes internos al reportar incidencias: desde los cajeros hasta los operadores de logística que recorren el país entregando mercadería. Necesitaban algo familiar y de acceso simple, para personal poco vinculado a las plataformas digitales.',
        points: [
          {
            t: 'Objetivo',
            d: 'Brindar un nuevo canal de soporte, más accesible, a los clientes no informatizados de la organización. La solución debía ser simple para el usuario y también para el equipo que recibe los incidentes.',
          },
        ],
      },
      {
        kicker: '02 · SOLUCIÓN',
        title: 'SimpleBots y Jira Service Management en WhatsApp.',
        text: 'El proyecto integró SimpleBots y Jira Service Management en la WhatsApp Business API de Ta-Ta. El diseño de la solución se divide en dos ramas:',
        points: [
          {
            t: 'Creación de tickets de incidentes',
            d: 'Los empleados reportan y piden asistencia por WhatsApp cuando surge una falla que requiere al personal de soporte, respondiendo una serie de preguntas consecutivas que nacen de un funnel diseñado por Ta-Ta.',
          },
          {
            t: 'Consulta y actualización de incidentes',
            d: 'El personal de soporte reporta el estado de cada incidente en tiempo real y sus superiores acceden a un informe detallado. Además, se pueden sumar comentarios sobre la evolución de cada incidente con audios e imágenes de WhatsApp.',
          },
        ],
      },
    ],
    flowTitle: 'De un mensaje de WhatsApp a un ticket en Jira.',
    flowLabel: 'REPORTE DE INCIDENCIAS · 4 PASOS',
    flow: [
      {
        t: 'El empleado escribe',
        d: 'Ante una falla, el cajero u operador pide asistencia por WhatsApp.',
        dot: '#28c76f',
      },
      {
        t: 'Responde el funnel',
        d: 'El bot hace preguntas consecutivas, diseñadas por Ta-Ta, para relevar el incidente.',
        dot: '#7367f0',
      },
      {
        t: 'Se crea el ticket',
        d: 'El incidente queda registrado en Jira Service Management para el equipo de soporte.',
        dot: '#DCD291',
      },
      {
        t: 'Seguimiento en tiempo real',
        d: 'Soporte actualiza el estado y suma comentarios con audios e imágenes; los superiores ven el informe.',
        dot: '#00cfe8',
      },
    ],
    closingTitle: '¿Qué valoran de trabajar con Simpletech?',
    conclusion: [
      'La solución simplificó el proceso de reporte para personas con poco conocimiento o experiencia en herramientas tecnológicas, usando un canal que ya conocen: WhatsApp.',
    ],
    testimonial: {
      quote:
        'Con el equipo de Simpletech lo que hemos logrado es un partnership. Nuestra asociación común es innovar, exceder las expectativas y ser ágiles. Hay un buen trabajo en equipo... Cada vez que ha surgido una idea loca, nunca escuchamos un «No» como respuesta. Desde Simpletech nunca se descartó ninguna de nuestras ideas explosivas. Es más, se analizaron y la mayoría hoy están implementadas. Nuestra visión es que este trabajo en equipo sea incremental a todas las áreas de la empresa.',
      author: 'Eduardo Zukauskas',
      role: 'Gerente de Operaciones IT',
      company: 'Ta-Ta Supermercados',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Eduardo-Zukauskas-TaTa.webp',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/lider-bci/ (ahí la plataforma figura con su nombre anterior, WittySuite).
  'lider-bci': {
    lead: 'Lider Bci transformó la contratación del SOAP en una experiencia 100% digital, simple y conversacional.',
    facts: [
      { label: 'INDUSTRIA', value: 'Retail financiero' },
      { label: 'PAÍS', value: 'Chile' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '46%', label: 'de conversión en el canal de WhatsApp', highlight: true },
      { value: '6x', label: 'más conversión que el canal web tradicional' },
      { value: '2 min', label: 'para contratar el SOAP (antes, 5 minutos)' },
    ],
    about: {
      title: 'Sobre Lider Bci',
      paragraphs: [
        'Lider Bci es una empresa chilena especializada en retail financiero, que ofrece productos y servicios financieros accesibles, convenientes y alineados a las necesidades de sus clientes.',
        'Su principal producto es la tarjeta de crédito Lider Bci, a través de la cual también brinda seguros, asistencias y diversas soluciones de financiamiento, como Avance, Super Avance, entre otros.',
        'Nació en 2018 de la alianza entre Walmart Chile y Banco Bci, consolidándose rápidamente a nivel nacional con más de un millón de tarjetas de crédito emitidas. Con una fuerte apuesta por la digitalización, ofrece tarjeta digital, pagos móviles y una app de autogestión que simplifica y asegura la experiencia de sus clientes.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'La prioridad de la Corredora de Seguros Lider Bci, como parte integral del ecosistema financiero de la marca, era transformar el canal de WhatsApp en una verdadera experiencia conversacional y transaccional. Buscaban un proveedor capaz de ofrecer automatización inteligente, integración segura con sus sistemas y acompañamiento estratégico para empoderar a su propio equipo en la gestión de flujos.',
    },
    story: [
      {
        kicker: '01 · EL DESAFÍO',
        title: 'De un canal funcional a uno verdaderamente conversacional.',
        text: 'En el marco de su estrategia de mejora continua, Lider Bci identificó la necesidad de fortalecer la experiencia dentro del canal de WhatsApp. El canal operaba con otro proveedor: sus flujos predefinidos eran estáticos y derivaban rápidamente al usuario hacia enlaces externos o agentes humanos, lo que interrumpía la continuidad de la experiencia, dificultaba el seguimiento automatizado y reducía la conversión. El desafío era sumar automatización, autonomía para el cliente y trazabilidad operativa.',
      },
      {
        kicker: '02 · LA SOLUCIÓN',
        title: 'SimpleSuite para un WhatsApp transaccional.',
        text: 'Acompañamos a Lider Bci en la adopción de SimpleSuite, nuestra plataforma de diseño de conversaciones y automatización de procesos. El proyecto se enfocó en dos frentes clave:',
        points: [
          {
            t: 'Contratación digital del SOAP',
            d: 'Asesoramiento estratégico, soporte técnico y capacitación personalizada para que el equipo de Lider Bci diseñara e implementara de forma autónoma un flujo conversacional intuitivo, integrado con sus sistemas: una operación segura, escalable y sin fricciones.',
          },
          {
            t: 'WhatsApp como herramienta de venta',
            d: 'El canal pasó de ser un punto de atención a un canal transaccional, donde los usuarios contratan el Seguro SOAP de forma completamente digital y en pocos pasos.',
          },
        ],
      },
      {
        kicker: '03 · EL RESULTADO',
        title: 'WhatsApp, un canal clave de conversión.',
        text: 'Tras la implementación, WhatsApp se transformó en un canal clave para la contratación del SOAP: 46% de conversiones dentro del canal —6 veces más que el canal web tradicional— y un tiempo promedio de contratación que bajó de 5 a solo 2 minutos, facilitando la conversión rápida, especialmente en períodos de alta demanda.',
      },
    ],
    comparison: {
      title: 'Antes y después de llevar la contratación del SOAP a WhatsApp.',
      columns: ['INDICADOR', 'ANTES', 'DESPUÉS (CON WHATSAPP)'],
      rows: [
        ['Canal de ventas SOAP', 'Solo web', 'Web + WhatsApp'],
        ['Tasa de conversión SOAP', '8% web', '46% WhatsApp'],
        ['Tiempo promedio de contratación', '5 minutos', '2 minutos'],
        ['Experiencia conversacional', 'Limitada / enlaces', '100% digital y automatizada'],
        ['Escalabilidad y autonomía', 'Baja', 'Alta autonomía'],
      ],
    },
    awards: ['Primera corredora en realizar ventas por WhatsApp en Chile', 'Finalista AIP EILA Awards · Chile 2025'],
    awardsImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2025/09/Historias-de-exito-LiderBCI_01-1536x687.png',
      alt: 'Conversación de WhatsApp con ValerIA, la asistente de IA de Seguros Lider Bci, junto a los sellos de reconocimiento',
    },
    achievements: {
      title: 'Logros con SimpleSuite',
      items: [
        {
          t: 'Automatización personalizada',
          d: 'Adaptada a las necesidades específicas de la empresa, con una automatización inteligente que mejora la eficiencia de sus comunicaciones.',
        },
        {
          t: 'Integración versátil',
          d: 'Integración fluida con los servicios existentes, garantizando la seguridad total de los datos.',
        },
        {
          t: 'Análisis avanzado',
          d: 'Análisis detallados del rendimiento de las campañas para obtener insights y mejorar continuamente las estrategias.',
        },
        {
          t: 'Autonomía y rapidez',
          d: 'Autonomía en la gestión y rapidez en la implementación de cambios.',
        },
        {
          t: 'Soporte y seguimiento continuo',
          d: 'Un acompañamiento constante para optimizar el uso de la herramienta.',
        },
      ],
    },
    conclusion: [
      'El caso de Lider Bci es un ejemplo claro de cómo la combinación entre visión estratégica e innovación por parte de nuestros clientes, potenciada por una herramienta versátil como SimpleSuite, puede traducirse en un impacto real y medible en sus canales digitales.',
      'Nuestra colaboración no solo implicó la entrega de una plataforma, sino también el compromiso de empoderar a su equipo para que fueran protagonistas de la transformación. A través de capacitación y soporte cercano, Lider Bci pudo diseñar e implementar por sí mismo un flujo de contratación ágil, eficaz y alineado con las nuevas expectativas de sus usuarios.',
      'Nos enorgullece haber sido parte de este proyecto, que nació del deseo de liderar el camino en innovación digital dentro del sector financiero en Chile. Casos como este reafirman nuestro propósito: ayudar a las organizaciones a crear experiencias conversacionales que realmente funcionan, escalan y evolucionan con sus necesidades.',
    ],
    testimonial: {
      quote:
        'El equipo se sintió siempre acompañado en el proceso de aprendizaje y el desarrollo casi in house de SOAP. Siempre tuvieron buena recepción y una pronta respuesta por parte de ustedes, nos ayudaron a llegar al siguiente nivel en la innovación.',
      author: 'Sebastián Gallardo',
      role: 'Sub Gerente CRM',
      company: 'Lider Bci',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/atgen-innovacion-biotecnologica/ (ahí los productos figuran con sus
  // nombres anteriores: WittySuite, WittyBots y WittyAgent).
  atgen: {
    lead: 'ATGen multiplicó la demanda de sus servicios y pudo seguir enfocando sus recursos en el core del negocio, gracias a la automatización de la atención al cliente.',
    facts: [
      { label: 'INDUSTRIA', value: 'Biotecnología' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '60.000', label: 'tests en un solo día en el pico de demanda', highlight: true },
      { value: '3 días', label: 'para tener usuarios interactuando por WhatsApp' },
      { value: '4', label: 'agentes atendiendo cuando el usuario pide hablar con una persona' },
    ],
    about: {
      title: 'Sobre ATGen',
      paragraphs: [
        'ATGen es una empresa dedicada a la biotecnología. Fundada en 2001, fue la primera spin-off incubada en la Facultad de Ciencias de la Universidad de la República en Uruguay.',
        'Esos orígenes definen el carácter innovador de la empresa, que le ha merecido múltiples premios y reconocimientos.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'Simpletech brinda el mejor tiempo de implementación del mercado, gracias a sus proveedores y a SimpleSuite: una plataforma diseñada desde cero para crear experiencias de usuario con una interfaz simple y sin código, con API para integrarse a las herramientas de la empresa. Además, su modelo SaaS se adapta a los cambios imprevisibles de la demanda, con costos acordes al valor que aporta.',
      quote: {
        text: 'Cuando se implementó la solución, la empresa se había quedado sin servicio al cliente, dada la explosiva demanda de nuestros servicios. Las líneas telefónicas se saturaron por completo, incluso nuestros teléfonos personales colapsaron. Era imposible acompañar esta demanda con agentes. La única forma de solucionarlo era incorporando el chatbot de SimpleBots a través de WhatsApp.',
        author: 'Ana Lockhart',
        role: 'Coordinadora de Proyectos en ATGen',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Ana-Lockhart-ATGen.webp',
      },
    },
    story: [
      {
        kicker: '01 · DESAFÍO',
        title: 'De 5 tests diarios a 60.000.',
        text: 'El principal desafío fue atender la creciente demanda de servicios, tanto en la operación como en la comunicación con sus clientes. En plena crisis sanitaria por COVID-19, la empresa pasó de realizar entre 4 y 5 tests diarios a un pico de 60.000 pruebas en un día.',
      },
      {
        kicker: '02 · OBJETIVO',
        title: 'Del B2B al cliente final, de un día para otro.',
        text: 'Antes de la pandemia, ATGen se centraba en la investigación, la innovación y los servicios B2B. Necesitaba adaptarse rápidamente para hacer crecer sus actividades B2C y atender directamente a miles de personas.',
      },
      {
        kicker: '03 · SOLUCIÓN',
        title: 'Un chatbot en WhatsApp y un equipo pequeño.',
        text: 'La automatización con SimpleBots sobre la API de WhatsApp Business les permitió hacer frente a las fluctuaciones inesperadas de la demanda, con un equipo de solo 4 agentes que atienden desde SimpleAgents cuando el usuario pide hablar con una persona.',
      },
    ],
    flowTitle: 'El resultado del test, directo en WhatsApp.',
    flowLabel: 'ASISTENTE VIRTUAL · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/atgen-1.webp',
      alt: 'Conversación con el asistente virtual de ATGen en WhatsApp: instrucciones para obtener el resultado del test de COVID-19',
    },
    flow: [
      {
        t: 'El usuario escribe',
        d: 'Inicia la conversación en la cuenta oficial de WhatsApp de ATGen.',
        dot: '#28c76f',
      },
      {
        t: 'Ingresa su documento',
        d: 'El asistente le pide su documento de identidad o pasaporte para identificarlo.',
        dot: '#7367f0',
      },
      {
        t: 'Recibe su resultado',
        d: 'Obtiene el resultado de su test de COVID-19, el servicio de mayor demanda, sin esperar en línea.',
        dot: '#DCD291',
      },
      {
        t: 'Novedades y descuentos',
        d: 'El bot informa los últimos requisitos de los tests y ofrece descuentos en servicios de diagnóstico.',
        dot: '#00cfe8',
      },
    ],
    achievements: {
      title: 'Resultados',
      items: [
        {
          t: 'Demanda atendida',
          d: 'La atención automatizada acompañó un pico de 60.000 tests en un día sin saturar los canales.',
        },
        {
          t: 'Equipo acotado',
          d: 'El laboratorio pasó de 15 a 180 personas, pero el equipo de atención solo pasó de 2 a 7.',
        },
        {
          t: 'Implementación récord',
          d: 'En tres días se creó la cuenta de la API de WhatsApp y los usuarios ya interactuaban por ese canal.',
        },
        {
          t: 'Foco en el negocio',
          d: 'ATGen pudo seguir enfocando sus recursos en el core del negocio mientras crecía la demanda.',
        },
      ],
    },
    testimonial: {
      quote:
        'Estamos muy contentos con los resultados y asombrados por la velocidad de implementación. En solo tres días terminaron el proyecto, crearon la cuenta de la API de WhatsApp y tuvimos usuarios interactuando a través de ese canal.',
      author: 'Fabricio Sarlos',
      role: 'Director Comercial',
      company: 'ATGen',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Fabian-Sarlos-ATGen.webp',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/summum-medicina-privada/ (ahí el bot figura con su nombre anterior,
  // WittyBots; la telefonía es 3CX).
  summum: {
    lead: 'Summum se adaptó a nuevas realidades y superó obstáculos, convirtiéndose en una empresa referente de adaptación e innovación.',
    facts: [
      { label: 'INDUSTRIA', value: 'Medicina privada' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'TECNOLOGÍA', value: '3CX · WhatsApp' },
    ],
    metrics: [
      { value: '0', label: 'quejas de los socios tras pasar al teletrabajo', highlight: true },
      { value: '3', label: 'sectores a un mensaje de distancia por WhatsApp' },
      { value: '1er', label: 'seguro médico integral del Uruguay' },
    ],
    about: {
      title: 'Sobre Summum',
      paragraphs: [
        'Summum es el primer seguro médico integral del Uruguay y una empresa referente en medicina privada, reconocida por la calidad de sus servicios.',
        'Ofrece cobertura completa de salud premium, a través de una red de prestadores médicos de excelencia profesional.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'Encontraron una fuerte disposición y total apoyo por parte de los técnicos de Simpletech: se evacuaron sus dudas, se hicieron las pruebas necesarias y pudieron probar la solución en producción sin costo, con ayuda del equipo para instalarla y ponerla en funcionamiento.',
    },
    story: [
      {
        kicker: '01 · PRIMER DESAFÍO',
        title: 'Sumarse a la transformación digital.',
        text: 'Incorporar nuevas tecnologías a sus procesos y equipos de trabajo, logrando que la implementación potencie la buena atención que posicionó a la compañía.',
        points: [
          { t: 'Objetivo', d: 'Incorporar nuevos canales de comunicación, además de la telefonía convencional.' },
          {
            t: 'Solución',
            d: 'Integramos la telefonía en la nube de 3CX con SimpleBots. El resultado fue la actualización tecnológica que buscaban, con una rápida adaptación de los usuarios y un rápido aprendizaje de los técnicos.',
          },
        ],
        quote: {
          text: 'Nos facilitó enormemente el despliegue de puestos remotos de forma inmediata, de forma autónoma, sin ayuda de Simpletech. Además, hemos podido mantener la calidad de servicio de telefonía luego del cambio.',
          author: 'Dolores Martínez',
          role: 'Gerente de Administración y Sistemas',
          photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Dolores-Martinez-Summum.webp',
        },
      },
      {
        kicker: '02 · SEGUNDO DESAFÍO',
        title: 'Atender a distancia en plena pandemia.',
        text: 'La pandemia de COVID-19 y la cuarentena inmediata obligaron a incorporar el trabajo remoto, con el desafío de mantener la calidad y disponibilidad del servicio.',
        points: [
          {
            t: 'Objetivo',
            d: 'Brindar atención al cliente de forma remota durante la crisis sanitaria, a través de nuevos canales.',
          },
          {
            t: 'Solución',
            d: 'Fue un obstáculo fácil de superar gracias a las características de la solución y a la capacitación previa. El teletrabajo de los funcionarios, muchos de ellos agentes de call center, y la ausencia de quejas de quienes se comunican con la empresa demuestran el éxito de la estrategia, que los preparó para un contexto que desestabilizó a muchas otras empresas.',
          },
        ],
      },
    ],
    flowTitle: 'Cada socio, al sector que necesita.',
    flowLabel: 'WHATSAPP · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/aplicaion-screen-1.webp',
      alt: 'Conversación con Summum en WhatsApp: menú de sectores y atención de una agente para afiliaciones',
    },
    flow: [
      { t: 'El socio escribe', d: 'Inicia la conversación en la cuenta de WhatsApp de Summum.', dot: '#28c76f' },
      {
        t: 'Elige el sector',
        d: 'El bot ofrece Coordinación Médica, Atención al Socio o FarmaSUMMUM.',
        dot: '#7367f0',
      },
      {
        t: 'Lo atiende una persona',
        d: 'Una coordinadora o agente toma la conversación, esté en la oficina o trabajando desde su casa.',
        dot: '#DCD291',
      },
      {
        t: 'Afiliación desde el chat',
        d: 'Quien quiere asociarse puede comenzar su afiliación de forma cómoda y ágil.',
        dot: '#00cfe8',
      },
    ],
    testimonial: {
      quote:
        'Son una empresa seria, comprometida con sus clientes, con muy buen nivel técnico y gran conocimiento del producto. Además, pueden brindar soluciones adicionales a la medida de los usuarios, integradas con el producto base.',
      author: 'Dolores Martínez',
      role: 'Gerente de Administración y Sistemas',
      company: 'Summum',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Dolores-Martinez-Summum.webp',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/verde/ (ahí el producto figura con su nombre anterior, WittySend).
  verde: {
    lead: 'Verde incrementó un 410% las conversaciones por WhatsApp, lo convirtió en su canal de mayor conversión y menor costo, y alcanzó un 95% de satisfacción entre sus clientes.',
    facts: [
      { label: 'INDUSTRIA', value: 'Ahorro y crédito' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'PRODUCTO', value: 'SimpleSend' },
    ],
    metrics: [
      { value: '+410%', label: 'conversaciones por WhatsApp', highlight: true },
      { value: '43%', label: 'de formularios completados con las campañas de reactivación' },
      { value: '95%', label: 'de evaluación positiva entre quienes pidieron crédito por WhatsApp' },
    ],
    about: {
      title: 'Sobre Verde',
      paragraphs: [
        'Verde es la mayor cooperativa de ahorro y crédito de Uruguay, fundada en 1972.',
        'Su alcance abarca personas y microempresas en todo el país.',
      ],
    },
    story: [
      {
        kicker: '01 · PRIMER DESAFÍO',
        title: 'Recuperar las solicitudes abandonadas.',
        text: 'Muchas personas inician una solicitud de crédito, ingresan sus datos y, por diversos motivos, abandonan el proceso: oportunidades de venta perdidas. Para recuperarlas, Verde necesitaba conversaciones personalizadas que reactivaran su interés.',
        points: [
          {
            t: 'Solución',
            d: 'Con SimpleSend implementaron campañas salientes por WhatsApp para retomar las solicitudes perdidas, agilizar el proceso y liberar tiempo de los colaboradores para tareas de mayor valor.',
          },
          {
            t: 'Resultados',
            d: 'Las conversaciones por WhatsApp crecieron un 410% y el canal se consolidó como el más efectivo en conversiones y de menor costo. Las campañas de reactivación lograron un 43% de formularios completados.',
          },
        ],
        quote: {
          text: 'El retorno de inversión de esos mensajes resultó en muy buenos números. Creíamos que le estábamos pidiendo mucho al usuario, pero nos demostró que está dispuesto a recibir un mensaje por WhatsApp y seguir el recorrido que le indicamos por los canales digitales hasta terminar la conversión.',
          author: 'Franca Fraschini',
          role: 'Responsable de Marketing Digital',
        },
      },
      {
        kicker: '02 · SEGUNDO DESAFÍO',
        title: 'Datos actualizados sin llamar uno por uno.',
        text: 'Actualizar la base de clientes ante cambios de dirección o datos incorrectos para el envío de tarjetas de crédito demandaba mucho tiempo y numerosas llamadas manuales a cada cliente.',
        points: [
          {
            t: 'Solución',
            d: 'Campañas dirigidas a las bases con direcciones incorrectas para solicitar la actualización de forma masiva y automática. El proceso se volvió mucho más ágil y se alivianó la carga de trabajo del equipo.',
          },
        ],
        quote: {
          text: 'Se trata de una herramienta fácil de usar que permite muchas opciones para su aplicación, y al enfocarse en la comunicación por WhatsApp nos acerca a nuestro público de la forma en que está más familiarizado. También hemos corroborado que el público prefiere esta vía de comunicación y no la considera spam.',
          author: 'Franca Fraschini',
          role: 'Responsable de Marketing Digital',
        },
      },
    ],
    achievements: {
      title: 'Lo que SimpleSend les permitió',
      items: [
        { t: 'Reactivar contactos', d: 'Retomar las solicitudes que quedaron a mitad de camino.' },
        { t: 'Ventas cruzadas', d: 'Ofrecer otros productos a los socios por WhatsApp.' },
        { t: 'Descargas de la app', d: 'Impulsar el uso de los canales digitales de Verde.' },
        { t: 'Datos al día', d: 'Actualizar datos personales de forma masiva y automática.' },
      ],
    },
    conclusion: [
      'Un estudio de satisfacción realizado por Opción Consultores para Verde a fines de 2022 revela que el 70% de los encuestados identifica a WhatsApp como un medio para solicitar crédito.',
      'De ellos, el 75% ya lo utilizó y, entre quienes lo hicieron, el 95% expresó una evaluación positiva.',
    ],
  },

  // Fuente: https://www.simpletech.uy/portfolio/cooperativa-acac/ (ahí el bot figura con su nombre anterior, WittyBots).
  acac: {
    lead: 'Cooperativa ACAC optimizó su gestión de consultas a través de WhatsApp Business, con respuestas rápidas y automatizadas que mejoran la experiencia de sus clientes.',
    facts: [
      { label: 'INDUSTRIA', value: 'Ahorro y crédito' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '1', label: 'cuenta oficial de WhatsApp en lugar de los celulares de cada ejecutivo', highlight: true },
      { value: '3', label: 'pasos para pedir un crédito desde el chat' },
      { value: '5', label: 'gestiones disponibles en la Sucursal Digital de WhatsApp' },
    ],
    about: {
      title: 'Sobre ACAC',
      paragraphs: [
        'ACAC es una cooperativa de ahorro y crédito por capitalización que se rige por la legislación vigente.',
        'Se guía por la filosofía, los principios y los valores de solidaridad, ayuda mutua y mejora continua.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'Encontraron en Simpletech un socio estratégico para profundizar su transformación digital y mejorar procesos poco eficientes y tediosos. Un equipo altamente calificado, la experiencia en el sector, la agilidad y el compromiso con soluciones a medida fueron claves para elegirlos.',
      quote: {
        text: 'Nosotros debatíamos sobre una app, y unos jóvenes uruguayos con mucho entusiasmo nos convencieron con esta opción alternativa e innovadora. ¡Desde entonces no han dejado de sorprendernos!',
        author: 'Karina Miraldo',
        role: 'Supervisora Comercial',
      },
    },
    story: [
      {
        kicker: '01 · DESAFÍO',
        title: 'Un WhatsApp por ejecutivo.',
        text: 'La gestión de consultas por WhatsApp era muy poco eficiente: cada ejecutivo comercial la manejaba desde su cuenta personal, y los supervisores no podían medir ni monitorear la atención ni el surgimiento de prospectos y clientes.',
      },
      {
        kicker: '02 · OBJETIVOS',
        title: 'Control, derivación y mejor experiencia.',
        text: 'ACAC buscaba ordenar el canal sin perder la cercanía con sus clientes en todo el país.',
        points: [
          { t: 'Unificar', d: 'Reunir los contactos para tener un mejor control del canal.' },
          {
            t: 'Derivar',
            d: 'Asignar cada conversación al ejecutivo de ventas indicado según la ubicación de cada persona.',
          },
          { t: 'Responder', d: 'Dar respuestas rápidas y automatizadas a clientes y prospectos con un chatbot.' },
        ],
      },
      {
        kicker: '03 · SOLUCIÓN',
        title: 'La Sucursal Digital en WhatsApp.',
        text: 'Hoy las consultas llegan ordenadas a la cuenta oficial de ACAC gracias a SimpleBots, que permite crear flujos para consultas frecuentes y reclamos sin código. Por el mismo canal se hacen las solicitudes de producto, un proceso que antes era manual, alargaba las ventas y afectaba la conversión.',
        quote: {
          text: 'Para ACAC, hoy todo termina en WhatsApp, y esta solución mejora la experiencia de nuestros clientes en este canal. Antes nos resultaba imposible medir la performance de tantos ejecutivos repartidos en todo el Uruguay. Gracias a Simpletech y al chatbot que desarrollamos juntos pudimos romper barreras de tiempo y ubicación geográfica, y dar un paso adelante que nos abrió las puertas a la transformación digital.',
          author: 'Karina Miraldo',
          role: 'Supervisora Comercial',
        },
      },
    ],
    flowTitle: 'Una sucursal abierta en el chat.',
    flowLabel: 'SUCURSAL DIGITAL · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2023/11/celulares_ACAC.webp',
      alt: 'Conversaciones con la Sucursal Digital de ACAC en WhatsApp: menú de opciones y agencias',
    },
    flow: [
      {
        t: 'El cliente escribe',
        d: 'Inicia la conversación con la Sucursal Digital en la cuenta oficial de ACAC.',
        dot: '#28c76f',
      },
      {
        t: 'Elige una opción',
        d: 'Pedir un crédito, enviar documentación, ver agencias y horarios, beneficios o sorteos.',
        dot: '#7367f0',
      },
      { t: 'Pide su crédito', d: 'Completa la solicitud en solo 3 pasos, sin salir de WhatsApp.', dot: '#DCD291' },
      {
        t: 'Llega al ejecutivo indicado',
        d: 'La conversación se deriva al ejecutivo de ventas que corresponde según su ubicación.',
        dot: '#00cfe8',
      },
    ],
    testimonial: {
      quote:
        'Mi experiencia con Simpletech y su equipo es realmente excelente. Trabajamos juntos desde hace años. Nos sorprende el potencial de la herramienta y es un placer contar con la celeridad y eficiencia con que trabajan para brindarnos soluciones, ya estén o no desarrolladas.',
      author: 'Karina Miraldo',
      role: 'Supervisora Comercial',
      company: 'ACAC',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/microfin/ (ahí los productos figuran con sus nombres anteriores:
  // WittySuite, WittySend y WittyAgent).
  microfin: {
    lead: 'Microfin centralizó la atención y las ventas de múltiples números de teléfono en un único número de WhatsApp, con respuestas más rápidas y una atención personalizada.',
    facts: [
      { label: 'INDUSTRIA', value: 'Administración de créditos' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '1', label: 'número de WhatsApp en lugar de los números de cada asesor', highlight: true },
      { value: '3', label: 'áreas con su propia bandeja: atención, ventas y cobranzas' },
      { value: '4', label: 'desafíos resueltos en una misma plataforma' },
    ],
    about: {
      title: 'Sobre Microfin',
      paragraphs: [
        'Microfin es una empresa administradora de créditos regulada por el Banco Central del Uruguay.',
        'Ofrece préstamos en efectivo y una tarjeta de crédito para que sus clientes puedan alcanzar todas sus metas.',
      ],
    },
    why: {
      title: 'Cómo es trabajar con Simpletech',
      text: 'Stefanie Almada, Team Leader de Atención al Cliente y Ventas, destaca la rapidez de las respuestas y de la implementación, y el seguimiento constante del equipo para ver cómo funciona cada solución.',
      quote: {
        text: 'Nuestra experiencia con Simpletech ha sido excelente. Contestan super rápido, se implementa rápido, y también destaco que siempre están muy a la orden para ver cómo va todo y cómo está funcionando, cómo responde; y para mí eso es super valioso.',
        author: 'Stefanie Almada',
        role: 'Team Leader de Atención al Cliente y Ventas',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Stefanie-Almada-Microfin.webp',
      },
    },
    storyLayout: 'rows',
    story: [
      {
        kicker: '01 · PRIMER DESAFÍO',
        title: 'Un WhatsApp por vendedor.',
        text: 'Microfin tenía asesores y vendedores en todo el país, cada uno con su propio número de WhatsApp. Era difícil que los clientes entendieran que esos números eran solo para ventas, e imposible controlar qué información se daba ante consultas o reclamos, lo que comprometía la calidad del soporte.',
      },
      {
        kicker: '02 · SEGUNDO DESAFÍO',
        title: 'Consultas repartidas en muchos números.',
        text: 'Los asesores de atención también tenían números distintos y los clientes los agendaban todos: consultaban a varios a la vez, lo que dificultaba el seguimiento y reunir la información en un solo lugar.',
        points: [
          {
            t: 'Objetivos',
            d: 'Separar la venta de la atención al cliente, centralizar la atención en un único número y ordenar la información.',
          },
          {
            t: 'Solución',
            d: 'Con SimpleSuite, la atención y las ventas se centralizaron en un único número de WhatsApp: los agentes especializados reciben las consultas y responden con información ordenada, y la atención quedó separada de las ventas.',
          },
        ],
      },
      {
        kicker: '03 · TERCER DESAFÍO',
        title: 'Más leads de los que se podían atender.',
        text: 'En un momento, la cantidad de leads que llegaban de un proveedor los sobrepasó: no llegaban a filtrarlos ni a responder en tiempo real a quienes consultaban.',
        points: [
          { t: 'Objetivo', d: 'Ordenar y clasificar los leads para gestionarlos correctamente.' },
          {
            t: 'Solución',
            d: 'Bandejas separadas en SimpleSuite, con una asignada a ese proveedor: los leads llegan filtrados con las condiciones mínimas para avanzar en la venta, más calificados que los que antes llegaban desordenados.',
          },
        ],
      },
      {
        kicker: '04 · CUARTO DESAFÍO',
        title: 'Cobranzas por WhatsApp.',
        text: 'El área de cobranzas necesitaba comunicarse con los clientes que cumplían ciertas condiciones de deuda, de forma masiva o individual.',
        points: [
          {
            t: 'Solución',
            d: 'Con SimpleSend se envían mensajes preaprobados (HSM) para los casos de deuda, y las respuestas llegan a una bandeja de SimpleAgents gestionada por cobranzas. Además, si al entrar al bot el sistema detecta cierta cantidad de días de atraso, deriva a la persona directamente a esa bandeja.',
          },
        ],
      },
    ],
    flowTitle: 'Un solo número que sabe a quién derivar.',
    flowLabel: 'WHATSAPP · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2023/07/celulares.webp',
      alt: 'Conversaciones con el bot de Microfin en WhatsApp: consulta de clientes y solicitud de un nuevo crédito',
    },
    flow: [
      {
        t: 'El cliente escribe',
        d: 'Todos los contactos llegan al único número de WhatsApp de Microfin.',
        dot: '#28c76f',
      },
      { t: '¿Ya es cliente?', d: 'El bot lo pregunta para separar la atención de las ventas.', dot: '#7367f0' },
      {
        t: 'Consulta o solicitud',
        d: 'Consulta por su tarjeta o préstamo, o pide un nuevo crédito ingresando su cédula.',
        dot: '#DCD291',
      },
      {
        t: 'Pasa el primer filtro',
        d: 'La solicitud llega calificada a la bandeja indicada y un asesor la toma en minutos.',
        dot: '#00cfe8',
      },
    ],
    testimonial: {
      quote:
        'Se trabaja muy cómodo con Simpletech. Por sobre todas las cosas, con un alto profesionalismo y conocimiento de la causa. Hacen mucho más fácil el trabajo. Tal es así que seguimos buscando nuevas formas de potenciar juntos nuestro crecimiento.',
      author: 'Stefanie Almada',
      role: 'Team Leader de Atención al Cliente y Ventas',
      company: 'Microfin',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Stefanie-Almada-Microfin.webp',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/agesic/ (ahí la plataforma figura con su nombre anterior, WittySuite).
  agesic: {
    lead: 'Más de 50.000 partidas digitales entregadas por WhatsApp de forma automatizada, para acercar el Gobierno Digital a la ciudadanía.',
    facts: [
      { label: 'SECTOR', value: 'Gobierno digital' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      {
        value: '50K+',
        label: 'partidas de nacimiento, reconocimiento, matrimonio y defunción entregadas',
        highlight: true,
      },
      { value: '3.200', label: 'partidas encontradas por mes' },
      { value: '91%', label: 'de los ciudadanos evalúa el servicio como excelente o muy bueno' },
    ],
    about: {
      title: 'Sobre AGESIC',
      paragraphs: [
        'La Agencia de Gobierno Electrónico y Sociedad de la Información y del Conocimiento (AGESIC) lidera la estrategia de Gobierno Digital del país e impulsa la inclusión digital de la ciudadanía y el fortalecimiento de sus habilidades tecnológicas.',
        'Para consolidar la estrategia multicanal de los Servicios a la Ciudadanía, con una transformación digital inclusiva y sustentable, apoyó al Ministerio de Educación y Cultura para que las personas puedan obtener digitalmente algunos de los documentos que más se les piden.',
      ],
    },
    story: [
      {
        kicker: '01 · DESAFÍO',
        title: 'Acercar el Gobierno Digital a la ciudadanía.',
        text: 'Se necesitaba una solución para que cualquier persona pudiera consultar de manera ágil algunos de los documentos más solicitados en las gestiones con el Estado: partidas de nacimiento, matrimonio, defunción y reconocimiento.',
      },
      {
        kicker: '02 · SOLUCIÓN',
        title: 'Un bot de partidas en WhatsApp.',
        text: 'Habilitamos WhatsApp como canal e integramos SimpleSuite al sistema de gestión para automatizar la obtención de las partidas digitales que emite la Dirección General del Registro de Estado Civil. Así nació el Servicio de solicitud de partidas digitales del Registro Civil: cualquier ciudadano las pide por WhatsApp de forma 100% autónoma, en cualquier momento del año.',
      },
      {
        kicker: '03 · SIEMPRE UNA RESPUESTA',
        title: 'También cuando la partida no es digital.',
        text: 'Si la partida solicitada no está disponible en formato digital, el bot ayuda a pedir la partida tradicional en papel, por la web o de forma presencial.',
      },
    ],
    flowTitle: 'La partida, en una breve conversación.',
    flowLabel: 'SERVICIOS GUB.UY · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2025/01/Imagen-agesic-celular_agesic_1920x747.png',
      alt: 'Conversación con el servicio de partidas digitales del Registro Civil en WhatsApp',
    },
    flow: [
      {
        t: 'El ciudadano escribe',
        d: 'Inicia la conversación por WhatsApp, todos los días y a toda hora.',
        dot: '#28c76f',
      },
      {
        t: 'Elige la partida',
        d: 'Nacimiento, matrimonio, defunción o reconocimiento.',
        dot: '#7367f0',
      },
      {
        t: 'Ingresa los datos del titular',
        d: 'Los últimos dígitos de la cédula, el primer apellido y la fecha del registro.',
        dot: '#DCD291',
      },
      {
        t: 'Recibe su partida',
        d: 'Obtiene el link a la partida digital o la ayuda para pedirla en papel.',
        dot: '#00cfe8',
      },
    ],
    closingTitle: '¿Qué es lo que más valoran de la solución?',
    testimonial: {
      quote:
        'Nos permitió poner a disposición del público general y en un medio omnipresente una herramienta que proporciona, luego de un breve diálogo, el documento que precisa, o información útil de cómo obtenerlo.',
      author: 'Leonardo Latorre',
      role: 'Gerente Área Gobierno Digital',
      company: 'Ministerio de Educación y Cultura',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2025/01/Leonardo-Latorre.jpg',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/san-cristobal-seguros/
  'san-cristobal': {
    lead: 'San Cristóbal Seguros automatizó el complejo proceso de denuncia de siniestros de auto con un chatbot. Hoy 9 de cada 10 clientes evalúan muy positivamente una experiencia que suele ser engorrosa y frustrante.',
    facts: [
      { label: 'INDUSTRIA', value: 'Seguros' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '9/10', label: 'clientes evalúan muy positivamente su experiencia con el chatbot', highlight: true },
      { value: '-50%', label: 'de costo frente a las denuncias de siniestros tradicionales' },
      { value: '8 min', label: 'de espera ante un siniestro, frente a los 40 del camino tradicional' },
    ],
    about: {
      title: 'Sobre San Cristóbal',
      paragraphs: [
        'San Cristóbal Seguros es una compañía argentina cuyo crecimiento permanente y eficaz administración de recursos la convirtieron en una empresa líder en la región y experta en el rubro automotor.',
        'Apuesta al crecimiento y se anima a salir de la estructura tradicional de las aseguradoras, rompiendo esquemas a través de la innovación.',
      ],
    },
    why: {
      title: 'Cómo es trabajar con Simpletech',
      text: 'Luis Manjarres, Analista de Marketing e Innovación, destaca la capacidad de respuesta, el compromiso del equipo y el acompañamiento posventa para llegar juntos a la mejor solución.',
      quote: {
        text: 'Me sorprende la capacidad de respuesta que tienen. Tienen un equipo súper comprometido. El servicio posventa es muy bueno... Quiero destacar al 100% la atención. Si se manda un mail están, si se levanta el teléfono están. En todo lo que les pedimos nos acompañan, para poder llegar a la mejor solución final en equipo.',
        author: 'Luis Manjarres',
        role: 'Analista de Marketing e Innovación',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Luis-Manjarres-San-Cristobal_edited.webp',
      },
    },
    story: [
      {
        kicker: '01 · DESAFÍO',
        title: 'Un mal momento, sin esperas extra.',
        text: 'Un estudio de posicionamiento detectó una oportunidad de mejora en la comunicación con clientes y proveedores. Al mapear los puntos de contacto, el área de siniestros fue la que más foco necesitaba: la demora en tomar la denuncia volvía todavía más frustrante un proceso que, por naturaleza, es poco placentero.',
      },
      {
        kicker: '02 · SOLUCIÓN',
        title: 'Un asistente virtual en WhatsApp.',
        text: 'Diseñamos un chatbot integrado al canal oficial de WhatsApp de la compañía, para que los asegurados autogestionen la denuncia, desde el reporte del accidente hasta el informe final de daños, sin esperar el móvil de la compañía. Junto al equipo de San Cristóbal desarrollamos un árbol de conversación intuitivo, ágil y eficiente que funcionó desde el primer día.',
        quote: {
          text: 'El proceso que desarrollamos es muy sencillo para el asegurado. El asistente virtual termina siendo súper útil y permite a la persona retomar su rutina con mayor agilidad... Es súper fácil, intuitivo, rápido y sencillo.',
          author: 'Luis Manjarres',
          role: 'Analista de Marketing e Innovación',
        },
      },
      {
        kicker: '03 · CRECIMIENTO',
        title: 'Un canal que acompañó la expansión.',
        text: 'La sucursal uruguaya llegó a duplicar su cantidad de asegurados, y el asistente virtual acompañó ese crecimiento: hoy la mitad de las denuncias de siniestros se hacen por WhatsApp. Además, da acceso a muchos otros servicios y trámites, acepta audios y permite calificar la experiencia al terminar.',
        quote: {
          text: 'En la actualidad, con las nuevas generaciones y el avance de las nuevas tecnologías, el tiempo es muy importante. Tenemos que brindar al cliente una respuesta rápida. Lo que a través del camino tradicional puede llevar una espera de 40 minutos, hoy se autogestiona en 8-10 minutos gracias al asistente virtual.',
          author: 'Luis Manjarres',
          role: 'Analista de Marketing e Innovación',
        },
      },
    ],
    flowTitle: 'La denuncia, de principio a fin en el chat.',
    flowLabel: 'ASISTENTE VIRTUAL · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/Screen-Shot-2022-07-11-at-16.37.12.webp',
      alt: 'Conversaciones con Wasan, el asistente virtual de San Cristóbal Seguros en WhatsApp',
    },
    flow: [
      {
        t: 'El asegurado escribe',
        d: 'Lo recibe Wasan, el asistente virtual de San Cristóbal en WhatsApp.',
        dot: '#28c76f',
      },
      {
        t: 'Elige "Denunciar un siniestro"',
        d: 'O cualquier otro trámite: proveedores, corredores, clientes o hablar con un ejecutivo.',
        dot: '#7367f0',
      },
      {
        t: 'Reporta el siniestro',
        d: 'Del accidente al informe final de daños, por sus propios medios y hasta con audios.',
        dot: '#DCD291',
      },
      { t: 'Califica la experiencia', d: 'Al terminar, puntúa el servicio del 1 al 5.', dot: '#00cfe8' },
    ],
    achievements: {
      title: 'KPIs',
      chart: {
        kicker: 'TIEMPO DE ESPERA ANTE UN SINIESTRO',
        headline: '5 veces más rápido.',
        unit: 'min',
        ticks: [0, 10, 20, 30, 40],
        bars: [
          { label: 'Camino tradicional', value: 40 },
          { label: 'Asistente virtual en WhatsApp', value: 8, highlight: true },
        ],
        source: 'Fuente: San Cristóbal Seguros.',
      },
      items: [
        { t: '-50% de costo', d: 'frente a las denuncias de siniestros tradicionales.' },
        { t: '9 de cada 10', d: 'clientes evalúan muy positivamente su experiencia con el chatbot.' },
        { t: '50% por WhatsApp', d: 'de los usuarios denuncian sus siniestros por este canal.' },
        { t: 'De 40 a 8 minutos', d: 'de espera para los clientes ante un siniestro.' },
      ],
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/la-boliviana-ciacruz/ (ahí los productos figuran con sus nombres
  // anteriores: WittySuite, WittyBots y WittyAgent; la telefonía es 3CX).
  'la-boliviana-ciacruz': {
    lead: 'La Boliviana Ciacruz automatizó procesos complejos e incorporó a su estrategia de comunicación la omnicanalidad que buscaba.',
    facts: [
      { label: 'INDUSTRIA', value: 'Seguros' },
      { label: 'PAÍS', value: 'Bolivia' },
      { label: 'TECNOLOGÍA', value: 'WhatsApp · 3CX' },
    ],
    metrics: [
      { value: '26.760', label: 'interacciones con el chatbot de WhatsApp en menos de un año', highlight: true },
      { value: '+75', label: 'años de trabajo ininterrumpido liderando el mercado asegurador boliviano' },
      { value: '1', label: 'central 3CX para las comunicaciones de toda Bolivia' },
    ],
    about: {
      title: 'Sobre La Boliviana Ciacruz',
      paragraphs: [
        'Gran parte de la historia de los seguros en Bolivia se escribió a través de esta empresa. Desde su fundación, La Boliviana Ciacruz Seguros (LBC) puso los cimientos del sistema asegurador boliviano.',
        'Es la única empresa boliviana con más de 75 años de trabajo ininterrumpido liderando el mercado, y trabaja cada día para construir un sistema boliviano seguro, eficiente e innovador.',
      ],
    },
    why: {
      title: 'Por qué eligieron Simpletech',
      text: 'La experiencia y el conocimiento del equipo de Simpletech sobre las soluciones fueron la razón para elegirnos. También destacan la calidad de la atención del equipo de Soporte e Innovación cada vez que piden ayuda o sugieren mejoras.',
      quote: {
        text: 'Uno de los diferenciales, que fue fundamental para elegir trabajar con Simpletech, fue las posibilidades de integración que la herramienta ofrecía. También las amplias posibilidades en cuanto a informes a realizar. Me dan mucha libertad y me permiten trabajar con diferentes departamentos de la empresa para realizar mejoras y optimizar procesos de forma continua.',
        author: 'Orquídea Gérard',
        role: 'Analista en Marketing Digital en LBC',
        photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Orquidea-Gerard-La-Boliviana-Ciacruz.webp',
      },
    },
    storyLayout: 'rows',
    story: [
      {
        kicker: '01 · PRIMER DESAFÍO',
        title: 'Más canales que el call center.',
        text: 'Su único canal de atención era un call center, normalmente saturado. LBC buscaba sumar la omnicanalidad a su atención. Hoy, gracias a la automatización, la denuncia de siniestros y la autoinspección para nuevos clientes, que antes eran trámites burocráticos y tediosos, se resuelven con agilidad por WhatsApp.',
        points: [
          {
            t: 'Objetivo',
            d: 'Facilitar la conexión de los asegurados por distintos canales y hacer más eficiente la comunicación y la atención de la compañía.',
          },
          {
            t: 'Solución',
            d: 'Sumamos SimpleBots y SimpleAgents a su estrategia de comunicación. La implementación fue muy ágil: desde el primer día trabajamos de la mano con su equipo, del diseño de los flujos conversacionales a la elección de los servicios a automatizar.',
          },
        ],
        quote: {
          text: 'La implementación ha fluido bien desde el principio. Siempre hemos notado que desde Simpletech tienen la mejor predisposición del mundo para ayudar... En todo momento han estado pendientes para poder sacar el máximo provecho a los indicadores y funcionalidades de la herramienta.',
          author: 'Orquídea Gérard',
          role: 'Analista en Marketing Digital en LBC',
        },
      },
      {
        kicker: '02 · SEGUNDO DESAFÍO',
        title: 'Telefonía para trabajar desde casa.',
        text: 'Con la pandemia, la fuerza de ventas se quedó sin acceso a su telefonía, y reponer crédito en los celulares era un costo extra. Necesitaban un softphone para usar la telefonía local desde cualquier lugar.',
        points: [
          {
            t: 'Objetivo',
            d: 'Restablecer la telefonía de los colaboradores que trabajaban desde sus casas y ahorrar costos y tiempo en las comunicaciones de todo el país.',
          },
          {
            t: 'Solución',
            d: 'Pusimos en marcha el sistema de comunicaciones unificadas de 3CX. Nino Bustillos, Subgerente de Servicios de Tecnología, evaluó también Microsoft Teams, pero eligió 3CX por costos y especificaciones técnicas.',
          },
        ],
        quote: {
          text: 'Elegimos 3CX y la verdad es que no ha defraudado, es más, ha superado nuestras expectativas.',
          author: 'Nino Bustillos',
          role: 'Subgerente de Servicios de Tecnología en LBC',
        },
      },
      {
        kicker: '03 · TERCER DESAFÍO',
        title: 'Autonomía frente al proveedor.',
        text: 'Con su central Avaya necesitaban soporte externo para cualquier cambio o agregado, con horas de servicio extra a pagar cada mes, y la movilidad era limitada.',
        points: [
          {
            t: 'Objetivo',
            d: 'Reemplazar la central Avaya para tener libertad al configurar líneas y ajustes, optimizando costos y tiempo.',
          },
          {
            t: 'Solución',
            d: 'Hoy 3CX es la central de toda Bolivia: las llamadas salientes desde celulares (con apps para Android e iOS), locales y de larga distancia, y las entrantes que se derivan a cada sucursal. La migración del PBX fue gradual, con capacitación y acompañamiento, para minimizar el impacto en los usuarios.',
          },
        ],
        quote: {
          text: 'Definitivamente ya no tenemos una dependencia del proveedor. Antes necesitábamos asistencia de soporte para configurar cualquier cosa... Eso implicaba horas extra a abonar cada mes. 3CX es tan sencilla, que nosotros mismos podemos gestionarlo en cuestión de minutos. Valoramos mucho tener total autonomía.',
          author: 'Nino Bustillos',
          role: 'Subgerente de Servicios de Tecnología en LBC',
        },
      },
    ],
    flowTitle: 'La autoinspección del vehículo, por WhatsApp.',
    flowLabel: 'AUTOINSPECCIÓN · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/lbc-hsm-whatspapp.webp',
      alt: 'Conversaciones de autoinspección vehicular con LBC Seguros en WhatsApp: guía, carnet, fotos del vehículo y evaluación',
    },
    flow: [
      {
        t: 'Mira la guía',
        d: 'Recibe un video que explica cómo hacer la autoinspección desde el celular.',
        dot: '#28c76f',
      },
      { t: 'Se identifica', d: 'Ingresa su carnet de identidad para iniciar el trámite.', dot: '#7367f0' },
      {
        t: 'Envía las fotos',
        d: 'Saca las fotos del vehículo etapa por etapa: exteriores y, si los hay, daños.',
        dot: '#DCD291',
      },
      { t: 'Evalúa el proceso', d: 'Al terminar, califica la experiencia del 1 al 5.', dot: '#00cfe8' },
    ],
    achievements: {
      title: 'Resultados',
      items: [
        { t: '26.760 interacciones', d: 'con el chatbot de WhatsApp en menos de un año.' },
        {
          t: 'Cobranzas automatizadas',
          d: 'El equipo de cobranzas se redujo y las automatizaciones cubrieron esas bajas, con un ahorro significativo.',
        },
        { t: 'Trámites ágiles', d: 'Denuncia de siniestros y autoinspección resueltas por WhatsApp.' },
        { t: 'Autonomía total', d: 'Gestionan su telefonía en minutos, sin horas de soporte a pagar.' },
      ],
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/universidad-de-montevideo-mides-uruguay/ (ahí los productos figuran con
  // sus nombres anteriores: WittySuite, WittyBots y WittySend).
  'um-mides': {
    lead: 'El Ministerio de Desarrollo Social y la Universidad de Montevideo escalan una investigación con asistencia automatizada y prevén impactar en más de 950 familias de contexto vulnerable.',
    facts: [
      { label: 'SECTOR', value: 'Gobierno e investigación' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '+950', label: 'familias de contexto vulnerable a las que se prevé llegar', highlight: true },
      { value: '3', label: 'mensajes por semana, según el protocolo de los investigadores' },
      { value: '4', label: 'meses de acompañamiento remoto por WhatsApp' },
    ],
    about: {
      title: 'Sobre el proyecto',
      paragraphs: [
        'La Universidad de Montevideo investiga el efecto del programa Uruguay Crece Contigo, del Ministerio de Desarrollo Social (MIDES), en las familias que acompaña.',
        'Un chatbot y campañas por WhatsApp forman parte de la investigación para facilitar el acompañamiento de las familias de manera remota.',
      ],
    },
    story: [
      {
        kicker: '01 · DESAFÍO',
        title: 'Más familias de las que se podían acompañar.',
        text: 'En los últimos años aumentaron las derivaciones y postulaciones de familias al Programa de Acompañamiento Familiar del MIDES. Con ese crecimiento, acompañar a cada una con atención humana personalizada se volvió difícil.',
      },
      {
        kicker: '02 · CHATBOT',
        title: 'Respuestas en el canal que todos usan.',
        text: 'Desarrollamos un chatbot con SimpleBots en WhatsApp, un canal de alta penetración en la población del programa, para conversar con las familias y atender sus consultas.',
        quote: {
          text: 'El chatbot nos sirve para automatizar respuestas a los usuarios. Valoramos que sea una solución flexible y que se pueda adaptar fácilmente a las demandas que puedan ir surgiendo.',
          author: 'Juanita Bloomfield',
          role: 'Docente investigadora en Universidad de Montevideo',
          photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Juanita-Bloomfield-MIDES.webp',
        },
      },
      {
        kicker: '03 · CAMPAÑAS',
        title: 'Mensajes periódicos, diseñados por los investigadores.',
        text: 'En paralelo, SimpleSend ejecuta el envío periódico y secuencial de mensajes que diseñaron los investigadores: un protocolo de tres mensajes semanales durante cuatro meses.',
        quote: {
          text: 'Poder automatizar los envíos es clave. La posibilidad de ver y exportar estadísticas de las interacciones con las familias va a agilizar la investigación.',
          author: 'Juanita Bloomfield',
          role: 'Docente investigadora en Universidad de Montevideo',
        },
      },
    ],
    flowTitle: 'Uruguay Crece Contigo, en WhatsApp.',
    flowLabel: 'CHATBOT · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/chatbot-mides-um-uruguay-.webp',
      alt: 'Mensaje de bienvenida del chatbot de Uruguay Crece Contigo - MIDES en WhatsApp',
    },
    flow: [
      {
        t: 'La familia escribe',
        d: 'Inicia la conversación con Uruguay Crece Contigo - MIDES en WhatsApp.',
        dot: '#28c76f',
      },
      {
        t: 'Elige una opción',
        d: 'Teléfonos útiles, transferencias, primera infancia, trámite de cédula, consultorios jurídicos y más.',
        dot: '#7367f0',
      },
      { t: 'Recibe la información', d: 'El bot le acerca los datos y los links de cada servicio.', dot: '#DCD291' },
      {
        t: 'Acompañamiento continuo',
        d: 'Recibe los mensajes del programa: tres por semana durante cuatro meses.',
        dot: '#00cfe8',
      },
    ],
  },

  // Fuente: https://www.simpletech.uy/portfolio/marketeres-latam/ (ahí los productos figuran con sus nombres anteriores:
  // WittySuite, WittyBots y WittyAgent).
  'marketers-latam': {
    lead: 'Automatizamos la atención al cliente y la inscripción a los talleres del mayor congreso de marketing y management de Latam, que alcanzó un 100% de convocatoria.',
    facts: [
      { label: 'SECTOR', value: 'Eventos y capacitación' },
      { label: 'EDICIÓN', value: '2022' },
      { label: 'CANAL', value: 'WhatsApp' },
    ],
    metrics: [
      { value: '100%', label: 'de convocatoria en los talleres', highlight: true },
      { value: '+900', label: 'profesionales inscriptos en la primera edición post-pandemia' },
      { value: '5/5', label: 'la calificación del equipo a la experiencia' },
    ],
    about: {
      title: 'Sobre Marketers Latam',
      paragraphs: [
        'Marketers es un evento de marketing, publicidad, comunicación y management que desde hace 15 años reúne a conferencistas internacionales frente a más de 900 profesionales que buscan capacitarse y actualizarse.',
        'Junto a Simpletech, el equipo rediseñó su atención al cliente con un chatbot en WhatsApp que pone a disposición de los participantes los recursos, las actividades y las preguntas frecuentes del congreso.',
      ],
    },
    story: [
      {
        kicker: '01 · DESAFÍO',
        title: 'La edición más esperada.',
        text: 'Marketers Latam crece año a año, y la edición 2022, la primera después de la pandemia, superó lo esperado con más de 900 profesionales inscriptos. El equipo necesitaba resolver la atención sin afectar la calidad del evento ni sus demás tareas operativas.',
      },
      {
        kicker: '02 · OBJETIVOS',
        title: 'Menos tareas manuales, más evento.',
        text: 'Liberar al equipo para que pudiera enfocarse en el congreso.',
        points: [
          { t: 'Atención', d: 'Automatizar la atención al cliente y liberar recursos.' },
          { t: 'Inscripciones', d: 'Simplificar la inscripción a los talleres.' },
          { t: 'Participación', d: 'Hacer seguimiento de la participación en cada actividad.' },
        ],
      },
      {
        kicker: '03 · SOLUCIÓN',
        title: 'Un bot que responde y una persona cuando hace falta.',
        text: 'Con SimpleBots creamos flujos de conversación para responder al instante las consultas de los participantes. Cuando el bot no podía resolver algo, la conversación pasaba a una persona en SimpleAgents, que gestionaba todas las conversaciones desde una sola pantalla.',
        quote: {
          text: 'Si tuviera que calificar la experiencia le daría un 5 de 5, incluso teniendo en cuenta el poco tiempo que tuvimos para diseñar y desarrollar el chatbot. La plataforma es genial. Me resultó muy intuitiva. De forma rápida le agarramos la mano para gestionar las consultas muy fácilmente. Poder ver todas las conversaciones activas en una sola pantalla era muy práctico.',
          author: 'Julieta Martínez',
          role: 'Departamento de Administración en Marketers Latam',
          photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Julieta-Martinez-Marketers-Latam.webp',
        },
      },
    ],
    flowTitle: 'Todas las respuestas del congreso, en un chat.',
    flowLabel: 'PAZ, EL BOT DE MARKETERS · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/chatbot-marketeres-latam.webp',
      alt: 'Mensaje de bienvenida de PAZ, el bot de Marketers Latam en WhatsApp, con el menú de consultas',
    },
    flow: [
      { t: 'El participante escribe', d: 'Lo recibe PAZ, el bot de Marketers, en WhatsApp.', dot: '#28c76f' },
      {
        t: 'Elige su consulta',
        d: 'Speakers, fecha y lugar, costos, inscripción, formas de pago, certificados y más.',
        dot: '#7367f0',
      },
      { t: 'Respuesta al instante', d: 'El bot resuelve la consulta en el momento, a cualquier hora.', dot: '#DCD291' },
      {
        t: 'Una persona, si hace falta',
        d: 'Lo que el bot no resuelve pasa a una persona del equipo en SimpleAgents.',
        dot: '#00cfe8',
      },
    ],
    testimonial: {
      quote:
        'Nuestra experiencia con Simpletech fue realmente excelente. Desde el inicio entendieron y nos acompañaron en el diseño de la estrategia de la experiencia de los asistentes, fueron extremadamente ágiles y proactivos en la implementación de las soluciones, y la plataforma el día del evento no sólo mejoró la experiencia de nuestros clientes, sino que también resultó sumamente fácil e intuitiva para el equipo que se sumó a trabajar para el Congreso a último momento.',
      author: 'Alejandra Pradere',
      role: 'Directora y co-fundadora',
      company: 'Marketers Latam',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/alejandra-pradere-marketers-latam.webp',
    },
  },

  // Fuente: https://www.simpletech.uy/portfolio/grupo-santa-rosa/ (ahí los productos figuran con sus nombres anteriores:
  // WittySuite, WittyBots y WittySend).
  'grupo-santa-rosa': {
    lead: 'Grupo Santa Rosa aumentó un 25% la tasa de respuesta de sus encuestas de satisfacción, enviándolas por WhatsApp después de cada entrega.',
    facts: [
      { label: 'INDUSTRIA', value: 'Automotriz' },
      { label: 'PAÍS', value: 'Uruguay' },
      { label: 'ÁREA', value: 'Calidad' },
    ],
    metrics: [
      { value: '+25%', label: 'de tasa de respuesta en las encuestas de satisfacción', highlight: true },
      { value: '48 hs', label: 'después de cada entrega llega la encuesta, de venta o de postventa' },
      { value: '4', label: 'preguntas por encuesta, personalizadas con el vehículo y la fecha de entrega' },
    ],
    about: {
      title: 'Sobre Grupo Santa Rosa',
      paragraphs: [
        'Grupo Santa Rosa ofrece soluciones de movilidad con la venta y renta de automóviles, repuestos, accesorios, servicios mecánicos y de postventa.',
        'En Uruguay es representante oficial de Renault, Nissan, IVECO, JMC y Changan, con tres locales en Montevideo y una extensa red de concesionarios en todo el país.',
      ],
    },
    story: [
      {
        kicker: '01 · CONTEXTO',
        title: 'Una empresa comprometida con la calidad.',
        text: 'La satisfacción del cliente es un pilar del grupo. El equipo de Calidad necesitaba conocer la opinión de sus clientes en tiempo real, de forma ágil y eficiente, 48 horas después de cada entrega de venta o de postventa, y de forma personalizada según la compra de cada uno.',
      },
      {
        kicker: '02 · SOLUCIÓN',
        title: 'Encuestas automáticas en WhatsApp.',
        text: 'Santa Rosa ya atendía a clientes y prospectos con un bot de SimpleBots. Esta vez llevamos la herramienta al área de Calidad: un nuevo flujo conversacional y campañas personalizadas y automatizadas con SimpleSend en su cuenta oficial de WhatsApp Business. Valentina Herrera, jefa de Calidad, lideró el proyecto junto al equipo de Simpletech.',
      },
      {
        kicker: '03 · RESULTADO',
        title: 'Más clientes que responden.',
        text: 'Con el nuevo chatbot, el promedio de respuestas creció exponencialmente: la tasa de respuesta de las encuestas aumentó un 25%. Lo que empezó en un área se extendió a distintas verticales y firmas de la compañía.',
        quote: {
          text: 'El servicio fue excelente desde un principio. Se comprometieron con el proyecto y entendieron lo que necesitábamos, trabajando de forma muy personalizada.',
          author: 'Valentina Herrera',
          role: 'Jefa de Calidad en Grupo Santa Rosa',
        },
      },
    ],
    flowTitle: 'La opinión de cada cliente, en tiempo real.',
    flowLabel: 'ENCUESTA DE SATISFACCIÓN · 4 PASOS',
    flowImage: {
      src: 'https://www.simpletech.uy/wp-content/uploads/2022/07/MicrosoftTeams-image.webp',
      alt: 'Encuesta de satisfacción del Bot Santa Rosa en WhatsApp, personalizada con el vehículo y la fecha de entrega',
    },
    flow: [
      {
        t: 'Entrega del vehículo',
        d: 'El cliente recibe su auto, ya sea por una venta o un servicio de postventa.',
        dot: '#28c76f',
      },
      {
        t: 'Llega la encuesta',
        d: 'A las 48 horas recibe por WhatsApp un mensaje con su nombre, su vehículo y la fecha de entrega.',
        dot: '#7367f0',
      },
      { t: 'Responde en el chat', d: 'Contesta 4 preguntas sin salir de WhatsApp.', dot: '#DCD291' },
      {
        t: 'Calidad analiza',
        d: 'El equipo de Calidad conoce la opinión de sus clientes en tiempo real.',
        dot: '#00cfe8',
      },
    ],
    testimonial: {
      quote:
        'El servicio postventa sigue siendo excelente. Lo demuestra que empezó siendo una herramienta a aplicar a un sector de la empresa, y lo hemos derivado a distintas verticales y firmas de la compañía. Hoy seguimos buscando la manera de darle mayor uso a SimpleSuite porque es una herramienta con la que se trabaja bien. Con Simpletech nos entendemos y nos solucionan las cosas.',
      author: 'Valentina Herrera',
      role: 'Jefa de Calidad',
      company: 'Grupo Santa Rosa',
      photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Valentina-Herrera-Santa-Rosa.webp',
    },
  },
};
