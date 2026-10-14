import SmartLink from '@/components/common/SmartLink';
import { PRICING_FACTORS, PRICING_INCLUDES } from '@/data/pricing';
import { FONT_MONO } from '@/styles/tokens';

const H2 = {
  margin: 0,
  fontSize: 'clamp(34px,4vw,56px)',
  fontWeight: 800,
  letterSpacing: '-.04em',
  lineHeight: 1,
  textWrap: 'balance',
};

/**
 * Página /como-trabajamos/precios: qué incluye la propuesta como concepto (sin montos),
 * qué define el alcance y un llamado al formulario de contacto del pie. Va debajo de PageHero y PhotoBand.
 */
export default function PricingSection() {
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
            alignItems: 'start',
          }}
        >
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
              QUÉ INCLUYE TU PROPUESTA
            </span>
            <h2 style={H2}>
              Una solución completa, no solo una licencia<span style={{ color: '#DCD291' }}>.</span>
            </h2>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: '#636262', maxWidth: '520px' }}>
              Cuando trabajás con Simpletech no comprás un software y quedás solo con él. Tu propuesta reúne todo lo que
              hace falta para que la solución funcione en tu operación y siga mejorando con el tiempo.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
              gap: '12px',
            }}
          >
            {PRICING_INCLUDES.map((it, i) => (
              <div
                key={it.t}
                data-reveal={(i % 3) + 1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '26px',
                  borderRadius: '22px',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                  // La última tarjeta ocupa el ancho para cerrar la grilla de 5.
                  gridColumn: i === PRICING_INCLUDES.length - 1 ? '1 / -1' : undefined,
                }}
              >
                <span style={{ width: '28px', height: '4px', borderRadius: '2px', background: it.color }}></span>
                <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em' }}>{it.t}</span>
                <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#636262' }}>{it.d}</span>
              </div>
            ))}
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
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '760px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#DCD291' }}>
              CÓMO SE DEFINE EL PRECIO
            </span>
            <h2 style={H2}>Pagás por lo que tu operación necesita.</h2>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#DADAE4' }}>
              No trabajamos con planes cerrados: el alcance lo definimos juntos en la preventa, según estos factores.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: '40px',
            }}
          >
            {PRICING_FACTORS.map((f, i) => (
              <div
                key={f.t}
                data-reveal={i + 1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(178,220,255,.3)',
                }}
              >
                <span style={{ fontSize: 'clamp(22px,2.2vw,28px)', fontWeight: 700, letterSpacing: '-.025em' }}>
                  {f.t}
                </span>
                <span style={{ fontSize: '15px', lineHeight: 1.6, color: '#DADAE4' }}>{f.d}</span>
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
                ¿Querés conocer los precios?
              </span>
              <span style={{ fontSize: '15px', color: '#DADAE4', lineHeight: 1.5 }}>
                Los enviamos en privado, en una propuesta a medida. Completá el formulario y te los hacemos llegar.
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
              Pedir precios <span style={{ fontFamily: FONT_MONO }}>↓</span>
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}
