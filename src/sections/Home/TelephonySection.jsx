import { useEffect, useState } from 'react';
import SmartLink from '@/components/common/SmartLink';
import { useInterval } from '@/hooks/useInterval';
import { SITE } from '@/config/site';
import { numberLocale } from '@/i18n';
import { FONT_MONO } from '@/styles/tokens';

// Escena ilustrada "central de voz en vivo": un núcleo que late con la onda de voz, órbitas con teléfonos, agentes,
// bots y servidores (las llamadas viajan por las líneas), notificaciones de llamadas que van entrando y contadores.
// Estilo ilustración: colores planos, contorno de tinta y sombras duras (sin brillos ni desenfoques).
// Decorativo y de muestra: el contenido real de la sección está a la izquierda. Con prefers-reduced-motion queda quieta.
const INK = '#04081c';
const CREAM = '#F9F6EE';
const BLUE = '#00249C';
const GOLD = '#DCD291';
const SKY = '#b2dcff';
const MINT = '#7fd9ae';
const RED = '#ff6b5b';

const NOTIFY_MS = 2400;
const CALL_EVENTS = [
  { icon: 'phone', bg: MINT, t: 'Llamada entrante', meta: '+598 9•• ••• 214' },
  { icon: 'bot', bg: SKY, t: 'VoiceBot resolvió la consulta', meta: '00:42' },
  { icon: 'headset', bg: GOLD, t: 'Transferida a un agente · Ventas', meta: '00:09' },
  { icon: 'phone', bg: MINT, t: 'Llamada entrante', meta: '+54 11 •••• 0387' },
  { icon: 'bot', bg: SKY, t: 'Llamada transcrita y analizada con IA', meta: '01:57' },
  { icon: 'headset', bg: GOLD, t: 'Encuesta post-llamada completada', meta: '5/5' },
];

// Nodos en órbita: [ángulo inicial (grados), ícono, color]. Interna = quienes llaman; externa = agentes, bots y red.
const INNER = [
  [10, 'phone', MINT],
  [130, 'phone', MINT],
  [250, 'phone', MINT],
];
const OUTER = [
  [55, 'headset', GOLD],
  [145, 'bot', SKY],
  [235, 'headset', GOLD],
  [325, 'server', CREAM],
];
const C = 200; // centro del viewBox (400 × 400)
const polar = (r, deg) => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)];

const CSS = `
.st-vx-spin { transform-origin: ${C}px ${C}px; animation: st-vx-spin var(--dur) linear infinite; }
.st-vx-rev { animation-direction: reverse; }
@keyframes st-vx-spin { to { transform: rotate(360deg); } }
/* Cada nodo gira al revés que su órbita, sobre su propio centro: el ícono y su sombra quedan siempre derechos */
.st-vx-upright { transform-box: view-box; animation: st-vx-spin var(--dur) linear infinite; }
.st-vx-upright.st-vx-rev { animation-direction: reverse; }
.st-vx-flow { stroke-dasharray: 2 8; animation: st-vx-flow 1s linear infinite; }
.st-vx-flow-out { animation-direction: reverse; }
@keyframes st-vx-flow { to { stroke-dashoffset: -10; } }
.st-vx-ripple { transform-origin: ${C}px ${C}px; animation: st-vx-ripple 3s ease-out infinite; }
@keyframes st-vx-ripple { from { transform: scale(1); opacity: .9; } to { transform: scale(2.1); opacity: 0; } }
.st-vx-bar { transform-box: fill-box; transform-origin: center; animation: st-vx-bar .9s ease-in-out infinite alternate; }
@keyframes st-vx-bar { from { transform: scaleY(.25); } to { transform: scaleY(1); } }
.st-vx-note { animation: st-vx-note .55s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes st-vx-note { from { opacity: 0; transform: translateY(18px) rotate(var(--tilt)) scale(.9); } to { opacity: 1; transform: rotate(var(--tilt)); } }
.st-vx-live { width: 7px; height: 7px; border-radius: 50%; background: ${CREAM}; animation: st-vx-blink 1.2s steps(1) infinite; }
@keyframes st-vx-blink { 50% { opacity: .2; } }
@media (prefers-reduced-motion: reduce) { .st-vx * { animation: none !important; } }
`;

/** Íconos dibujados (24 × 24, en tinta). */
function Icon({ name }) {
  const stroke = { fill: 'none', stroke: INK, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'phone':
      return (
        <path
          fill={INK}
          d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
        />
      );
    case 'headset':
      return (
        <g {...stroke}>
          <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
          <path d="M4 14h3v6H5a1 1 0 0 1-1-1z" fill={INK} />
          <path d="M20 14h-3v6h2a1 1 0 0 0 1-1z" fill={INK} />
          <path d="M18 20c0 1.5-1.5 2-3.5 2H12" />
        </g>
      );
    case 'bot':
      return (
        <g {...stroke}>
          <rect x="3.5" y="8" width="17" height="12" rx="4" />
          <path d="M12 8V4.5" />
          <circle cx="12" cy="3.5" r="1.2" fill={INK} />
          <circle cx="9" cy="13.5" r="1.3" fill={INK} stroke="none" />
          <circle cx="15" cy="13.5" r="1.3" fill={INK} stroke="none" />
          <path d="M9.5 17h5" />
        </g>
      );
    default: // server
      return (
        <g {...stroke}>
          <rect x="3.5" y="4" width="17" height="7" rx="2" />
          <rect x="3.5" y="13" width="17" height="7" rx="2" />
          <circle cx="7.5" cy="7.5" r="1" fill={INK} stroke="none" />
          <circle cx="7.5" cy="16.5" r="1" fill={INK} stroke="none" />
          <path d="M12 7.5h5M12 16.5h5" />
        </g>
      );
  }
}

/** Una órbita: líneas por donde viajan las llamadas y los nodos (que se mantienen derechos al girar). */
function Orbit({ nodes, r, dur, reverse }) {
  return (
    <g className={`st-vx-spin${reverse ? ' st-vx-rev' : ''}`} style={{ '--dur': dur }}>
      {nodes.map(([deg], i) => {
        const [x, y] = polar(r, deg);
        return (
          <line
            key={i}
            className={`st-vx-flow${reverse ? ' st-vx-flow-out' : ''}`}
            x1={x}
            y1={y}
            x2={C}
            y2={C}
            stroke={INK}
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: `${-i * 0.3}s` }}
          />
        );
      })}
      {nodes.map(([deg, icon, color], i) => {
        const [x, y] = polar(r, deg);
        return (
          <g
            key={i}
            className={`st-vx-upright${reverse ? '' : ' st-vx-rev'}`}
            style={{ '--dur': dur, transformOrigin: `${x}px ${y}px` }}
          >
            <circle cx={x + 3} cy={y + 3} r="23" fill={INK} />
            <circle cx={x} cy={y} r="23" fill={color} stroke={INK} strokeWidth="2.5" />
            <g transform={`translate(${x - 12} ${y - 12})`}>
              <Icon name={icon} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Núcleo + órbitas en SVG. */
function VoiceOrbit() {
  return (
    <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
      {/* Fondo: disco crema con contorno y sombra dura, como una lámina */}
      <circle cx={C + 7} cy={C + 7} r="178" fill={BLUE} />
      <circle cx={C} cy={C} r="178" fill={CREAM} stroke={INK} strokeWidth="2.5" />
      <circle cx={C} cy={C} r="96" fill="none" stroke={INK} strokeOpacity=".18" strokeWidth="1.5" />
      <circle
        className="st-vx-spin"
        style={{ '--dur': '60s' }}
        cx={C}
        cy={C}
        r="132"
        fill="none"
        stroke={INK}
        strokeOpacity=".35"
        strokeWidth="1.5"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      {/* Detalles sueltos de ilustración */}
      {[
        [72, 92],
        [330, 300],
        [306, 66],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x - 6} ${y}h12M${x} ${y - 6}v12`}
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".5"
        />
      ))}
      {/* Ondas que salen del núcleo */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="st-vx-ripple"
          style={{ animationDelay: `${-i}s` }}
          cx={C}
          cy={C}
          r="56"
          fill="none"
          stroke={INK}
          strokeWidth="1.5"
        />
      ))}
      {/* Llamadas que entran (órbita interna) y que salen hacia agentes, bots y red (externa) */}
      <Orbit nodes={INNER} r={132} dur="45s" />
      <Orbit nodes={OUTER} r={172} dur="70s" reverse />
      {/* Núcleo con la onda de voz */}
      <circle cx={C + 5} cy={C + 5} r="56" fill={INK} />
      <circle cx={C} cy={C} r="56" fill={BLUE} stroke={INK} strokeWidth="3" />
      {Array.from({ length: 7 }, (_, i) => {
        const h = [16, 30, 44, 54, 44, 30, 16][i];
        return (
          <rect
            key={i}
            className="st-vx-bar"
            x={C - 33 + i * 10}
            y={C - h / 2}
            width="6"
            height={h}
            rx="3"
            fill={i === 3 ? GOLD : CREAM}
            style={{ animationDuration: `${0.55 + ((i * 37) % 5) / 10}s`, animationDelay: `${-((i * 53) % 10) / 10}s` }}
          />
        );
      })}
    </svg>
  );
}

/** Notificaciones de llamadas que van entrando, como stickers (se ven las últimas 2, abajo a la derecha). */
function CallFeed({ running }) {
  const [n, setN] = useState(1);
  useInterval(() => setN((v) => v + 1), running ? NOTIFY_MS : null);
  const visible = [n - 1, n].filter((k) => k >= 0);
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '-2%',
        bottom: '-4%',
        width: 'min(290px, 72%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {visible.map((k) => {
        const e = CALL_EVENTS[k % CALL_EVENTS.length];
        return (
          <div
            key={k}
            className="st-vx-note"
            style={{
              '--tilt': k % 2 ? '1.5deg' : '-1.5deg',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '14px',
              background: CREAM,
              color: INK,
              border: `2px solid ${INK}`,
              boxShadow: `4px 4px 0 ${INK}`,
            }}
          >
            <span
              style={{
                flex: '0 0 auto',
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                display: 'grid',
                placeItems: 'center',
                background: e.bg,
                border: `2px solid ${INK}`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <Icon name={e.icon} />
              </svg>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
              <span style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.3 }}>{e.t}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.06em', color: '#4a4f66' }}>
                {e.meta}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Contadores "en vivo" como stickers: llamadas del día que suben, % resuelto por IA y espera promedio. */
function LiveStats({ running }) {
  const [calls, setCalls] = useState(1284);
  const [ai, setAi] = useState(68);
  const [wait, setWait] = useState(9);
  useInterval(
    () => {
      setCalls((c) => c + 1 + Math.floor(Math.random() * 3));
      setAi((v) => Math.min(72, Math.max(64, v + Math.round(Math.random() * 2 - 1))));
      setWait((v) => Math.min(12, Math.max(7, v + Math.round(Math.random() * 2 - 1))));
    },
    running ? 1800 : null,
  );
  const stats = [
    ['LLAMADAS HOY', calls.toLocaleString(numberLocale()), GOLD],
    ['RESUELTAS POR IA', `${ai}%`, SKY],
    ['ESPERA PROMEDIO', `0:${String(wait).padStart(2, '0')}`, CREAM],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '14px' }}>
      {stats.map(([label, value, bg]) => (
        <div
          key={label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '14px 16px',
            borderRadius: '16px',
            background: bg,
            color: INK,
            border: `2px solid ${INK}`,
            boxShadow: `4px 4px 0 ${BLUE}`,
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.1em' }}>{label}</span>
          <span
            style={{
              fontSize: 'clamp(22px,2.2vw,30px)',
              fontWeight: 800,
              letterSpacing: '-.03em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TelephonySection() {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(SITE.features.motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        background: '#04081c',
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
        overflow: 'hidden',
      }}
    >
      <style>{CSS}</style>
      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))',
          gap: '56px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span
            data-reveal="1"
            style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              letterSpacing: '.24em',
              color: '#b2dcff',
            }}
          >
            TELEFONÍA · SIMPLEVOICE
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(40px,5.4vw,80px)',
              lineHeight: 0.96,
              fontWeight: 800,
              letterSpacing: '-.045em',
              textWrap: 'balance',
            }}
          >
            La voz también es un canal digital.
          </h2>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: 1.65,
              color: '#DADAE4',
              fontWeight: 300,
              maxWidth: '520px',
            }}
          >
            Con SimpleVoice unificamos telefonía IP, contact center en la nube y VoiceBots con IA en el mismo ecosistema
            que tus canales de mensajería. Y te acompañamos a definir qué conviene automatizar y qué debe seguir en
            manos de tu equipo.
          </p>
          <div data-reveal="4" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <SmartLink
              className="hv-bg-gold hv-c-blue"
              href="/simplesuite/simplevoice"
              style={{
                padding: '16px 24px',
                borderRadius: '999px',
                background: '#F9F6EE',
                color: '#00249C',
                fontWeight: 600,
                fontSize: '15px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                transition: 'all .3s',
              }}
            >
              Conocé SimpleVoice <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
        <div className="st-vx" data-reveal="2" style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto', aspectRatio: '1' }}>
            <span
              style={{
                position: 'absolute',
                left: '2%',
                top: '2%',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '999px',
                background: RED,
                color: CREAM,
                border: `2px solid ${INK}`,
                boxShadow: `3px 3px 0 ${INK}`,
                rotate: '-6deg',
                fontFamily: FONT_MONO,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '.16em',
              }}
            >
              <span className="st-vx-live"></span>
              EN VIVO
            </span>
            <VoiceOrbit />
            <CallFeed running={running} />
          </div>
          <LiveStats running={running} />
        </div>
      </div>
    </section>
  );
}
