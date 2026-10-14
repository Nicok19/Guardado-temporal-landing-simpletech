import { FONT_MONO } from '@/styles/tokens';

export default function IntroSection() {
  return (
    <section
      style={{
        background: '#F9F6EE',
        color: '#00249C',
        padding: 'clamp(160px,16vw,200px) var(--page-x) clamp(72px,8vw,112px)',
      }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
            gap: '40px',
            alignItems: 'end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span
              data-reveal="1"
              style={{
                fontFamily: FONT_MONO,
                fontSize: '12px',
                letterSpacing: '.24em',
                textTransform: 'uppercase',
              }}
            >
              Casos de éxito
            </span>
            <h1
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(44px,6vw,92px)',
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: '-.05em',
                textWrap: 'balance',
              }}
            >
              Soluciones a la medida de tu operación<span style={{ color: '#DCD291' }}>.</span>
            </h1>
          </div>
          <div data-reveal="3" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: '#636262', maxWidth: '500px' }}>
              Analizamos cada desafío con una mirada consultiva y combinamos las herramientas justas: desde la
              automatización de conversaciones hasta la infraestructura que la sostiene.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
