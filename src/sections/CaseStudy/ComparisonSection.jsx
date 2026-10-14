import { FONT_MONO } from '@/styles/tokens';

const cell = { padding: '18px 20px', borderTop: '1px solid rgba(178,220,255,.14)', fontSize: '16px', lineHeight: 1.4 };
const head = { ...cell, borderTop: 'none', fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.16em' };

/**
 * Impacto: tabla antes / después + reconocimientos e imagen opcional.
 * `comparison` = { title, columns: [indicador, antes, después], rows: [[indicador, antes, después]] }
 * `awards` = textos de reconocimientos · `image` = { src, alt }
 */
export default function ComparisonSection({ comparison, awards = [], image }) {
  return (
    <section style={{ background: '#04081c', color: '#F9F6EE', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span
            data-reveal="1"
            style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em', color: '#DCD291' }}
          >
            IMPACTO COMERCIAL Y OPERATIVO
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(32px,4vw,56px)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-.04em',
              maxWidth: '820px',
              textWrap: 'balance',
            }}
          >
            {comparison.title}
          </h2>
        </div>
        <div
          data-reveal="2"
          style={{
            overflowX: 'auto',
            borderRadius: '24px',
            border: '1px solid rgba(178,220,255,.14)',
            background: 'rgba(8,14,44,.8)',
          }}
        >
          <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {comparison.columns.map((c, i) => (
                  <th key={c} scope="col" style={{ ...head, color: i === 2 ? '#DCD291' : '#8fa0d8' }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map(([label, before, after]) => (
                <tr key={label}>
                  <th scope="row" style={{ ...cell, fontWeight: 600 }}>
                    {label}
                  </th>
                  <td style={{ ...cell, color: '#8fa0d8' }}>{before}</td>
                  <td style={{ ...cell, fontWeight: 700, color: '#DCD291' }}>{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(awards.length > 0 || image) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: '16px',
              alignItems: 'stretch',
            }}
          >
            {awards.length > 0 && (
              <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.16em', color: '#8fa0d8' }}>
                  RECONOCIMIENTOS
                </span>
                {awards.map((a) => (
                  <div
                    key={a}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center',
                      padding: '20px 22px',
                      borderRadius: '20px',
                      border: '1px solid rgba(220,210,145,.35)',
                      background: 'rgba(220,210,145,.08)',
                      fontSize: '17px',
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    <span aria-hidden="true" style={{ color: '#DCD291', fontSize: '22px' }}>
                      ★
                    </span>
                    {a}
                  </div>
                ))}
              </div>
            )}
            {image && (
              <img
                data-reveal="2"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px', display: 'block' }}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
