import { FONT_MONO } from '@/styles/tokens';

export default function OverviewSection() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#00249C',
        padding: 'clamp(160px,16vw,200px) var(--page-x) clamp(88px,10vw,140px)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '56px',
        }}
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
                color: '#b2dcff',
              }}
            >
              Producto
            </span>
            <h1
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(48px,7vw,104px)',
                lineHeight: 0.94,
                fontWeight: 800,
                letterSpacing: '-.05em',
                textWrap: 'balance',
              }}
            >
              Plataformas propias, pensadas para escalar<span style={{ color: '#DCD291' }}>.</span>
            </h1>
          </div>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: 'clamp(17px,1.4vw,20px)',
              lineHeight: 1.55,
              color: '#DADAE4',
              fontWeight: 300,
              maxWidth: '520px',
            }}
          >
            Dos productos que se integran entre sí y con tus sistemas: uno para gestionar cada interacción con tus
            clientes, otro para convertir esas conversaciones en negocio.
          </p>
        </div>
      </div>
    </section>
  );
}
