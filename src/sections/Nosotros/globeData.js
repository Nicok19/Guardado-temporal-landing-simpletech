// Puntos de tierra del globo de Presencia regional. Se calcula solo en el BUILD (lo importa
// pages/nosotros/index.astro) y llega al navegador como una lista de [lon, lat].
// Grilla en latitud/longitud con el paso de longitud ajustado por latitud: densidad pareja en toda la esfera.
import { geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
import land110m from 'world-atlas/land-110m.json';

const LAT_STEP = 2.2; // grados entre filas de puntos
const land = feature(land110m, land110m.objects.land);
const round = (n) => Math.round(n * 10) / 10;

const dots = [];
for (let lat = -58; lat <= 82; lat += LAT_STEP) {
  const lonStep = LAT_STEP / Math.max(0.2, Math.cos((lat * Math.PI) / 180));
  for (let lon = -180; lon < 180; lon += lonStep) {
    if (geoContains(land, [lon, lat])) dots.push([round(lon), round(lat)]);
  }
}

export const GLOBE_DOTS = dots;
