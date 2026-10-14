import { FLOW_EDGES, FLOW_LAYOUTS, FLOW_NODES } from '@/data/pipelineFlow';

// Colores sobre el lienzo azul de marca
const GOLD = '#DCD291';
const EDGE_IDLE = 'rgba(255,255,255,.28)';

/**
 * Estado visual del diagrama para un escenario, un paso de la animación y un diseño ('h' | 'v').
 * step = cantidad de nodos del recorrido ya "encendidos" (0 = ninguno).
 * Las conexiones salen del centro del borde derecho (h) o inferior (v) y entran por el opuesto,
 * con un punto de conexión en cada extremo.
 */
export function buildFlowView(scenario, step, layout = 'h') {
  const { nodeH } = FLOW_LAYOUTS[layout];
  const { path } = scenario;
  const lit = path.slice(0, step);
  const current = path[step - 1];
  const pos = (id) => FLOW_NODES[id][layout];
  const isNextInPath = (from, to) => path.indexOf(to) === path.indexOf(from) + 1;

  const edges = FLOW_EDGES.map(([from, to]) => {
    const a = pos(from);
    const b = pos(to);
    const [x1, y1, x2, y2] =
      layout === 'h'
        ? [a.x + a.w, a.y + nodeH / 2, b.x, b.y + nodeH / 2]
        : [a.x + a.w / 2, a.y + nodeH, b.x + b.w / 2, b.y];
    const d =
      layout === 'h'
        ? `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`
        : `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`;
    const on = lit.includes(from) && lit.includes(to) && isNextInPath(from, to);
    return { key: `${from}-${to}`, d, x1, y1, x2, y2, on, color: on ? GOLD : EDGE_IDLE, width: on ? 2.5 : 1.5 };
  });

  const nodes = Object.entries(FLOW_NODES).map(([id, n]) => {
    const on = lit.includes(id);
    const isCurrent = id === current;
    return {
      ...n,
      ...pos(id),
      id,
      h: nodeH,
      border: isCurrent ? GOLD : on ? 'rgba(220,210,145,.7)' : 'rgba(255,255,255,.9)',
      glow: isCurrent
        ? `0 0 0 4px rgba(220,210,145,.35), 0 18px 36px -16px rgba(0,0,0,.55)`
        : '0 10px 24px -16px rgba(0,0,0,.5)',
      opacity: on || step === 0 ? 1 : 0.55,
    };
  });

  return { edges, nodes };
}
