import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

/**
 * Traducción del sitio (src/i18n): el JSX de src/ usa el runtime de src/i18n en lugar del de React, que traduce los
 * textos al idioma de la página. Se reescribe el import ya compilado: en el servidor, Vite carga los paquetes de
 * node_modules sin pasar por los plugins, así que no alcanza con resolveId. El runtime de src/i18n y las dependencias
 * siguen usando el de React.
 */
function i18nJsxRuntime() {
  const dir = fileURLToPath(new URL('./src/i18n/', import.meta.url));
  const src = fileURLToPath(new URL('./src/', import.meta.url));
  const RUNTIME = /(["'])react\/(jsx-runtime|jsx-dev-runtime)\1/g;
  return {
    name: 'simpletech-i18n-jsx-runtime',
    enforce: 'post',
    transform(code, id) {
      const file = path.normalize(id.split('?')[0]);
      if (!file.startsWith(src) || file.startsWith(dir) || !code.includes('react/jsx')) return null;
      return { code: code.replace(RUNTIME, (_, q, name) => `${q}/src/i18n/${name}.js${q}`), map: null };
    },
  };
}

export default defineConfig({
  // URL pública del sitio: se usa para canonical, Open Graph y sitemap.xml.
  site: env.PUBLIC_SITE_URL || 'https://www.simpletech.uy',
  integrations: [react(), sitemap()],
  // Subpáginas que se unificaron: las URLs viejas siguen funcionando.
  redirects: {
    '/nosotros/mision': '/nosotros',
    '/nosotros/presencia': '/nosotros',
    '/blog/articulos': '/blog',
    '/blog/recursos': '/blog/webinars',
    '/nosotros/metodo': '/como-trabajamos',
    '/nosotros/entrega': '/como-trabajamos',
    '/soluciones/casos': '/soluciones#casos',
    '/soluciones/casos-industria': '/soluciones#casos',
    '/soluciones/casos-producto': '/soluciones#casos',
    '/soluciones/casos-de-uso': '/soluciones#casos',
    '/partners': '/ecosistema/partners',
    '/partners/tecnologicos': '/ecosistema/partners#s-tecnologicos',
    '/partners/comerciales': '/ecosistema/partners#s-comerciales',
    '/partners/sumate': '/ecosistema/partners#s-sumate',
    // URLs del sitio anterior
    '/wittysuite-api': '/ecosistema/api',
    '/ia-conversacional': '/ecosistema/ia-conversacional',
  },
  vite: {
    plugins: [i18nJsxRuntime()],
    // La compilación (astro build) usa su propia caché: si compartía node_modules/.vite con el servidor de desarrollo,
    // al compilar con `npm run dev` abierto le dejaba React de producción y se rompían todas las islas
    // (header, formulario…) con "jsxDEV is not a function".
    cacheDir: process.argv.includes('build') ? 'node_modules/.vite-build' : 'node_modules/.vite',
    // En desarrollo, Vite descubría d3-geo recién al abrir /nosotros, re-optimizaba las dependencias y el globo
    // quedaba pidiendo la versión vieja (504 "Outdated Optimize Dep") y no se dibujaba. Se optimiza desde el arranque.
    optimizeDeps: { include: ['d3-geo'] },
    server: {
      // Si PUBLIC_API_PROXY_TARGET está definido, /api se redirige al backend local (evita CORS en desarrollo).
      proxy: env.PUBLIC_API_PROXY_TARGET
        ? { '/api': { target: env.PUBLIC_API_PROXY_TARGET, changeOrigin: true } }
        : undefined,
    },
  },
});
