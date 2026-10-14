// Contenido institucional (Nosotros, footer).

// Encabezado y foto del equipo (Nosotros). Para la foto real del equipo:
// subila a public/uploads/equipo.jpg (horizontal, idealmente 2400×1000), poné src: '/uploads/equipo.jpg'.
export const TEAM = {
  title: 'Personas que hacen simple lo complejo',
  text: 'Un equipo altamente calificado, en Montevideo, Panamá y São Paulo, siempre a tu servicio.',
  // Provisoria (Unsplash, licencia libre): reemplazar por la foto real del equipo.
  photo: {
    src: 'https://images.unsplash.com/photo-1758873268663-5a362616b5a7?fm=jpg&q=75&w=2000&auto=format&fit=crop',
    alt: 'Equipo de trabajo en una oficina',
  },
};

export const VALUES = [
  { t: 'Cercanía', d: 'Relaciones de confianza, con un equipo que conoce tu operación.' },
  { t: 'Criterio', d: 'Recomendamos lo que tu negocio necesita, no lo que está de moda.' },
  { t: 'Simplicidad', d: 'Hacemos simple lo complejo, en cada solución y en cada conversación.' },
  { t: 'Innovación', d: 'Incorporamos IA y nuevas tecnologías con foco en resultados.' },
  { t: 'Compromiso', d: 'Acompañamos cada proyecto de punta a punta, y después también.' },
];

// Foto ancha debajo del encabezado de Cómo trabajamos (PhotoBand).
// Fotos: las de las páginas originales de simpletech.uy, o de Unsplash con licencia gratuita
// (images.unsplash.com/photo-…). Nunca de Unsplash+ (plus.unsplash.com/premium_photo-…), que es paga.
export const METHOD_PHOTO = {
  src: 'https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?fm=jpg&q=70&w=1600&auto=format&fit=crop',
  alt: 'Un equipo planifica un proyecto frente a una pizarra',
  position: 'center 40%',
};

// Las dos fases de la entrega (cada una con sus pasos en DELIVERY_TIMELINE[id]).
export const DELIVERY_PHASES = [
  {
    id: 'pre',
    label: 'Preventa consultiva',
    desc: 'Antes de empezar: entendemos tu negocio y diseñamos la propuesta con vos.',
  },
  {
    id: 'impl',
    label: 'Implementación',
    tag: '7 steps to success',
    desc: 'Del contrato al go-live, con capacitación y acompañamiento en cada etapa.',
    note: 'Condicionado a las características del proyecto.', // aplica a los ítems con *
  },
];

export const DELIVERY_TIMELINE = {
  pre: [
    { t: 'Reunión de discovery', items: ['Objetivos, procesos y desafíos del negocio.'] },
    { t: 'Demo a medida', items: ['La solución aplicada a tu caso real.'] },
    { t: 'Reunión técnica', items: ['Integraciones, arquitectura y seguridad.'] },
    { t: 'Propuesta', items: ['Alcance, plan de trabajo y valor esperado.'] },
    { t: 'Kick-off', items: ['Arranca la implementación con tu equipo.'] },
  ],
  impl: [
    { t: 'Alta de cliente y firma de contrato', items: [] },
    { t: 'Kick-off & Discovery', items: ['Relevamiento de objetivos y flujos.'] },
    {
      t: 'Service & Subscription Start',
      items: [
        'Alta de instancia.',
        'Acceso ambiente Test.',
        'Acceso a Academy.',
        'Inicio suscripción.',
        'Alta de credenciales administrativas.',
      ],
    },
    {
      t: 'Set Up',
      items: [
        'Integraciones externas*',
        'Diseño CX (funcional y técnico)',
        'Configuración de IA*',
        'Desarrollo RPA (Scripts Flow)*',
      ],
    },
    { t: 'Validación', items: ['QA interna', 'Pruebas UAT'] },
    { t: 'Capacitación', items: ['Formación personalizada + manual de usuario.'] },
    { t: 'Go-Live', items: ['Deploy producción + monitoreo.'] },
  ],
};

// Fotos de cada ciudad (Unsplash, licencia libre).
const cityPhoto = (id) => `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&w=1200&auto=format&fit=crop`;

export const OFFICES = [
  {
    city: 'Montevideo',
    country: 'URUGUAY',
    addr: 'Rincón 613',
    phone: '+598 2714 0301',
    photo: {
      src: cityPhoto('1667846788406-15622c02fe4d'),
    },
  },
  {
    city: 'Ciudad de Panamá',
    country: 'PANAMÁ',
    addr: 'PH Financial Park, Piso 35',
    phone: '+507 832 2455',
    photo: {
      src: cityPhoto('1525088099232-f509d88a8e75'),
    },
  },
  {
    city: 'São Paulo',
    country: 'BRASIL',
    addr: 'Alameda Vicente Pinzon, 54',
    phone: '+55 11 96476-5353',
    photo: {
      src: cityPhoto('1551736947-ca1f44a894e2'),
    },
  },
];

// Ciudades del globo de Presencia regional, en el orden en que el scroll las recorre (norte → sur).
// `office` = oficina propia (dirección en OFFICES); el resto son mercados con clientes.
export const PRESENCE_POINTS = [
  {
    city: 'Miami',
    country: 'ESTADOS UNIDOS',
    lon: -80.19,
    lat: 25.76,
    text: 'Puerta de entrada a Norteamérica y el Caribe.',
  },
  {
    city: 'Ciudad de Panamá',
    country: 'PANAMÁ',
    lon: -79.52,
    lat: 8.98,
    office: true,
    text: 'Nuestro hub para Centroamérica y el Caribe.',
  },
  {
    city: 'São Paulo',
    country: 'BRASIL',
    lon: -46.63,
    lat: -23.55,
    office: true,
    text: 'Cerca de las empresas del mayor mercado de la región.',
  },
  {
    city: 'Santiago',
    country: 'CHILE',
    lon: -70.65,
    lat: -33.45,
    text: 'Clientes como Lider Bci, Honda y DHL Chile.',
  },
  {
    city: 'Montevideo',
    country: 'URUGUAY',
    lon: -56.16,
    lat: -34.9,
    office: true,
    hub: true,
    text: 'Donde empezó todo, en 2011. Desde acá acompañamos a toda la región.',
  },
];

// Datos de la empresa para Presencia regional.
export const PRESENCE_STATS = [
  { value: '+200', label: 'empresas confían en nosotros' },
  { value: '+40', label: 'países con operaciones conectadas' },
  { value: '15', label: 'años acompañando a la región' },
  { value: '3', label: 'oficinas: Montevideo, Panamá y São Paulo' },
];
