import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';
import { MODULE_PREVIEWS } from './previews';
import PreviewWindow from './previews/PreviewWindow';

/**
 * Detalle de un módulo de SimpleSuite (página /simplesuite/:modulo): descripción, criterio de
 * Simpletech, vista previa y funcionalidades. Es isla (client:visible) por las animaciones de la vista previa.
 * También la usa /academy. `module.cta` = { label, href } opcional: botón debajo del criterio.
 */
export default function ModuleDetailSection({ module: m }) {
  const Preview = MODULE_PREVIEWS[m.id];

  return (
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
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontFamily: FONT_MONO,
              fontSize: '12px',
              letterSpacing: '.14em',
              color: '#636262',
            }}
          >
            <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: m.color }}></span>
            {m.url}
          </div>
          <span style={{ fontSize: '17px', lineHeight: 1.6, color: '#636262' }}>{m.desc}</span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '18px 20px',
              borderRadius: '18px',
              background: '#fff',
              border: '1px solid #DADAE4',
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.16em', color: '#636262' }}>
              CRITERIO SIMPLETECH
            </span>
            <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#00249C' }}>{m.tip}</span>
          </div>
          {m.cta && (
            <SmartLink
              className="hv-bg-gold hv-c-blue"
              href={m.cta.href}
              style={{
                alignSelf: 'flex-start',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 24px',
                borderRadius: '999px',
                background: '#00249C',
                color: '#F9F6EE',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all .3s',
              }}
            >
              {m.cta.label} <span style={{ fontFamily: FONT_MONO }}>↗</span>
            </SmartLink>
          )}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
              gap: '12px',
            }}
          >
            {m.feats.map((f) => (
              <div
                key={f.t}
                className="hv-lift-4 hv-bd-blue"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '26px',
                  borderRadius: '22px',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                  minHeight: '190px',
                  transition: 'all .4s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <span style={{ width: '28px', height: '4px', borderRadius: '2px', background: m.color }}></span>
                <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em', marginTop: 'auto' }}>
                  {f.t}
                </span>
                <span style={{ fontSize: '14px', lineHeight: 1.55, color: '#636262' }}>{f.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal="2" style={{ position: 'sticky', top: '110px' }}>
          <PreviewWindow module={m}>
            <Preview />
          </PreviewWindow>
        </div>
      </div>
    </section>
  );
}
