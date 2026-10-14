import { FONT_MONO } from '@/styles/tokens';
import InlineQuote from './InlineQuote';

/**
 * Desafío → solución → resultado. El último bloque lleva el borde resaltado.
 * Cada bloque: { kicker, title, text, points?: [{ t, d }], quote?: { text, author, role, photo } }
 * `layout`: 'columns' (por defecto: 3 columnas, o 2×2 con 4 bloques) · 'rows' (un bloque por fila, con
 * el texto a la izquierda y los puntos + la cita a la derecha; para casos con mucho contenido).
 */
export default function StorySection({ story, layout = 'columns' }) {
  const rows = layout === 'rows';
  const columns = rows ? '1fr' : `repeat(auto-fit,minmax(min(100%,${story.length === 4 ? 400 : 300}px),1fr))`;

  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: columns,
          gap: rows ? 'clamp(48px,6vw,80px)' : 'clamp(32px,4vw,56px)',
        }}
      >
        {story.map((block, i) => (
          <div
            key={block.kicker}
            data-reveal={rows ? 1 : i + 1}
            style={{
              display: 'grid',
              gridTemplateColumns: rows ? 'repeat(auto-fit,minmax(min(100%,360px),1fr))' : '1fr',
              gap: rows ? 'clamp(24px,4vw,56px)' : '18px',
              alignContent: 'start',
              paddingTop: '24px',
              borderTop: i === story.length - 1 ? '2px solid #00249C' : '1px solid rgba(0,36,156,.2)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em' }}>{block.kicker}</span>
              <span
                style={{
                  fontSize: 'clamp(24px,2.2vw,32px)',
                  fontWeight: 700,
                  letterSpacing: '-.03em',
                  lineHeight: 1.15,
                  textWrap: 'balance',
                }}
              >
                {block.title}
              </span>
              <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262', textWrap: 'pretty' }}>
                {block.text}
              </p>
            </div>
            {(block.points || block.quote) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {block.points && (
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    {block.points.map((pt) => (
                      <li
                        key={pt.t}
                        style={{
                          paddingLeft: '16px',
                          borderLeft: '2px solid #DCD291',
                          fontSize: '15px',
                          lineHeight: 1.55,
                        }}
                      >
                        <strong style={{ display: 'block', marginBottom: '4px' }}>{pt.t}</strong>
                        <span style={{ color: '#636262' }}>{pt.d}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {block.quote && <InlineQuote quote={block.quote} />}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
