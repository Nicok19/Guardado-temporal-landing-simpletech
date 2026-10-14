import { useEffect, useRef, useState } from 'react';
import { FLOW_LAYOUTS, FLOW_SCENARIOS } from '@/data/pipelineFlow';
import { FONT_MONO } from '@/styles/tokens';
import { buildFlowView } from '../flowView';
import { BLUE, Card } from '../ui';

const PAD = 28; // aire alrededor del diagrama dentro del lienzo
const VERTICAL_BELOW = 640; // con menos ancho que esto, el diagrama pasa a vertical
const PAUSE_STEPS = 3; // pasos de pausa al final de cada escenario
const GOLD = '#DCD291';

/** Ancho disponible del contenedor (para elegir diseño y escala). */
function useWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

/**
 * Pipeline del "Caso Viajes" (data/pipelineFlow.js) sobre un lienzo azul de marca: cada mensaje recorre
 * router → agente → integración y los escenarios rotan. Horizontal en desktop/tablet, vertical en celular;
 * siempre escalado al ancho disponible, sin scroll. Tarjeta de ancho completo (size 'full').
 * data = { title, flowName }
 */
export default function FlowCard({ data, step, reduced, reveal }) {
  const lengths = FLOW_SCENARIOS.map((sc) => sc.path.length + PAUSE_STEPS);
  const total = lengths.reduce((a, b) => a + b, 0);
  // Escenario y paso a partir del reloj compartido del bento
  let t = reduced ? 0 : step % total;
  let index = 0;
  while (t >= lengths[index]) t -= lengths[index++];
  const scenario = FLOW_SCENARIOS[index];
  const s = reduced ? scenario.path.length : Math.min(t + 1, scenario.path.length);

  const box = useRef(null);
  const width = useWidth(box);
  const layout = width && width < VERTICAL_BELOW ? 'v' : 'h';
  const L = FLOW_LAYOUTS[layout];
  const canvasW = L.w + PAD * 2;
  const canvasH = L.h + PAD * 2;
  const scale = width ? Math.min(1, width / canvasW) : 1;
  const { nodes, edges } = buildFlowView(scenario, s, layout);

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ width: '100%', borderRadius: '20px', background: BLUE, overflow: 'hidden' }}>
        {/* Cabecera: nombre del flujo + mensaje entrante del escenario */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            padding: '14px 18px',
            borderBottom: '1px solid rgba(255,255,255,.14)',
          }}
        >
          <span
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {data.flowName}
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: '10px',
                letterSpacing: '.12em',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(40,199,111,.2)',
                color: '#7ee2a8',
              }}
            >
              EN VIVO
            </span>
          </span>
          <span
            key={index}
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              flexWrap: 'wrap',
              animation: reduced ? 'none' : 'st-fade-in .5s ease',
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.1em', color: '#b2dcff' }}>
              WHATSAPP
            </span>
            <span
              style={{
                padding: '7px 12px',
                borderRadius: '12px 12px 4px 12px',
                background: '#fff',
                color: '#04081c',
                fontSize: '13px',
              }}
            >
              {scenario.msg}
            </span>
          </span>
        </div>

        {/* Lienzo: escalado al ancho, sin scroll */}
        <div ref={box} style={{ overflow: 'hidden' }}>
          <div
            style={{
              width: `${canvasW * scale}px`,
              height: `${canvasH * scale}px`,
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: `${canvasW}px`,
                height: `${canvasH}px`,
                transform: `scale(${scale})`,
                transformOrigin: '0 0',
              }}
            >
              <svg
                viewBox={`0 0 ${canvasW} ${canvasH}`}
                style={{ position: 'absolute', inset: 0, width: `${canvasW}px`, height: `${canvasH}px` }}
                aria-hidden="true"
              >
                <defs>
                  <pattern id={`sb-flow-dots-${layout}`} width="22" height="22" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,.14)" />
                  </pattern>
                </defs>
                <rect width={canvasW} height={canvasH} fill={`url(#sb-flow-dots-${layout})`} />
                <g transform={`translate(${PAD},${PAD})`}>
                  {/* Primero las conexiones apagadas, después las del recorrido (quedan por encima) */}
                  {[...edges]
                    .sort((a, b) => a.on - b.on)
                    .map((e) => (
                      <g key={e.key}>
                        <path
                          d={e.d}
                          fill="none"
                          stroke={e.color}
                          strokeWidth={e.width}
                          style={{ transition: 'stroke .4s' }}
                        />
                        {[
                          [e.x1, e.y1],
                          [e.x2, e.y2],
                        ].map(([cx, cy], i) => (
                          <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r="4"
                            fill={BLUE}
                            stroke={e.on ? GOLD : 'rgba(255,255,255,.55)'}
                            strokeWidth="2"
                            style={{ transition: 'stroke .4s' }}
                          />
                        ))}
                      </g>
                    ))}
                </g>
              </svg>
              {nodes.map((n) => (
                <div
                  key={n.id}
                  style={{
                    position: 'absolute',
                    left: `${n.x + PAD}px`,
                    top: `${n.y + PAD}px`,
                    width: `${n.w}px`,
                    height: `${n.h}px`,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: L.compact ? '0 10px' : '0 12px',
                    borderRadius: '12px',
                    background: '#fff',
                    border: `2px solid ${n.border}`,
                    boxShadow: n.glow,
                    opacity: n.opacity,
                    transition: 'border-color .4s, box-shadow .4s, opacity .4s',
                  }}
                >
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        display: 'flex',
                        gap: '7px',
                        alignItems: 'center',
                        minWidth: 0,
                        fontSize: L.compact ? '12px' : '13px',
                        fontWeight: 700,
                        color: '#04081c',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span
                        style={{ width: '7px', height: '7px', borderRadius: '50%', background: n.dot, flex: 'none' }}
                      ></span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.t}</span>
                    </span>
                  </span>
                  {!L.compact && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#636262',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {n.d}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
