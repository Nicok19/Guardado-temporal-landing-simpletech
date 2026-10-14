import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';
import Icon from './icons';

/**
 * Tarjeta de producto al estilo gorgias.com: título y llamada a la acción a la izquierda,
 * grilla de funcionalidades con ícono a la derecha. Estática (sin isla).
 * `tip` = criterio Simpletech del módulo (data/suiteModules.js).
 */
export default function FeaturesCardSection({ features: f, tip }) {
  return (
    <section style={{ background: '#F9F6EE', padding: '0 var(--page-x) clamp(72px,8vw,112px)' }}>
      <div className="sb-features" data-reveal="1" style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(28px,2.8vw,40px)',
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: '-.035em',
              color: '#00249C',
              textWrap: 'balance',
            }}
          >
            {f.title}
          </h2>
          <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.55, color: '#636262' }}>{f.text}</p>
          {tip && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px 18px',
                borderRadius: '16px',
                background: '#E8EEFF',
              }}
            >
              <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.16em', color: '#636262' }}>
                CRITERIO SIMPLETECH
              </span>
              <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#00249C' }}>{tip}</span>
            </div>
          )}
          <SmartLink
            className="hv-bg-blue hv-c-cream"
            href={f.cta.href}
            style={{
              marginTop: 'auto',
              alignSelf: 'flex-start',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              padding: '14px 22px',
              borderRadius: '999px',
              border: '1px solid #00249C',
              color: '#00249C',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'all .3s',
            }}
          >
            {f.cta.label} <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
        </div>
        <div className="sb-features-grid">
          {f.items.map((it) => (
            <div key={it.t} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  flex: 'none',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '12px',
                  background: '#00249C',
                  color: '#fff',
                }}
              >
                <Icon name={it.icon} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-.01em', color: '#04081c' }}>
                  {it.t}
                </span>
                <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#636262' }}>{it.d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
