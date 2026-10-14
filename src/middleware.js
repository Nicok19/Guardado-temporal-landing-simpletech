// Idioma de cada página (i18n/index.js): /en/... se muestra en inglés, /pt/... en portugués, /fr/... en francés
// y el resto en español. Corre en el servidor (y en el build, una vez por página) antes de mostrar la página.
import { defineMiddleware } from 'astro:middleware';
import { langFromPath } from '@/i18n';
import EN from '@/i18n/en';
import PT from '@/i18n/pt';
import FR from '@/i18n/fr';

const DICTS = { en: EN, pt: PT, fr: FR };

export const onRequest = defineMiddleware(async (context, next) => {
  const lang = langFromPath(context.url.pathname);
  globalThis.__ST_LANG__ = lang;
  globalThis.__ST_DICT__ = DICTS[lang];
  globalThis.__ST_PATH__ = context.url.pathname;
  if (globalThis.__ST_MISSING__ instanceof Map) globalThis.__ST_MISSING__.delete(context.url.pathname); // se vuelve a anotar al mostrar la página
  const response = await next();
  // En desarrollo: los textos que quedaron sin traducir, por página, en node_modules/.i18n-missing.json
  // (para completar i18n/en, i18n/pt e i18n/fr).
  if (import.meta.env.DEV && globalThis.__ST_MISSING__) {
    const { writeFile } = await import('node:fs/promises');
    const all = Object.fromEntries([...globalThis.__ST_MISSING__].map(([path, set]) => [path, [...set].sort()]));
    await writeFile('node_modules/.i18n-missing.json', JSON.stringify(all, null, 1));
  }
  return response;
});
