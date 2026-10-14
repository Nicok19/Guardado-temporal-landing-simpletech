// Geolocalización del sitio: de qué país entra cada visitante, a qué región pertenece y qué se le muestra.
//
// Hoy la región solo define el IDIOMA POR DEFECTO: en la primera visita a una página en español (sin prefijo de
// idioma), el visitante se redirige a la versión de su región (ej. desde Brasil → /pt/...). Más adelante cada región
// puede sumar contenido propio (ver <RegionContent> en components/common/RegionContent.jsx y utils/geo.js).
//
// Cómo se detecta el país (scripts/geo.js, se ejecuta en el <head> antes de dibujar la página):
//   1. ?geo=XX en la URL (para probar: ?geo=BR, ?geo=US…; ?geo= lo borra).
//   2. El país guardado de una visita anterior (localStorage).
//   3. La zona horaria del navegador (TIMEZONE_COUNTRY): sin pedidos externos, alcanza para la primera visita.
//   4. Si GEO_ENDPOINT está definido, se pide en segundo plano y se guarda para las próximas visitas. Es un endpoint
//      del hosting que devuelve { "country": "BR" } a partir de la IP (Vercel: header x-vercel-ip-country;
//      Netlify: context.geo.country.code; Cloudflare: header cf-ipcountry). Se define en PUBLIC_GEO_ENDPOINT.
//
// La redirección nunca pisa una elección: si la persona elige un idioma en el selector, se guarda y se respeta
// siempre (utils/geo.js → rememberLangChoice). Tampoco redirige a buscadores ni a quien entra a una URL con idioma
// (/en/…, /pt/…, /fr/…), y se hace como mucho una vez por sesión.

// Regiones: idioma por defecto y países que la forman. Un país que no está en ninguna va a DEFAULT_REGION.
export const REGIONS = {
  latam: { lang: 'es', countries: [] }, // América Latina hispanohablante, España y el resto (región por defecto)
  brasil: { lang: 'pt', countries: ['BR', 'PT', 'AO', 'MZ'] },
  norteamerica: { lang: 'en', countries: ['US', 'CA', 'GB', 'IE', 'AU', 'NZ', 'JM', 'BS', 'BB', 'TT', 'BZ'] },
  francofonia: { lang: 'fr', countries: ['FR', 'BE', 'LU', 'MC', 'HT', 'SN', 'CI'] },
};
export const DEFAULT_REGION = 'latam';

// Zona horaria → país, para adivinar el país sin pedidos externos. Solo hacen falta las de países que NO van a la
// región por defecto (si no está acá, se asume DEFAULT_REGION). Las que empiezan con un prefijo de la lista
// TIMEZONE_PREFIX_COUNTRY cubren a todas las de ese país.
export const TIMEZONE_COUNTRY = {
  'America/Sao_Paulo': 'BR',
  'America/Bahia': 'BR',
  'America/Fortaleza': 'BR',
  'America/Recife': 'BR',
  'America/Maceio': 'BR',
  'America/Belem': 'BR',
  'America/Manaus': 'BR',
  'America/Cuiaba': 'BR',
  'America/Campo_Grande': 'BR',
  'America/Porto_Velho': 'BR',
  'America/Boa_Vista': 'BR',
  'America/Rio_Branco': 'BR',
  'America/Araguaina': 'BR',
  'America/Santarem': 'BR',
  'America/Noronha': 'BR',
  'Europe/Lisbon': 'PT',
  'Africa/Luanda': 'AO',
  'Africa/Maputo': 'MZ',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Phoenix': 'US',
  'America/Los_Angeles': 'US',
  'America/Anchorage': 'US',
  'America/Detroit': 'US',
  'America/Boise': 'US',
  'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Regina': 'CA',
  'America/Halifax': 'CA',
  'America/St_Johns': 'CA',
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Pacific/Auckland': 'NZ',
  'America/Jamaica': 'JM',
  'America/Nassau': 'BS',
  'America/Barbados': 'BB',
  'America/Port_of_Spain': 'TT',
  'America/Belize': 'BZ',
  'Europe/Paris': 'FR',
  'Europe/Brussels': 'BE',
  'Europe/Luxembourg': 'LU',
  'Europe/Monaco': 'MC',
  'America/Port-au-Prince': 'HT',
  'Africa/Dakar': 'SN',
  'Africa/Abidjan': 'CI',
};
export const TIMEZONE_PREFIX_COUNTRY = { 'America/Indiana/': 'US', 'America/Kentucky/': 'US', 'Australia/': 'AU' };

// Endpoint opcional del hosting que devuelve { country } (ver arriba). Vacío = solo zona horaria.
export const GEO_ENDPOINT = import.meta.env.PUBLIC_GEO_ENDPOINT || '';

// Claves de almacenamiento (compartidas entre scripts/geo.js y utils/geo.js).
export const GEO_KEYS = {
  country: 'st_geo_country', // localStorage: { country, source, t }
  langChoice: 'st_lang_choice', // localStorage: idioma elegido a mano en el selector
  redirected: 'st_geo_redirected', // sessionStorage: ya se redirigió en esta sesión
  override: 'st_geo_override', // sessionStorage: país forzado con ?geo=XX
};

/** Región de un país (código ISO de 2 letras). */
export const regionOf = (country) =>
  Object.keys(REGIONS).find((r) => REGIONS[r].countries.includes(String(country || '').toUpperCase())) ??
  DEFAULT_REGION;

/** Todo lo que necesita el script del <head> (va como JSON: sin funciones). */
export const GEO_CLIENT_CONFIG = {
  regions: Object.fromEntries(Object.entries(REGIONS).map(([k, v]) => [k, v])),
  defaultRegion: DEFAULT_REGION,
  timezones: TIMEZONE_COUNTRY,
  timezonePrefixes: TIMEZONE_PREFIX_COUNTRY,
  endpoint: GEO_ENDPOINT,
  keys: GEO_KEYS,
};
