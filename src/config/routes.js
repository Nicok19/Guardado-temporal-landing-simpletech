import { SUITE_MODULES } from '@/data/suiteModules';

export const ROUTES = {
  home: '/',
  nosotros: '/nosotros',
  metodo: '/como-trabajamos',
  producto: '/producto',
  simplesuite: '/simplesuite',
  simplepipeline: '/simplepipeline',
  academy: '/academy',
  soluciones: '/soluciones',
  ecosistema: '/ecosistema',
  caso: '/caso',
};

// Cada ítem de los submenús es una página propia (ver src/pages/<menú>/*.astro).

export const caseStudyPath = (slug) => `${ROUTES.caso}/${slug}`;
export const suiteModulePath = (moduleId) => `${ROUTES.simplesuite}/${moduleId}`;

/** getStaticPaths de /simplesuite/:modulo — una página por módulo de SimpleSuite. */
export const suiteModulePaths = () => SUITE_MODULES.map((m) => ({ params: { modulo: m.id }, props: { module: m } }));
