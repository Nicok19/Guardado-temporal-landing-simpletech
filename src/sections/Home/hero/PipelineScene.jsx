import { HERO_FLOW } from '@/data/home';
import { FONT_MONO } from '@/styles/tokens';
import { ILLU, panelStyle } from './panel';

// Lienzo del flujo (coordenadas del viewBox; el SVG escala al ancho disponible).
const W = 300;
const H = 300;
const NODE_W = 184;
const NODE_H = 56;
const LAYOUT = {
  entrada: { x: 58, y: 8 },
  agente: { x: 58, y: 122 },
  resultado: { x: 58, y: 236 },
};
const EDGES = [
  ['entrada', 'agente'],
  ['agente', 'resultado'],
];
// En qué paso aparece cada nodo (las conexiones se dibujan cuando aparece su destino).
const APPEARS_AT = { entrada: 1, agente: 2, resultado: 3 };
// Color plano del ícono de cada nodo (estilo ilustrado).
const ICON_BG = { entrada: ILLU.mint, agente: ILLU.lilac, resultado: ILLU.mint };
// Orden en que se resalta cada nodo (ids de HERO_FLOW).
const ORDER = ['entrada', 'agente', 'resultado'];

const edgePath = ([from, to]) => {
  const a = LAYOUT[from];
  const b = LAYOUT[to];
  const ax = a.x + NODE_W / 2;
  const ay = a.y + NODE_H;
  const bx = b.x + NODE_W / 2;
  const by = b.y;
  return `M${ax},${ay} C${ax},${ay + 28} ${bx},${by - 28} ${bx},${by}`;
};

function Node({ node, visible, current }) {
  const { x, y } = LAYOUT[node.id];
  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px) scale(${visible ? 1 : 0.85})`,
        transformBox: 'fill-box',
        transformOrigin: 'center',
        opacity: visible ? 1 : 0,
        // Aparece apenas después de que se dibuja la conexión que llega a él.
        transition: `opacity .6s ease ${visible ? '.6s' : '0s'}, transform .8s cubic-bezier(.2,.8,.2,1) ${visible ? '.6s' : '0s'}`,
      }}
    >
      {/* Nodo como sticker: sombra dura y contorno de tinta; el activo se pinta dorado */}
      <rect x="4" y="4" width={NODE_W} height={NODE_H} rx="13" fill={ILLU.ink} />
      <rect
        width={NODE_W}
        height={NODE_H}
        rx="13"
        fill={current ? ILLU.gold : ILLU.cream}
        stroke={ILLU.ink}
        strokeWidth="2.5"
        style={{ transition: 'fill .4s' }}
      />
      <rect x="12" y="13" width="30" height="30" rx="9" fill={ICON_BG[node.id]} stroke={ILLU.ink} strokeWidth="2" />
      <circle cx="27" cy="28" r="5" fill={ILLU.ink} />
      <text x="54" y="25" fill={ILLU.ink} fontSize="13.5" fontWeight="700" fontFamily="Inter, sans-serif">
        {node.t}
      </text>
      <text x="54" y="41" fill={ILLU.ink} fillOpacity=".6" fontSize="10" fontFamily={FONT_MONO}>
        {node.sub}
      </text>
      {/* puertos de entrada/salida, como en n8n */}
      <circle cx={NODE_W / 2} cy="0" r="4" fill={ILLU.cream} stroke={ILLU.ink} strokeWidth="2" />
      <circle cx={NODE_W / 2} cy={NODE_H} r="4" fill={ILLU.cream} stroke={ILLU.ink} strokeWidth="2" />
    </g>
  );
}

/** Escena 2 · Pipeline estilo n8n. `step` = paso actual (1 = aparece el primer nodo). */
export default function PipelineScene({ step }) {
  const lastStep = Math.min(step, ORDER.length);
  const isVisible = (id) => step >= APPEARS_AT[id];
  const currentId = ORDER[lastStep - 1];

  return (
    <div style={{ ...panelStyle, gap: '12px' }}>
      <div
        style={{
          // El SVG se posiciona en absoluto: así escala al alto disponible sin empujar el layout.
          position: 'relative',
          flex: 1,
          minHeight: 0,
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={HERO_FLOW.map((n) => n.t).join(' → ')}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        >
          {EDGES.map((edge, i) => {
            const drawn = isVisible(edge[1]);
            const d = edgePath(edge);
            return (
              <g key={edge.join('-')}>
                {/* Conexión con contorno: trazo de tinta grueso debajo y crema encima, como dibujada */}
                {[
                  [ILLU.ink, 6],
                  [ILLU.cream, 2.5],
                ].map(([color, width]) => (
                  <path
                    key={color}
                    d={d}
                    pathLength="1"
                    fill="none"
                    stroke={color}
                    strokeWidth={width}
                    strokeLinecap="round"
                    strokeDasharray="1"
                    strokeDashoffset={drawn ? 0 : 1}
                    style={{ transition: drawn ? 'stroke-dashoffset .9s ease' : 'none' }}
                  />
                ))}
                {/* pulso: un tramo dorado que recorre la conexión en loop */}
                <path
                  className="st-flow-pulse"
                  d={d}
                  pathLength="1"
                  fill="none"
                  stroke={ILLU.gold}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="0.12 1"
                  style={{
                    opacity: drawn ? 1 : 0,
                    transition: `opacity .4s ease ${drawn ? '.9s' : '0s'}`,
                    animationDelay: `${i * 0.6}s`,
                  }}
                />
              </g>
            );
          })}
          {HERO_FLOW.map((node) => (
            <Node key={node.id} node={node} visible={isVisible(node.id)} current={node.id === currentId} />
          ))}
        </svg>
      </div>
    </div>
  );
}
