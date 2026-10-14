import '@/styles/delivery.css';
import { VALUES } from '@/data/company';
import { pad2 } from '@/utils/format';
import BrandShape from '@/components/common/BrandShape';
import { FONT_MONO } from '@/styles/tokens';

export default function MissionSection() {
  return (
    <section
      id="s-mision"
      style={{ background: '#fff', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: '16px' }}
        >
          <div
            data-reveal="1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              padding: 'clamp(28px,3.4vw,48px)',
              borderRadius: '28px',
              background: '#00249C',
              color: '#F9F6EE',
              minHeight: '340px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <BrandShape
              fill="#b2dcff"
              style={{ position: 'absolute', right: '-60px', bottom: '-90px', width: '260px', opacity: 0.12 }}
            />
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: '12px',
                letterSpacing: '.24em',
                color: '#DCD291',
              }}
            >
              MISIÓN
            </span>
            <span
              style={{
                position: 'relative',
                fontSize: 'clamp(24px,2.6vw,36px)',
                fontWeight: 700,
                letterSpacing: '-.03em',
                lineHeight: 1.15,
                textWrap: 'pretty',
              }}
            >
              Acompañar a cada organización como socio estratégico, con plataformas SaaS que simplifican la relación con
              sus clientes y generan resultados medibles.
            </span>
          </div>
          <div
            data-reveal="2"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              padding: 'clamp(28px,3.4vw,48px)',
              borderRadius: '28px',
              background: '#F9F6EE',
              border: '1px solid #DADAE4',
              minHeight: '340px',
            }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: '12px',
                letterSpacing: '.24em',
                color: '#636262',
              }}
            >
              VISIÓN
            </span>
            <span
              style={{
                fontSize: 'clamp(24px,2.6vw,36px)',
                fontWeight: 700,
                letterSpacing: '-.03em',
                lineHeight: 1.15,
                textWrap: 'pretty',
              }}
            >
              Ser el socio de referencia en experiencia del cliente e inteligencia artificial en América Latina,
              reconocido por hacer simple lo complejo.
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span
            data-reveal="1"
            style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              letterSpacing: '.24em',
              color: '#636262',
            }}
          >
            VALORES
          </span>
          <div
            className="nv-values"
            style={{
              gap: '2px',
              background: '#DADAE4',
              border: '1px solid #DADAE4',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            {VALUES.map((v, i) => (
              <div
                key={v.t}
                className="hv-bg-cream"
                data-reveal="2"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: '28px 24px',
                  background: '#fff',
                  minHeight: '220px',
                  transition: 'background .35s',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#636262' }}>{pad2(i + 1)}</span>
                <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-.03em', marginTop: 'auto' }}>
                  {v.t}
                </span>
                <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#636262' }}>{v.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
