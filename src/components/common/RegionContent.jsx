/**
 * Contenido que se muestra solo a visitantes de ciertas regiones (config/geo.js). Funciona en páginas estáticas:
 * se renderizan todas las variantes y el CSS de BaseLayout deja visible solo la de la región detectada, sin parpadeo
 * (la región se marca en <html> antes de dibujar la página). Sirve en .astro y en JSX, sin client:*.
 *
 *   <RegionContent regions={['brasil']}>Oferta para Brasil</RegionContent>
 *   <RegionContent regions={['latam', 'norteamerica']}>Para el resto</RegionContent>
 *
 * Para elegir una variante desde JS (ej. dentro de una isla), usar getRegion() de utils/geo.js.
 */
export default function RegionContent({ regions, children }) {
  return <div data-region-only={regions.join(' ')}>{children}</div>;
}
