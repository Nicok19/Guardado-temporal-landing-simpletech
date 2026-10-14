import { FONT_MONO } from '@/styles/tokens';
import InlineQuote from './InlineQuote';

const kicker = { fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase' };

/**
 * Quién es el cliente y por qué eligió a Simpletech.
 * `about` = { title, paragraphs: [] } · `why` = { title, text, quote? } (opcional; `quote` = cita del cliente)
 */
export default function AboutSection({ about, why }) {
  return (
    <section style={{ background: '#fff', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
          gap: 'clamp(32px,5vw,72px)',
          alignItems: 'start',
        }}
      >
        <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={kicker}>{about.title}</span>
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                fontSize: i === 0 ? 'clamp(20px,1.8vw,24px)' : '17px',
                fontWeight: i === 0 ? 600 : 400,
                letterSpacing: i === 0 ? '-.015em' : 0,
                lineHeight: 1.55,
                color: i === 0 ? '#00249C' : '#636262',
                textWrap: 'pretty',
              }}
            >
              {p}
            </p>
          ))}
        </div>
        {why && (
          <div
            data-reveal="2"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: 'clamp(28px,3vw,40px)',
              borderRadius: '28px',
              background: '#00249C',
              color: '#F9F6EE',
            }}
          >
            <span style={{ ...kicker, color: '#DCD291' }}>{why.title}</span>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, textWrap: 'pretty' }}>{why.text}</p>
            {why.quote && <InlineQuote quote={why.quote} dark />}
          </div>
        )}
      </div>
    </section>
  );
}
