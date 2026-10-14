import { FONT_MONO } from '@/styles/tokens';

/**
 * Cierre del caso: conclusión + testimonio(s) del cliente (todo opcional).
 * `conclusion` = [párrafos] · `title` = título opcional arriba (ej. "¿Qué es lo que más valoran?")
 * `testimonial` = { quote (texto o [textos]), author, role, company, photo? } o un array de ellos.
 * Con `title`, la conclusión va debajo del título y los testimonios en una fila aparte;
 * sin él, la conclusión comparte la grilla con los testimonios.
 */
export default function ClosingSection({ conclusion, testimonial, title }) {
  const testimonials = testimonial ? [].concat(testimonial) : [];
  const stacked = Boolean(title);

  const conclusionBlock = conclusion && (
    <div
      data-reveal="1"
      style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: stacked ? '820px' : 'none' }}
    >
      {!stacked && <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em' }}>CONCLUSIÓN</span>}
      {conclusion.map((p, i) => (
        <p key={i} style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: '#636262', textWrap: 'pretty' }}>
          {p}
        </p>
      ))}
    </div>
  );

  return (
    <section style={{ background: '#fff', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        {title && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2
              data-reveal="1"
              style={{
                margin: 0,
                fontSize: 'clamp(32px,4vw,56px)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-.04em',
              }}
            >
              {title}
            </h2>
            {conclusionBlock}
          </div>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: 'clamp(24px,4vw,56px)',
            alignItems: 'start',
          }}
        >
          {!stacked && conclusionBlock}
          {testimonials.map((t, i) => (
            <figure
              key={t.author + i}
              data-reveal={i + 2}
              style={{
                margin: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: 'clamp(28px,3vw,44px)',
                borderRadius: '28px',
                background: '#00249C',
                color: '#F9F6EE',
              }}
            >
              <span style={{ fontSize: '64px', lineHeight: 0.5, fontWeight: 800, color: '#DCD291' }}>“</span>
              {[].concat(t.quote).map((q) => (
                <blockquote
                  key={q}
                  style={{
                    margin: 0,
                    fontSize: 'clamp(19px,1.7vw,23px)',
                    lineHeight: 1.5,
                    fontWeight: 500,
                    textWrap: 'pretty',
                  }}
                >
                  {q}
                </blockquote>
              ))}
              <figcaption style={{ marginTop: 'auto', display: 'flex', gap: '14px', alignItems: 'center' }}>
                {t.photo && (
                  <img
                    src={t.photo}
                    alt={t.author}
                    loading="lazy"
                    width="56"
                    height="56"
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flex: 'none' }}
                  />
                )}
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>{t.author}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.12em', color: '#b2dcff' }}>
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
