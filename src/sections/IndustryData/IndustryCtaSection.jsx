import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

/** Cierre de /nosotros/datos-de-la-industria: bloque azul con los llamados y la nota de fuentes. Estático. */
export default function IndustryCtaSection() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(16px,3vw,40px) var(--page-x) clamp(88px,10vw,128px)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div
          data-reveal="2"
          style={{
            borderRadius: '28px',
            background: 'linear-gradient(120deg,#00249C 0%,#0e1740 70%)',
            color: '#F9F6EE',
            padding: 'clamp(32px,5vw,64px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#DCD291' }}>
              TU OPERACIÓN
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(30px,3.6vw,48px)',
                fontWeight: 800,
                letterSpacing: '-.04em',
                lineHeight: 1.02,
                textWrap: 'balance',
              }}
            >
              ¿Tu empresa se parece a alguno de estos números?
            </h2>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#DADAE4', fontWeight: 300 }}>
              Contanos tu desafío y te mostramos cómo lo resolvieron otras empresas de tu industria.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <SmartLink
              className="hv-bg-cream hv-c-blue"
              href="/#contacto"
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 26px',
                borderRadius: '999px',
                background: '#DCD291',
                color: '#00249C',
                fontWeight: 700,
                fontSize: '15px',
                transition: 'all .3s',
              }}
            >
              Conversemos <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
            <SmartLink
              className="hv-bg-glass-10"
              href="/soluciones#casos"
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 26px',
                borderRadius: '999px',
                border: '1px solid rgba(178,220,255,.35)',
                color: '#F9F6EE',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all .3s',
              }}
            >
              Ver casos de éxito <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
        <span style={{ fontSize: '12px', color: '#636262' }}>
          Referencias de mercado y datos agregados de proyectos Simpletech en la región.
        </span>
      </div>
    </section>
  );
}
