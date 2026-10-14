import { ROUTES, suiteModulePath } from '@/config/routes';
import { SUITE_MODULES } from '@/data/suiteModules';

// Artículos del blog: se leen del WordPress de simpletech.uy (services/wordpress.js).
const BLOG_URL = '/blog';

// Menú principal. Un ítem sin `items` es un link directo, sin submenú.
export const NAV_ITEMS = [
  {
    id: 'producto',
    label: 'SimpleSuite',
    href: ROUTES.simplesuite,
    // Los módulos de SimpleSuite van directo en el submenú (sin una fila "SimpleSuite" propia).
    // En desktop el submenú es una grilla de 3 columnas: 6 plataformas y Academy a lo ancho abajo (`wide`).
    columns: 3,
    items: [
      ...SUITE_MODULES.map((m) => ({ label: m.name, desc: m.short, href: suiteModulePath(m.id) })),
      { label: 'SimplePipeline', desc: 'Flujos con agentes de IA especializados', href: ROUTES.simplepipeline },
      {
        label: 'Academy',
        badge: 'Plataforma de aprendizaje',
        desc: 'Cursos para sacarle el máximo provecho a SimpleSuite',
        href: ROUTES.academy,
        wide: true,
      },
    ],
  },
  {
    id: 'soluciones',
    label: 'Casos de éxito',
    href: ROUTES.soluciones,
  },
  {
    id: 'ecosistema',
    label: 'Ecosistema',
    href: ROUTES.ecosistema,
    items: [
      { label: 'Partners', desc: 'Meta, AWS, Facephi y socios en la región', href: '/ecosistema/partners' },
      { label: 'API para desarrolladores', desc: 'Integrá canales y módulos en tus flujos', href: '/ecosistema/api' },
      { label: 'IA conversacional', desc: 'Agentes de IA en todos tus canales', href: '/ecosistema/ia-conversacional' },
    ],
  },
  {
    id: 'nosotros',
    label: 'Nosotros',
    href: ROUTES.nosotros,
    items: [
      { label: 'Artículos', desc: 'Contenido útil y novedoso', href: BLOG_URL },
      { label: 'Webinars', desc: 'Charlas en vivo sobre nuestras plataformas', href: '/blog/webinars' },
      {
        label: 'Datos de la industria',
        desc: 'Desafíos y benchmarks de cada sector',
        href: '/nosotros/datos-de-la-industria',
      },
    ],
  },
  {
    id: 'como-trabajamos',
    label: 'Cómo trabajamos',
    href: ROUTES.metodo,
    items: [
      {
        label: 'Precios',
        desc: 'Todo lo que incluye tu propuesta',
        href: '/como-trabajamos/precios',
      },
      {
        label: 'Preguntas frecuentes',
        desc: 'Lo que suelen preguntarnos',
        href: '/como-trabajamos/preguntas-frecuentes',
      },
    ],
  },
];

/**
 * Filas del submenú desplegado (desktop y mobile): una por página.
 */
export const menuRows = (navEntry) => navEntry.items;

/** Ítem del menú principal por id ('nosotros', 'soluciones', ...): { label, href, items }. */
export const navItem = (id) => NAV_ITEMS.find((n) => n.id === id);

/** Todas las subpáginas de un ítem del menú: { label, desc, href }[]. */
export const navSubpages = (id) => navItem(id).items;

/** Subpágina de un ítem del menú por su href. */
export const navSubpage = (id, href) => navSubpages(id).find((it) => it.href === href);

/** Las otras subpáginas del mismo ítem del menú (para los links al pie de cada subpágina). */
export const navSiblings = (id, href) => navSubpages(id).filter((it) => it.href !== href);

// Páginas que resaltan otro ítem del menú (ej. /simplesuite → "SimpleSuite", id producto).
export const NAV_PARENT = {
  simplesuite: 'producto',
  simplepipeline: 'producto',
  academy: 'producto',
  caso: 'soluciones',
  blog: 'nosotros',
};

export const FOOTER_LINKS = [
  { label: 'Nosotros', href: ROUTES.nosotros },
  { label: 'Producto', href: ROUTES.producto },
  { label: 'Casos de éxito', href: ROUTES.soluciones },
  { label: 'Ecosistema', href: ROUTES.ecosistema },
  { label: 'Blog', href: BLOG_URL },
];
