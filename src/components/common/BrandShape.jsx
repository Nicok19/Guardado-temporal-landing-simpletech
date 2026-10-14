// Isotipo de Simpletech (los dos arcos) usado como gráfico decorativo de fondo.
const ARC_TOP = 'M108 50 H240 C265 75 285 115 288 155 H178 C172 120 145 97 108 95 Z';
const ARC_BOTTOM = 'M108 195 C200 212 285 255 292 348 H180 C178 315 150 297 108 288 Z';

export default function BrandShape({ fill = '#00249C', style }) {
  return (
    <svg viewBox="70 30 260 340" aria-hidden="true" style={style}>
      <path d={ARC_TOP} fill={fill} />
      <path d={ARC_BOTTOM} fill={fill} />
    </svg>
  );
}
