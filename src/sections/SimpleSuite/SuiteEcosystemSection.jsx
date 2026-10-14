import { useEffect, useRef } from 'react';
import { SITE } from '@/config/site';
import { FONT_MONO } from '@/styles/tokens';

// Ecosistema de SimpleSuite: tres círculos superpuestos (canales → integraciones → servicios externos) con el
// núcleo de SimpleSuite en el centro. Mismo estilo ilustrado que la Home (contorno de tinta, sombras duras,
// colores planos). Animación: los círculos entran con rebote, las integraciones giran alrededor del núcleo,
// canales y servicios flotan, y los datos viajan de los canales al núcleo y del núcleo a los servicios.
// En desktop los círculos van en fila; en tablet y celular, apilados. Con prefers-reduced-motion queda quieta.
const INK = '#04081c';
const CREAM = '#F9F6EE';
const BLUE = '#00249C';
const GOLD = '#DCD291';
const LILAC_SOFT = '#e6ddff'; // canales: el mismo lila, más suave
const GREY = '#d9dbe3';
const LILAC = '#d4c2ff'; // el lila del estilo ilustrado (ver Home/hero/panel.jsx)

const CHANNELS = ['sms', 'web', 'whatsapp', 'messenger', 'instagram'];
const INTEGRATIONS = ['Jira', 'Zendesk', 'Help Scout', 'Sistarbanc', 'Mercado Pago', 'Salesforce', 'WordPress', '3CX'];
const SERVICES = ['AWS', 'Nuance', 'IBM Watson', 'ID R&D', 'Google Cloud', 'Microsoft Azure'];

// Bloques de texto arriba de la animación. `color` = color del filete y del rótulo (el del círculo que describen).
const HIGHLIGHTS = [
  {
    kicker: 'INTEGRACIONES',
    title: 'Que se adaptan a tu empresa',
    text: 'SimpleBots se conecta con las tecnologías existentes en tu empresa, para que tu negocio y procesos funcionen de forma unificada.',
    color: LILAC,
  },
  {
    kicker: 'INTELIGENCIA ARTIFICIAL',
    title: 'A tu servicio',
    text: 'SimpleBots trabaja con IA para analizar grandes cantidades de datos, comprender y clasificar intenciones o sentimientos, generar reportes avanzados, realizar predicciones o sugerencias. Es posible conectar servicios externos de los motores más potentes.',
    color: GOLD,
  },
];

const polar = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];

// Dos diagramas:
// - fila (desktop): los tres círculos superpuestos y unidos por los flujos de datos. Los canales van en arco sobre
//   el lado libre de su círculo y los servicios, en una columna sobre el suyo.
// - columna (tablet y celular): tres bloques separados, uno debajo del otro, sin superponerse ni unirse.
//   Los canales van en ronda dentro de su círculo y los servicios, en dos columnas.
const LAYOUTS = {
  row: {
    vb: [1000, 600],
    left: { cx: 230, cy: 285, r: 170 },
    center: { cx: 500, cy: 275, r: 230 },
    right: { cx: 770, cy: 285, r: 170 },
    flows: true,
    channels: (c) => CHANNELS.map((_, i) => polar(c.cx, c.cy, c.r * 0.58, 115 + 32.5 * i)),
    services: (c) => SERVICES.map((_, i) => [c.cx + 48, c.cy - 115 + i * 46]),
    serviceSize: 15,
    labels: { left: [230, 500], center: [500, 560], right: [770, 500] },
  },
  column: {
    vb: [600, 1490],
    left: { cx: 300, cy: 190, r: 170 },
    center: { cx: 300, cy: 710, r: 230 },
    right: { cx: 300, cy: 1230, r: 170 },
    flows: false,
    channels: (c) => CHANNELS.map((_, i) => polar(c.cx, c.cy, c.r * 0.55, -90 + (360 / CHANNELS.length) * i)),
    services: (c) => SERVICES.map((_, i) => [c.cx + (i % 2 ? 80 : -80), c.cy - 46 + Math.floor(i / 2) * 46]),
    serviceSize: 13,
    labels: { left: [300, 410], center: [300, 990], right: [300, 1450] },
  },
};
const pillWidth = (text, size) => text.length * size * 0.59 + 28;

const CSS = `
.st-eco-pop { transform-box: fill-box; transform-origin: center; }
.st-eco[data-armed]:not([data-in]) .st-eco-pop { transform: scale(0); opacity: 0; }
.st-eco[data-in] .st-eco-pop {
  transition: transform .8s cubic-bezier(.34,1.56,.64,1) var(--d, 0s), opacity .3s ease var(--d, 0s);
}
.st-eco-spin { animation: st-eco-spin var(--dur) linear infinite; }
.st-eco-rev { animation-direction: reverse; }
@keyframes st-eco-spin { to { transform: rotate(360deg); } }
.st-eco-flow { stroke-dasharray: 2 9; animation: st-eco-flow 1s linear infinite; }
@keyframes st-eco-flow { to { stroke-dashoffset: -11; } }
.st-eco-bob { animation: st-eco-bob 3.2s ease-in-out infinite; }
@keyframes st-eco-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -6px; } }
.st-eco-diagram-column { display: none; }
@media (max-width: 1079.98px) {
  .st-eco-diagram-row { display: none; }
  .st-eco-diagram-column { display: block; }
}
/* Hover (desktop con mouse): el grupo bajo el mouse (círculo, sus ítems y su rótulo) se destaca, el resto se
   atenúa y sus flujos se pintan dorados; cada ítem salta al pasarle el mouse; sobre integraciones o el núcleo,
   el giro se pausa para poder leerlas. data-g = grupos a los que pertenece cada elemento; data-hit = activa el hover. */
@media (hover: hover) and (min-width: 1080px) {
  .st-eco-diagram-row [data-g] { transition: opacity .35s ease, transform .4s cubic-bezier(.34,1.56,.64,1); }
  .st-eco-diagram-row line[data-g] { transition: opacity .35s ease, stroke .35s ease, stroke-width .35s ease; }
  .st-eco-diagram-row .st-eco-disc, .st-eco-diagram-row .st-eco-item, .st-eco-diagram-row .st-eco-core {
    transform-box: fill-box; transform-origin: center;
  }
  .st-eco-diagram-row .st-eco-item:hover { transform: scale(1.15) rotate(-3deg); }
  .st-eco-diagram-row .st-eco-core:hover { transform: scale(1.06); }
  .st-eco-diagram-row:has([data-g~="center"][data-hit]:hover) .st-eco-spin { animation-play-state: paused; }
  .st-eco-diagram-row:has([data-g~="left"][data-hit]:hover) [data-g]:not([data-g~="left"]):not([data-g~="core"]) { opacity: .3; }
  .st-eco-diagram-row:has([data-g~="left"][data-hit]:hover) .st-eco-disc[data-g~="left"] { transform: scale(1.03); }
  .st-eco-diagram-row:has([data-g~="left"][data-hit]:hover) line[data-g~="left"] { stroke: ${GOLD}; stroke-width: 3.5; }
  .st-eco-diagram-row:has([data-g~="center"][data-hit]:hover) [data-g]:not([data-g~="center"]):not([data-g~="core"]) { opacity: .3; }
  .st-eco-diagram-row:has([data-g~="center"][data-hit]:hover) .st-eco-disc[data-g~="center"] { transform: scale(1.03); }
  .st-eco-diagram-row:has([data-g~="center"][data-hit]:hover) line[data-g~="center"] { stroke: ${GOLD}; stroke-width: 3.5; }
  .st-eco-diagram-row:has([data-g~="right"][data-hit]:hover) [data-g]:not([data-g~="right"]):not([data-g~="core"]) { opacity: .3; }
  .st-eco-diagram-row:has([data-g~="right"][data-hit]:hover) .st-eco-disc[data-g~="right"] { transform: scale(1.03); }
  .st-eco-diagram-row:has([data-g~="right"][data-hit]:hover) line[data-g~="right"] { stroke: ${GOLD}; stroke-width: 3.5; }
}
@media (prefers-reduced-motion: reduce) { .st-eco * { animation: none !important; transition: none !important; } }
`;

/** Íconos de canales (24 × 24, en tinta). */
function ChannelIcon({ name }) {
  const p = { fill: 'none', stroke: INK, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'sms':
      return (
        <g {...p}>
          <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
          <path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.6" />
        </g>
      );
    case 'web':
      return (
        <g {...p}>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </g>
      );
    case 'whatsapp':
      return (
        <g {...p}>
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
          <path
            d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1-.4-2-1.4-2.4-2.4l.9-1-1-2z"
            fill={INK}
            strokeWidth="1"
          />
        </g>
      );
    case 'messenger':
      return (
        <g {...p}>
          <path d="M12 3c-5 0-9 3.7-9 8.4 0 2.6 1.3 4.9 3.3 6.4V21l3-1.6c.9.2 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z" />
          <path d="M7.5 13.5l3-3.2 2.4 2 3.6-3.8" />
        </g>
      );
    default: // instagram
      return (
        <g {...p}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r=".6" fill={INK} />
        </g>
      );
  }
}

/** Etiqueta tipo sticker (rectángulo con sombra dura) centrada en (x, y). */
function Pill({ x, y, text, fill = CREAM, size = 15 }) {
  const w = pillWidth(text, size);
  const h = 32;
  return (
    <g>
      <rect x={x - w / 2 + 3} y={y - h / 2 + 3} width={w} height={h} rx="10" fill={INK} />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="10" fill={fill} stroke={INK} strokeWidth="2" />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill={INK}
        fontSize={size}
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        {text}
      </text>
    </g>
  );
}

/** Rótulo de cada círculo (sticker azul, apenas torcido). */
function Label({ x, y, text, tilt }) {
  const w = text.length * 11 + 36;
  return (
    <g transform={`rotate(${tilt} ${x} ${y})`}>
      <rect x={x - w / 2 + 4} y={y - 20 + 4} width={w} height="40" rx="20" fill={INK} />
      <rect x={x - w / 2} y={y - 20} width={w} height="40" rx="20" fill={BLUE} stroke={INK} strokeWidth="2" />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill={CREAM}
        fontSize="18"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        {text}
      </text>
    </g>
  );
}

/** Círculo con sombra dura. `d` = demora de la entrada con rebote; `g` = grupo para el hover. */
function Disc({ c, fill, d, g, children }) {
  return (
    <g className="st-eco-pop" style={{ '--d': d }}>
      <g className="st-eco-disc" data-g={g} data-hit="">
        <circle cx={c.cx + 9} cy={c.cy + 9} r={c.r} fill={BLUE} />
        <circle cx={c.cx} cy={c.cy} r={c.r} fill={fill} stroke={INK} strokeWidth="3" />
        {children}
      </g>
    </g>
  );
}

/** Ítem que salta con el hover y pertenece al grupo `g`. */
const Item = ({ g, children }) => (
  <g className="st-eco-item" data-g={g} data-hit="">
    {children}
  </g>
);

function Diagram({ layout, className }) {
  const { vb, left, center, right, labels, serviceSize } = layout;
  const channels = layout.channels(left);
  const services = layout.services(right);
  const ringR = center.r * 0.72;
  const core = center;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${vb[0]} ${vb[1]}`}
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Círculos laterales primero: en la fila, el del centro va encima, como en el diagrama original */}
      <Disc c={left} fill={LILAC_SOFT} d="0s" g="left" />
      <Disc c={right} fill={GREY} d=".3s" g="right" />
      <Disc c={center} fill={CREAM} d=".15s" g="center">
        <circle
          className="st-eco-spin"
          style={{ '--dur': '80s', transformOrigin: `${core.cx}px ${core.cy}px` }}
          cx={core.cx}
          cy={core.cy}
          r={ringR}
          fill="none"
          stroke={INK}
          strokeOpacity=".3"
          strokeWidth="1.5"
          strokeDasharray="1 10"
          strokeLinecap="round"
        />
      </Disc>

      {/* Flujos (solo en la fila): de cada canal al núcleo y del núcleo a cada servicio */}
      {layout.flows && (
        <g className="st-eco-pop" style={{ '--d': '.5s' }}>
          {channels.map(([x, y], i) => (
            <line
              key={`c${i}`}
              className="st-eco-flow"
              data-g="left center"
              x1={x}
              y1={y}
              x2={core.cx}
              y2={core.cy}
              stroke={INK}
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: `${-i * 0.25}s` }}
            />
          ))}
          {services.map(([x, y], i) => (
            <line
              key={`s${i}`}
              className="st-eco-flow"
              data-g="right center"
              x1={core.cx}
              y1={core.cy}
              x2={x}
              y2={y}
              stroke={INK}
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: `${-i * 0.25}s` }}
            />
          ))}
        </g>
      )}

      {/* Integraciones girando alrededor del núcleo (cada etiqueta se mantiene derecha) */}
      <g className="st-eco-spin" style={{ '--dur': '70s', transformOrigin: `${core.cx}px ${core.cy}px` }}>
        {INTEGRATIONS.map((name, i) => {
          const [x, y] = polar(core.cx, core.cy, ringR, (360 / INTEGRATIONS.length) * i - 90);
          return (
            <g key={name} className="st-eco-pop" style={{ '--d': `${0.45 + i * 0.06}s` }}>
              <g
                className="st-eco-spin st-eco-rev"
                style={{ '--dur': '70s', transformBox: 'view-box', transformOrigin: `${x}px ${y}px` }}
              >
                <Item g="center">
                  <Pill x={x} y={y} text={name} fill="#fff" size={14} />
                </Item>
              </g>
            </g>
          );
        })}
      </g>

      {/* Núcleo */}
      <g className="st-eco-pop" style={{ '--d': '.3s' }}>
        <g className="st-eco-core" data-g="core center" data-hit="">
          <circle cx={core.cx + 6} cy={core.cy + 6} r="86" fill={INK} />
          <circle cx={core.cx} cy={core.cy} r="86" fill={BLUE} stroke={INK} strokeWidth="3" />
          <text
            x={core.cx}
            y={core.cy - 4}
            textAnchor="middle"
            dominantBaseline="central"
            fill={CREAM}
            fontSize="26"
            fontWeight="800"
            letterSpacing="-1"
            fontFamily="Inter, sans-serif"
          >
            simplesuite
          </text>
        </g>
      </g>

      {/* Canales */}
      {CHANNELS.map((name, i) => {
        const [x, y] = channels[i];
        return (
          <g key={name} className="st-eco-pop" style={{ '--d': `${0.2 + i * 0.07}s` }}>
            <g className="st-eco-bob" style={{ animationDelay: `${-i * 0.6}s` }}>
              <Item g="left">
                <circle cx={x + 3} cy={y + 3} r="25" fill={INK} />
                <circle cx={x} cy={y} r="25" fill={CREAM} stroke={INK} strokeWidth="2.5" />
                <g transform={`translate(${x - 12} ${y - 12})`}>
                  <ChannelIcon name={name} />
                </g>
              </Item>
            </g>
          </g>
        );
      })}

      {/* Servicios externos */}
      {SERVICES.map((name, i) => {
        const [x, y] = services[i];
        return (
          <g key={name} className="st-eco-pop" style={{ '--d': `${0.5 + i * 0.07}s` }}>
            <g className="st-eco-bob" style={{ animationDelay: `${-i * 0.5}s` }}>
              <Item g="right">
                <Pill x={x} y={y} text={name} size={serviceSize} />
              </Item>
            </g>
          </g>
        );
      })}

      {/* Rótulos */}
      <g className="st-eco-pop" style={{ '--d': '.7s' }}>
        <Item g="left">
          <Label x={labels.left[0]} y={labels.left[1]} text="Canales" tilt={-3} />
        </Item>
      </g>
      <g className="st-eco-pop" style={{ '--d': '.8s' }}>
        <Item g="center">
          <Label x={labels.center[0]} y={labels.center[1]} text="Integraciones" tilt={2} />
        </Item>
      </g>
      <g className="st-eco-pop" style={{ '--d': '.9s' }}>
        <Item g="right">
          <Label x={labels.right[0]} y={labels.right[1]} text="Servicios externos" tilt={-2} />
        </Item>
      </g>
    </svg>
  );
}

export default function SuiteEcosystemSection() {
  const ref = useRef(null);

  // Entrada con rebote al aparecer en pantalla. Sin JS (o con movimiento reducido) el diagrama se ve directo.
  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !SITE.features.motion || reduced || !('IntersectionObserver' in window)) return undefined;
    el.setAttribute('data-armed', '');
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.setAttribute('data-in', '');
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      style={{
        background: '#04081c',
        color: CREAM,
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
        overflow: 'hidden',
      }}
    >
      <style>{CSS}</style>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '760px' }}>
          <span
            data-reveal="1"
            style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em', color: '#b2dcff' }}
          >
            CONECTIVIDAD
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(36px,4.6vw,64px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-.045em',
              textWrap: 'balance',
            }}
          >
            Todo conectado en un mismo lugar.
          </h2>
          <p
            data-reveal="3"
            style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: '#DADAE4', fontWeight: 300 }}
          >
            Tus canales, las herramientas que ya usás y los servicios de IA y nube trabajan juntos alrededor de
            SimpleSuite.
          </p>
        </div>
        {/* Integraciones e IA: dos bloques arriba de la animación (uno debajo del otro en pantallas angostas) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: 'clamp(28px,4vw,56px)',
          }}
        >
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.kicker}
              data-reveal={String(i + 2)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                paddingTop: '22px',
                borderTop: `2px solid ${h.color}`,
              }}
            >
              <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.2em', color: h.color }}>
                {h.kicker}
              </span>
              <span style={{ fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 800, letterSpacing: '-.03em' }}>
                {h.title}
              </span>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.65, color: '#DADAE4', fontWeight: 300 }}>
                {h.text}
              </p>
            </div>
          ))}
        </div>
        <div ref={ref} className="st-eco" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <Diagram layout={LAYOUTS.row} className="st-eco-diagram-row" />
          <Diagram layout={LAYOUTS.column} className="st-eco-diagram-column" />
        </div>
      </div>
    </section>
  );
}
