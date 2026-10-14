import SmartLink from '@/components/common/SmartLink';
import { API_BENEFITS, API_CHANNELS } from '@/data/ecosistema';
import { pad2 } from '@/utils/format';
import { FONT_MONO } from '@/styles/tokens';

/**
 * API para desarrolladores (/ecosistema/api): presentación con los canales disponibles,
 * beneficios y cierre con CTA a contacto. Va debajo de PageHero (mismo fondo).
 */
export default function ApiSection() {
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
              TODO EN UN SOLO LUGAR
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(34px,4vw,56px)',
                fontWeight: 800,
                letterSpacing: '-.04em',
                lineHeight: 1,
                textWrap: 'balance',
              }}
            >
              Escalar tus comunicaciones nunca fue tan fácil.
            </h2>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262', maxWidth: '560px' }}>
              Una interfaz potente y segura para integrar los canales y módulos de SimpleSuite en tus flujos de trabajo.
              Accedé a las funciones de administración de contenido de la plataforma y hacé más eficientes las
              interacciones entre tu empresa y tus aplicaciones de negocio.
            </p>
          </div>
          <div
            data-reveal="2"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              padding: 'clamp(28px,3vw,40px)',
              borderRadius: '28px',
              background: 'linear-gradient(135deg,#274295 0%,#0e1740 60%,#000 100%)',
              color: '#fff',
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#DCD291' }}>
              CANALES DISPONIBLES
            </span>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {API_CHANNELS.map((c, i) => (
                <li
                  key={c}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: i < API_CHANNELS.length - 1 ? '1px solid rgba(178,220,255,.16)' : 'none',
                    fontSize: 'clamp(20px,2vw,26px)',
                    fontWeight: 700,
                    letterSpacing: '-.02em',
                  }}
                >
                  {c}
                  <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#b2dcff' }}>{pad2(i + 1)}</span>
                </li>
              ))}
            </ul>
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
            gap: '40px',
          }}
        >
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#DCD291' }}>
              BENEFICIOS
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(34px,4vw,56px)', fontWeight: 800, letterSpacing: '-.04em' }}>
              ¿Por qué integrar con nuestra API?
            </h2>
          </div>
          <div
            data-reveal="2"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
              gap: '2px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'rgba(178,220,255,.14)',
            }}
          >
            {API_BENEFITS.map((b) => (
              <div
                key={b.n}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '28px',
                  background: '#060c28',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#DCD291' }}>
                  {b.n} · {b.k.toUpperCase()}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em' }}>{b.t}</span>
                <span style={{ fontSize: '14px', lineHeight: 1.55, color: '#DADAE4' }}>{b.d}</span>
              </div>
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
              border: '1px solid #1e4bd8',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '620px' }}>
              <span style={{ fontSize: 'clamp(22px,2.4vw,32px)', fontWeight: 700, letterSpacing: '-.025em' }}>
                ¿Querés integrar SimpleSuite con tus sistemas?
              </span>
              <span style={{ fontSize: '15px', color: '#DADAE4', lineHeight: 1.5 }}>
                Te damos acceso a la documentación y te acompañamos en la integración.
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
              Pedir acceso <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}
