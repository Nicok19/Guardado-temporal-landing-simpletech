// /i18n/en.js — el diccionario de inglés para el navegador. BaseLayout lo carga (bloqueante) en las páginas /en/...
// antes que las islas de React, que lo usan al hidratar (i18n/index.js).
import EN from '@/i18n/en';

export function GET() {
  return new Response(`globalThis.__ST_DICT__=${JSON.stringify(EN)};`, {
    headers: { 'Content-Type': 'text/javascript; charset=utf-8' },
  });
}
