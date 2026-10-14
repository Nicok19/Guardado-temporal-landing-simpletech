// Página de Simpletech Academy (/academy): video del lanzamiento + tarjeta de funcionalidades.
// Fuentes: https://academy.simpletech.uy/ (cursos sobre la suite, ahí con su nombre anterior WittySuite;
// cuenta gratuita e ingreso con Google, LinkedIn, Facebook, Apple o X), los pasos de implementación de
// data/company.js ("Acceso a Academy") y el video del lanzamiento en el canal de YouTube de Simpletech.
export const ACADEMY_URL = 'https://academy.simpletech.uy/';

export default {
  // Video de Academy (public/videos/). El del lanzamiento sigue en YouTube: https://www.youtube.com/watch?v=X3vRRO-q7U4
  video: {
    title: 'Conocé Simpletech Academy.',
    text: 'Así presentamos Academy: la plataforma de cursos para que tu equipo aprenda a usar SimpleSuite y diseñe sus propios proyectos de CX.',
    src: '/videos/simpletech_academy.mp4',
    poster: '/videos/simpletech_academy-poster.jpg', // fotograma del segundo 8: el logo de Academy
    label: 'Lanzamiento Simpletech Academy',
  },

  features: {
    title: 'Formación para equipos autónomos.',
    text: 'Simpletech Academy es nuestra plataforma de cursos online sobre SimpleSuite, la suite de gestión de interacciones entre empresas y clientes.',
    cta: { label: 'Ir a Academy', href: ACADEMY_URL },
    items: [
      { icon: 'grid', t: 'Cursos de SimpleSuite', d: 'Aprendé a usar cada plataforma de la suite.' },
      { icon: 'clock', t: 'Online, a tu ritmo', d: 'Accedé desde cualquier lugar y retomá cuando lo necesites.' },
      { icon: 'check', t: 'Cuenta gratuita', d: 'Crear tu cuenta no tiene costo.' },
      { icon: 'users', t: 'Ingresá con tu cuenta', d: 'Email, Google, LinkedIn, Facebook, Apple o X.' },
      { icon: 'list', t: 'Incluida en tu proyecto', d: 'El acceso a Academy es parte del inicio de cada suscripción.' },
      { icon: 'flow', t: 'Practicá en tu ambiente de test', d: 'Lo que aprendés, lo probás en tu propia instancia.' },
      { icon: 'spark', t: 'Proyectos de CX propios', d: 'Diseñá e implementá tus flujos con autonomía.' },
      { icon: 'inbox', t: 'Recursos de apoyo', d: 'Material de consulta para nuestras soluciones.' },
    ],
  },
};
