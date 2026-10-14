// Geolocalización desde el código del sitio (la detección la hace components/layout/GeoScript.astro en el <head>;
// las reglas están en config/geo.js).
import { DEFAULT_REGION, GEO_KEYS, REGIONS } from '@/config/geo';

/** País y región del visitante: { country, region, source }. En el servidor (build) devuelve la región por defecto. */
export function getGeo() {
  if (typeof window === 'undefined' || !window.__ST_GEO__) return { country: '', region: DEFAULT_REGION, source: 'none' };
  return window.__ST_GEO__;
}

/** Región del visitante ('latam', 'brasil', 'norteamerica', 'francofonia'). */
export const getRegion = () => getGeo().region;

/**
 * Guarda el idioma que la persona eligió a mano en el selector: desde ahí la geolocalización no la vuelve a
 * redirigir (lo llaman LanguageSelector y el menú mobile).
 */
export function rememberLangChoice(lang) {
  try {
    localStorage.setItem(GEO_KEYS.langChoice, lang);
  } catch {
    // sin almacenamiento (modo privado): solo se pierde la preferencia
  }
}

/** CSS que muestra cada <RegionContent> solo en su región (lo inserta BaseLayout). */
export const REGION_CSS = [
  '[data-region-only]{display:none}',
  // Sin JS (o antes de detectar), se ve el contenido de la región por defecto.
  `html:not([data-region]) [data-region-only~="${DEFAULT_REGION}"]{display:contents}`,
  ...Object.keys(REGIONS).map((r) => `html[data-region="${r}"] [data-region-only~="${r}"]{display:contents}`),
].join('');
