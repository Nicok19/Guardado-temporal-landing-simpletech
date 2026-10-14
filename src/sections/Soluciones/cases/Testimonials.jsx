import { TESTIMONIALS } from '@/data/cases';
import { FONT_MONO } from '@/styles/tokens';

export default function Testimonials() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
        gap: '16px',
        paddingTop: '24px',
      }}
    >
      {TESTIMONIALS.map((t) => (
        <figure
          key={t.who}
          data-reveal="1"
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '28px',
            borderRadius: '24px',
            background: '#F9F6EE',
            color: '#00249C',
          }}
        >
          <span style={{ fontSize: '48px', lineHeight: 0.5, fontWeight: 800, color: '#DCD291' }}>“</span>
          <blockquote style={{ margin: 0, fontSize: '16px', lineHeight: 1.55 }}>{t.q}</blockquote>
          <figcaption
            style={{
              marginTop: 'auto',
              fontFamily: FONT_MONO,
              fontSize: '12px',
              letterSpacing: '.14em',
              color: '#636262',
            }}
          >
            {t.who}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
