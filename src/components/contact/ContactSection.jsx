import { FONT_MONO } from '@/styles/tokens';

/** Sección "Conversemos" (#contacto). `children` es el formulario (isla interactiva, ver BaseLayout). */
export default function ContactSection({ children }) {
  return (
    <section
      id="contacto"
      className="bg-cream-blue"
      style={{
        position: 'relative',
        color: '#00249C',
        padding: 'clamp(96px,12vw,160px) var(--page-x)',
        overflow: 'hidden',
        scrollMarginTop: '80px',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: '56px',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <span
            data-reveal="1"
            style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em', textTransform: 'uppercase' }}
          >
            Conversemos
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(44px,4.4vw,64px)',
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: '-.045em',
            }}
          >
            Comenzá
            <br />
            tu proyecto
            <br />
            con nosotros.
          </h2>
          <p
            data-reveal="3"
            style={{ margin: 0, fontSize: '18px', lineHeight: 1.55, maxWidth: '440px', textWrap: 'pretty' }}
          >
            Contanos tu desafío. Un especialista analiza tu operación y te muestra cómo nuestras plataformas se adaptan
            a ella.
          </p>
        </div>
        <div data-reveal="2">{children}</div>
      </div>
    </section>
  );
}
