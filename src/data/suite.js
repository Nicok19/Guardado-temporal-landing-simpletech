import { ROUTES } from '@/config/routes';

// Textos de la página /simplesuite (los de cada plataforma salen de data/suiteModules.js).

export const SUITE_HERO = {
  title: 'Cada conversación con tus clientes, en una sola suite.',
};

// Lo que gana tu operación al tener todo en una suite.
export const SUITE_VALUES = [
  {
    k: 'RESOLVER',
    t: 'Resolvé en todos tus canales',
    d: 'WhatsApp, Instagram, Messenger, Webchat y voz conectados en una misma plataforma.',
  },
  {
    k: 'AUTOMATIZAR',
    t: 'Automatizá y escalá',
    d: 'Bots e IA resuelven lo repetitivo y derivan a tu equipo con todo el contexto.',
  },
  {
    k: 'MEDIR',
    t: 'Decidí con datos',
    d: 'Métricas en tiempo real para detectar desvíos y mejorar cada interacción.',
  },
];

// Recursos para sacarle el máximo provecho (mismo formato que SubpageLinks: { label, desc, href }).
export const SUITE_RESOURCES = [
  { label: 'Academy', desc: 'Cursos para dominar cada plataforma de SimpleSuite.', href: ROUTES.academy },
  { label: 'API para desarrolladores', desc: 'Integrá SimpleSuite con tus sistemas.', href: '/ecosistema/api' },
  { label: 'Webinars', desc: 'Las novedades de la suite, mostradas en vivo.', href: '/blog/webinars' },
  {
    label: 'Preguntas frecuentes',
    desc: 'Lo que suelen preguntarnos sobre la suite.',
    href: '/como-trabajamos/preguntas-frecuentes',
  },
];
