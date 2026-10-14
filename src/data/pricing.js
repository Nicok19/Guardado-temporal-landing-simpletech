// Página /como-trabajamos/precios: no muestra montos, explica qué incluye la propuesta.

// Foto ancha debajo del encabezado (PhotoBand).
// Unsplash con licencia gratuita (images.unsplash.com/photo-…), nunca Unsplash+.
export const PRICING_PHOTO = {
  src: 'https://images.unsplash.com/photo-1758520144427-ddb02ac74e9d?fm=jpg&q=70&w=1600&auto=format&fit=crop',
  alt: 'Dos personas se dan la mano sobre un escritorio con una propuesta',
  position: 'center 35%',
};

// Lo que incluye toda propuesta (conceptos, sin orden ni pasos).
export const PRICING_INCLUDES = [
  {
    t: 'Consultoría',
    d: 'Entendemos tu negocio y diseñamos la solución con vos antes de empezar.',
    color: '#DCD291',
  },
  {
    t: 'Plataforma',
    d: 'Acceso en la nube a los módulos de SimpleSuite que tu operación necesita.',
    color: '#7367f0',
  },
  {
    t: 'Implementación a medida',
    d: 'Configuramos, integramos y probamos la solución sobre tus procesos reales.',
    color: '#00cfe8',
  },
  {
    t: 'Capacitación',
    d: 'Tu equipo aprende a usar la plataforma, con formación personalizada y acceso a Academy.',
    color: '#28c76f',
  },
  {
    t: 'Acompañamiento',
    d: 'Después del go-live seguimos a tu lado para medir y mejorar.',
    color: '#1e9aff',
  },
];

// Qué define el alcance (y por lo tanto la propuesta) de cada proyecto.
export const PRICING_FACTORS = [
  { t: 'Módulos', d: 'Qué módulos de SimpleSuite usás: bots, agentes, métricas, campañas o voz.' },
  { t: 'Integraciones', d: 'Con qué sistemas propios o de terceros se conecta la solución.' },
  { t: 'IA y automatizaciones', d: 'Cuánta inteligencia artificial y automatización de procesos requiere.' },
];
