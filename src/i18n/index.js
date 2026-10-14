/**
 * Idiomas del sitio. El español es el original y vive en las rutas de siempre; el inglés, el portugués y el francés se
 * sirven en /en/..., /pt/... y /fr/... (pages/en/*, pages/pt/*, pages/fr/*) con el mismo código: los textos se
 * traducen al mostrarse, con el diccionario del idioma (i18n/en, i18n/pt, i18n/fr).
 *
 * - En el servidor, middleware.js marca el idioma de cada página y carga el diccionario.
 * - En el navegador, el idioma sale de <html lang> y el diccionario de /i18n/<idioma>.js (BaseLayout lo carga antes
 *   que las islas). Así el HTML del servidor y la hidratación coinciden.
 * - i18n/jsx-runtime.js traduce el texto de todos los componentes de React; los .astro llaman a t() a mano.
 *
 * Los datos (casos, plataformas, preguntas) siguen en español: el filtro, los ids y las comparaciones no cambian;
 * solo cambia lo que se muestra. Un texto sin traducción se muestra en español.
 */

export const DEFAULT_LANG = 'es';
export const LANGS = ['es', 'en', 'pt', 'fr'];
const PREFIXED = LANGS.filter((l) => l !== DEFAULT_LANG); // idiomas con prefijo en la ruta (/en, /pt)

/** Idioma de la página que se está mostrando: 'es' | 'en' | 'pt' | 'fr'. */
export function getLang() {
  if (globalThis.__ST_LANG__) return globalThis.__ST_LANG__;
  if (typeof document !== 'undefined' && LANGS.includes(document.documentElement.lang))
    return document.documentElement.lang;
  return DEFAULT_LANG;
}

/** Idioma de una ruta: '/en/...' → 'en', '/pt/...' → 'pt'; el resto, español. */
export const langFromPath = (pathname = '/') =>
  PREFIXED.find((l) => pathname === '/' + l || pathname.startsWith('/' + l + '/')) ?? DEFAULT_LANG;

/** Ruta sin el prefijo de idioma: '/en/simplesuite' → '/simplesuite', '/pt' → '/'. */
export function stripLang(pathname = '/') {
  const lang = langFromPath(pathname);
  if (lang === DEFAULT_LANG) return pathname;
  return pathname.slice(lang.length + 1) || '/';
}

/** La misma ruta en otro idioma: pathFor('/simplesuite', 'pt') → '/pt/simplesuite'. */
export function pathFor(pathname, lang) {
  const base = stripLang(pathname);
  return lang === DEFAULT_LANG ? base : '/' + lang + base;
}

// Rutas internas que no son páginas (archivos, assets): no llevan prefijo de idioma.
const NOT_A_PAGE = ['/uploads/', '/_astro/', '/i18n/', '/favicon', '/sitemap', '/robots'];

/** Fuera del español, los links internos ('/x', '/#contacto') llevan a la versión del idioma ('/pt/x', '/pt/#contacto'). */
export function localizeHref(href) {
  const lang = getLang();
  if (typeof href !== 'string' || lang === DEFAULT_LANG) return href;
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  if (langFromPath(href.split(/[?#]/)[0]) !== DEFAULT_LANG) return href;
  if (NOT_A_PAGE.some((p) => href.startsWith(p))) return href;
  if (/\.[a-z0-9]{2,5}([?#]|$)/i.test(href.split('#')[0])) return href; // archivo (.pdf, .png…)
  return '/' + lang + href;
}

// ---- Traducción ----------------------------------------------------------------------------------

let cache = null; // índices armados a partir del diccionario (una sola vez)

function index(dict) {
  if (cache?.dict === dict) return cache;
  const exact = new Map();
  const loose = new Map(); // sin puntuación final y en minúsculas (para "TÍTULO" o "Título" sin punto)
  const patterns = []; // claves con {0}, {1}…: textos armados con variables
  for (const [es, en] of Object.entries(dict)) {
    if (!en) continue;
    exact.set(es, en);
    const k = looseKey(es);
    if (!loose.has(k)) loose.set(k, stripEnd(en));
    if (/\{\d\}/.test(es)) {
      const parts = es.split(/\{\d\}/).map(escapeRe);
      patterns.push({
        re: new RegExp('^' + parts.join('([\\s\\S]+?)') + '$'),
        order: [...es.matchAll(/\{(\d)\}/g)].map((m) => +m[1]),
        en,
      });
    }
  }
  cache = { dict, exact, loose, patterns };
  return cache;
}

const END = /[\s.:*…]+$/;
const stripEnd = (s) => s.replace(END, '');
const looseKey = (s) => stripEnd(s).toLowerCase();
function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const isUpper = (s) => /[A-ZÁÉÍÓÚÑ]/.test(s) && s === s.toUpperCase();

function lookup(ix, s) {
  const hit = ix.exact.get(s);
  if (hit) return hit;
  // Mismo texto con otra puntuación final o en mayúsculas (kickers, títulos sin el punto dorado, "Texto*").
  const end = s.match(END)?.[0] ?? '';
  const loose = ix.loose.get(looseKey(s));
  if (loose) return (isUpper(stripEnd(s)) ? loose.toUpperCase() : loose) + end;
  // Textos con variables: 'Ver caso {0}' → 'View {0} case'
  for (const p of ix.patterns) {
    const m = s.match(p.re);
    if (m) return p.en.replace(/\{(\d)\}/g, (_, n) => t(m[p.order.indexOf(+n) + 1] ?? ''));
  }
  return null;
}

/** Traduce un texto al idioma de la página (o lo devuelve igual si es español o no tiene traducción). */
export function t(s) {
  if (typeof s !== 'string' || getLang() === DEFAULT_LANG) return s;
  const dict = globalThis.__ST_DICT__;
  if (!dict) return s;
  const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!m[2]) return s;
  const out = lookup(index(dict), m[2]);
  if (out == null) {
    if (import.meta.env?.DEV) reportMissing(m[2]);
    return s;
  }
  return m[1] + out + m[3];
}

// En desarrollo, el servidor anota los textos en español que se mostraron sin traducción (middleware.js los guarda).
const SPANISH = /[áéíóúñ¿¡]|\b(de|la|el|los|las|que|con|para|por|tu|tus|una?|en|del|y)\b/i;
function reportMissing(s) {
  if (typeof window !== 'undefined' || !/[a-z]{2}/i.test(s) || !SPANISH.test(s)) return;
  if (!(globalThis.__ST_MISSING__ instanceof Map)) globalThis.__ST_MISSING__ = new Map(); // ruta → textos sin traducir
  const byPage = globalThis.__ST_MISSING__;
  if (!byPage.has(globalThis.__ST_PATH__)) byPage.set(globalThis.__ST_PATH__, new Set());
  byPage.get(globalThis.__ST_PATH__).add(s);
}

// Atributos de texto que se traducen en los elementos HTML (el resto, como className o id, no).
const TEXT_ATTRS = ['alt', 'title', 'placeholder', 'aria-label', 'aria-description', 'aria-roledescription'];
const SKIP_TAGS = new Set(['style', 'script', 'code', 'pre']);

const translateChildren = (c) => (typeof c === 'string' ? t(c) : Array.isArray(c) ? c.map(translateChildren) : c);

/** Props traducidas para el runtime de JSX (i18n/jsx-runtime.js). En español no hace nada. */
export function translateProps(type, props) {
  if (getLang() === DEFAULT_LANG || !props) return props;
  if (typeof type === 'string' && SKIP_TAGS.has(type)) return props;
  let next = props;
  const set = (k, v) => {
    if (v === props[k]) return;
    if (next === props) next = { ...props };
    next[k] = v;
  };
  if (props.children != null) set('children', translateChildren(props.children));
  if (typeof type === 'string') {
    for (const a of TEXT_ATTRS) if (typeof props[a] === 'string') set(a, t(props[a]));
    if (typeof props.href === 'string') set('href', localizeHref(props.href));
  }
  return next;
}

const NUMBER_LOCALES = { es: 'es-UY', en: 'en-US', pt: 'pt-BR', fr: 'fr-FR' };

/** Formato de números según el idioma (12.480 en español y portugués, 12,480 en inglés, 12 480 en francés). */
export const numberLocale = () => NUMBER_LOCALES[getLang()];
