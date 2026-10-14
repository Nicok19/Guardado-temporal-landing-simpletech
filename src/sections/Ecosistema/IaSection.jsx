import CoverImage from '@/components/common/CoverImage';
import SmartLink from '@/components/common/SmartLink';
import {
  IA_AGENT_FEATURES,
  IA_HIGHLIGHTS,
  IA_INTEGRATION,
  IA_MODULES,
  IA_SPOTLIGHTS,
  IA_WHATSAPP_BENEFITS,
} from '@/data/ecosistema';
import { FONT_MONO } from '@/styles/tokens';

const DARK_BG = 'linear-gradient(90deg,#274295 0%,#0e1740 45%,#000 100%)';

const H2 = {
  margin: 0,
  fontSize: 'clamp(34px,4vw,56px)',
  fontWeight: 800,
  letterSpacing: '-.04em',
  lineHeight: 1,
  textWrap: 'balance',
};

function Kicker({ children, color = '#636262' }) {
  return <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color }}>{children}</span>;
}

/** Lista con viñeta dorada (fondos oscuros) o azul (fondos claros). */
function CheckList({ items, dark = false }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((it) => (
        <li
          key={it}
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'baseline',
            fontSize: '16px',
            lineHeight: 1.5,
            color: dark ? '#DADAE4' : '#00249C',
          }}
        >
          <span aria-hidden="true" style={{ fontFamily: FONT_MONO, color: dark ? '#DCD291' : '#1e4bd8' }}>
            →
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

/**
 * IA conversacional (/ecosistema/ia-conversacional): destacados, IA en cada módulo de SimpleSuite,
 * integración con sistemas, funcionalidades para agentes, resolución en WhatsApp, VoiceBot y biometría.
 * Va debajo de PageHero (mismo fondo).
 */
export default function IaSection() {
  return (
    <>
      {/* Destacados y CTA */}
      <section style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(88px,10vw,140px)' }}>
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <div data-reveal="1" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {IA_HIGHLIGHTS.map((h) => (
              <span
                key={h}
                style={{
                  padding: '12px 20px',
                  borderRadius: '999px',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                {h}
              </span>
            ))}
            <SmartLink
              className="hv-bg-gold hv-c-blue"
              href="/#contacto"
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '999px',
                background: '#00249C',
                color: '#F9F6EE',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all .3s',
              }}
            >
              Quiero una demo <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>

          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '760px' }}>
            <Kicker>SUITE CONVERSACIONAL CON IA</Kicker>
            <h2 style={H2}>IA integrada en cada módulo de SimpleSuite.</h2>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262' }}>
              Para entender mejor a tus usuarios, resolver más rápido, anticipar necesidades y mejorar cada interacción.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
              gap: '12px',
            }}
          >
            {IA_MODULES.map((m, i) => (
              <SmartLink
                key={m.t}
                className="hv-lift-4 hv-bd-blue"
                data-reveal={Math.min(i + 1, 4)}
                href={m.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '26px',
                  borderRadius: '22px',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                  minHeight: '240px',
                  transition: 'all .4s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.1em', color: '#636262' }}>
                  {m.module}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em', marginTop: 'auto' }}>
                  {m.t}
                </span>
                <span style={{ fontSize: '14px', lineHeight: 1.55, color: '#636262' }}>{m.d}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: '16px' }}>→</span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      {/* Integración con sistemas */}
      <section style={{ background: DARK_BG, color: '#fff', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
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
            <Kicker color="#DCD291">INTEGRACIÓN</Kicker>
            <h2 style={H2}>Integrá IA y WhatsApp con tus sistemas.</h2>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#DADAE4', maxWidth: '520px' }}>
              SimpleSuite se conecta con tus sistemas para que los agentes de IA gestionen consultas y trámites por
              WhatsApp de forma 100% autónoma.
            </p>
          </div>
          <div
            data-reveal="2"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: 'clamp(28px,3vw,40px)',
              borderRadius: '28px',
              border: '1px solid rgba(178,220,255,.18)',
              background: 'rgba(255,255,255,.03)',
            }}
          >
            <Kicker color="#b2dcff">ASÍ LA IA PUEDE</Kicker>
            <CheckList items={IA_INTEGRATION} dark />
          </div>
        </div>
      </section>

      {/* Funcionalidades para agentes y resolución en WhatsApp */}
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
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '760px' }}>
            <Kicker>FUNCIONALIDADES PARA AGENTES</Kicker>
            <h2 style={H2}>Más productividad y mejor rendimiento para tus agentes.</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: '12px',
            }}
          >
            {IA_AGENT_FEATURES.map((f, i) => (
              <div
                key={f.t}
                data-reveal={Math.min((i % 3) + 1, 4)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '26px',
                  borderRadius: '22px',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                }}
              >
                <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em' }}>{f.t}</span>
                <span style={{ fontSize: '14px', lineHeight: 1.55, color: '#636262' }}>{f.d}</span>
              </div>
            ))}
          </div>

          <div
            data-reveal="1"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
              gap: '40px',
              padding: 'clamp(28px,4vw,56px)',
              borderRadius: '28px',
              background: '#fff',
              border: '1px solid #DADAE4',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Kicker>IA EN WHATSAPP</Kicker>
              <span
                style={{
                  fontSize: 'clamp(26px,2.8vw,38px)',
                  fontWeight: 800,
                  letterSpacing: '-.03em',
                  lineHeight: 1.05,
                }}
              >
                IA para resolver problemas en WhatsApp.
              </span>
              <span style={{ fontSize: '16px', lineHeight: 1.6, color: '#636262' }}>
                Los agentes de IA identifican el problema, analizan el contexto y ejecutan acciones inmediatas,
                derivando a una persona solo cuando hace falta.
              </span>
            </div>
            <CheckList items={IA_WHATSAPP_BENEFITS} />
          </div>
        </div>
      </section>

      {/* VoiceBot y biometría */}
      <section style={{ background: DARK_BG, color: '#fff', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
            gap: '16px',
          }}
        >
          {IA_SPOTLIGHTS.map((s, i) => (
            <div
              key={s.k}
              data-reveal={i + 1}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: 'clamp(28px,3vw,40px)',
                borderRadius: '28px',
                border: '1px solid rgba(178,220,255,.18)',
                background: 'rgba(255,255,255,.03)',
              }}
            >
              <CoverImage
                {...s.img}
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ position: 'relative', height: 'clamp(200px,20vw,280px)', borderRadius: '20px' }}
              />
              <Kicker color="#DCD291">{s.k}</Kicker>
              <span
                style={{
                  fontSize: 'clamp(26px,2.8vw,38px)',
                  fontWeight: 800,
                  letterSpacing: '-.03em',
                  lineHeight: 1.05,
                }}
              >
                {s.t}
              </span>
              <span style={{ fontSize: '16px', lineHeight: 1.6, color: '#DADAE4' }}>{s.d}</span>
              <CheckList items={s.items} dark />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
