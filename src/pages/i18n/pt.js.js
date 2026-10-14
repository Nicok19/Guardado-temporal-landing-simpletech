// /i18n/pt.js — el diccionario de portugués para el navegador. BaseLayout lo carga (bloqueante) en las páginas /pt/...
// antes que las islas de React, que lo usan al hidratar (i18n/index.js).
import PT from '@/i18n/pt';

export function GET() {
  return new Response(`globalThis.__ST_DICT__=${JSON.stringify(PT)};`, {
    headers: { 'Content-Type': 'text/javascript; charset=utf-8' },
  });
}
