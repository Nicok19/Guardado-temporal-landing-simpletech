import SmartLink from '@/components/common/SmartLink';
import { ECOSISTEMA_PIECES, ECOSISTEMA_PRINCIPLES } from '@/data/ecosistema';
import { navSubpage } from '@/data/navigation';
import { FONT_MONO } from '@/styles/tokens';

const H2 = {
  margin: 0,
  fontSize: 'clamp(34px,4vw,56px)',
  fontWeight: 800,
  letterSpacing: '-.04em',
  lineHeight: 1,
  textWrap: 'balance',
};

// Diagrama: SimpleSuite al centro, las tres piezas alrededor y lo que cada una suma por fuera.
const CENTER = { x: 280, y: 280 };
const NODES = [
  {
    label: 'Partners',
    href: '/ecosistema/partners',
    x: 280,
    y: 115,
    sats: [
      { label: 'Meta', x: 170, y: 72 },
      { label: 'AWS', x: 390, y: 72 },
    ],
  },
  {
    label: 'API',
    href: '/ecosistema/api',
    x: 423,
    y: 362,
    sats: [
      { label: 'CRM · ERP', x: 510, y: 300 },
      { label: 'WhatsApp', x: 404, y: 479 },
    ],
  },
  {
    label: 'IA',
    href: '/ecosistema/ia-conversacional',
    x: 137,
    y: 362,
    sats: [
      { label: 'Voz', x: 50, y: 300 },
      { label: 'Biometría', x: 156, y: 479 },
    ],
  },
];

function EcosystemDiagram() {
  return (
    <svg
      viewBox="0 0 560 540"
      role="img"
      aria-label="SimpleSuite al centro, conectado con partners, API e IA"
      style={{ width: '100%', height: 'auto' }}
    >
      <style>{`
        .eco-flow { stroke-dasharray: 4 6; animation: eco-dash 1.6s linear infinite; }
        @keyframes eco-dash { to { stroke-dashoffset: -20; } }
        @media (prefers-reduced-motion: reduce) { .eco-flow { animation: none; } }
        .eco-node circle { transition: fill .3s; }
        .eco-node:hover circle { fill: #DCD291; }
      `}</style>
      <circle cx={CENTER.x} cy={CENTER.y} r="165" fill="none" stroke="#DADAE4" />
      {NODES.map((n) => (
        <g key={n.label}>
          <line x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} stroke="#00249C" strokeWidth="1.5" className="eco-flow" />
          {n.sats.map((s) => (
            <g key={s.label}>
              <line x1={n.x} y1={n.y} x2={s.x} y2={s.y} stroke="#8fa0d8" strokeDasharray="2 4" />
              <circle cx={s.x} cy={s.y} r="5" fill="#1e4bd8" />
              <text x={s.x} y={s.y + 24} textAnchor="middle" fontFamily={FONT_MONO} fontSize="13" fill="#636262">
                {s.label}
              </text>
            </g>
          ))}
        </g>
      ))}
      <circle cx={CENTER.x} cy={CENTER.y} r="78" fill="#00249C" />
      <text x={CENTER.x} y={CENTER.y + 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="#F9F6EE">
        SimpleSuite
      </text>
      {NODES.map((n) => (
        <a key={n.label} href={n.href} className="eco-node">
          <circle cx={n.x} cy={n.y} r="52" fill="#fff" stroke="#00249C" strokeWidth="1.5" />
          <text x={n.x} y={n.y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="#00249C">
            {n.label}
          </text>
        </a>
      ))}
    </svg>
  );
}

/**
 * Página /ecosistema: por qué armamos un ecosistema (texto y diagrama), los principios que lo guían,
 * el papel de cada pieza y una invitación a sumarse. Va debajo de PageHero (mismo fondo).
 */
export default function ManifestoSection() {
  return (
    <>
      <section style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(88px,10vw,140px)' }}>
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
              POR QUÉ UN ECOSISTEMA
            </span>
            <h2 style={H2}>Ninguna solución resuelve todo sola.</h2>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: '#636262', maxWidth: '540px' }}>
              Las conversaciones con tus clientes atraviesan canales, sistemas y equipos. Por eso no construimos una
              herramienta cerrada: construimos un lugar donde la tecnología, los socios y la inteligencia artificial se
              conectan alrededor de SimpleSuite.
            </p>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: '#636262', maxWidth: '540px' }}>
              Cada pieza que se suma hace más fuerte al conjunto, y cada cliente se beneficia de todo lo que el
              ecosistema ya sabe hacer.
            </p>
          </div>
          <div data-reveal="2" style={{ maxWidth: '560px', width: '100%', justifySelf: 'center' }}>
            <EcosystemDiagram />
          </div>
        </div>
      </section>

      <section
        style={{
          background: 'linear-gradient(90deg,#274295 0%,#0e1740 45%,#000 100%)',
          color: '#fff',
          padding: 'clamp(88px,10vw,140px) var(--page-x)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#DCD291' }}>
              LO QUE NOS GUÍA
            </span>
            <h2 style={H2}>Tres ideas detrás de cada conexión.</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: '40px',
            }}
          >
            {ECOSISTEMA_PRINCIPLES.map((p, i) => (
              <div
                key={p.t}
                data-reveal={i + 1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(178,220,255,.3)',
                }}
              >
                <span style={{ fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 700, letterSpacing: '-.03em' }}>
                  {p.t}
                </span>
                <span style={{ fontSize: '16px', lineHeight: 1.6, color: '#DADAE4' }}>{p.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
              LAS PIEZAS
            </span>
            <h2 style={H2}>Cada una suma algo distinto.</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: '12px',
            }}
          >
            {ECOSISTEMA_PIECES.map((p, i) => (
              <SmartLink
                key={p.href}
                className="hv-lift-4 hv-bd-blue"
                data-reveal={i + 1}
                href={p.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '28px',
                  borderRadius: '24px',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                  minHeight: '200px',
                  transition: 'all .4s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.14em', color: '#636262' }}>
                  {navSubpage('ecosistema', p.href).label.toUpperCase()}
                </span>
                <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-.025em', lineHeight: 1.15 }}>
                  {p.role}
                </span>
                <span style={{ marginTop: 'auto', fontFamily: FONT_MONO, fontSize: '16px' }}>→</span>
              </SmartLink>
            ))}
          </div>
          <div
            data-reveal="1"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              padding: '32px',
              borderRadius: '28px',
              background: '#00249C',
              color: '#fff',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '620px' }}>
              <span style={{ fontSize: 'clamp(22px,2.4vw,32px)', fontWeight: 700, letterSpacing: '-.025em' }}>
                Sumate al ecosistema.
              </span>
              <span style={{ fontSize: '15px', color: '#DADAE4', lineHeight: 1.5 }}>
                Seas cliente, partner o desarrollador, hay un lugar para vos.
              </span>
            </div>
            <SmartLink
              className="hv-bg-cream hv-c-blue"
              href="/#contacto"
              style={{
                padding: '18px 28px',
                borderRadius: '999px',
                background: '#DCD291',
                color: '#00249C',
                fontWeight: 700,
                fontSize: '15px',
                transition: 'all .3s',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              Conversemos <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}
