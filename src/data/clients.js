// Logos de la marquesina "Confían en nosotros". ratio = ancho/alto, define la altura visual.
const LOGOS = [
  ['Santander', 'santander', 7.45],
  ['Itaú', 'itau', 1],
  ['DHL', 'dhl', 7.07],
  ['Honda', 'honda', 1.54],
  ['Lider Bci', 'liderbci', 4.06],
  ['Ta-Ta', 'tata', 2.47],
  ['Montes del Plata', 'montesdelplata', 2.77],
  ['Aliaxis', 'aliaxis', 4.42],
  ['BlueCross & BlueShield', 'bluecross', 2.14],
  ['Sika', 'sika', 1.15],
  ['Prex', 'prex', 3.04],
  ['San Cristóbal Seguros', 'sancristobal', 4.93],
  ['Banque Heritage', 'heritage', 5.06],
  ['La Segunda', 'lasegunda', 4.47],
  ['Summum', 'summum', 3.12],
  ['Intendencia de Montevideo', 'intendencia', 3.05],
];

const logoHeight = (ratio) => (ratio > 4 ? '24px' : ratio > 2 ? '34px' : '44px');

export const CLIENT_LOGOS = LOGOS.map(([name, slug, ratio]) => ({
  name,
  src: `/uploads/logos/${slug}.png`,
  h: logoHeight(ratio),
}));
