// /i18n/fr.js — el diccionario de francés para el navegador. BaseLayout lo carga (bloqueante) en las páginas /fr/...
// antes que las islas de React, que lo usan al hidratar (i18n/index.js).
import FR from '@/i18n/fr';

export function GET() {
  return new Response(`globalThis.__ST_DICT__=${JSON.stringify(FR)};`, {
    headers: { 'Content-Type': 'text/javascript; charset=utf-8' },
  });
}
