import { FONT_MONO } from '@/styles/tokens';
import { pad2 } from '@/utils/format';
import '@/styles/achievements.css';

const BAR_COLOR = '#1e4bd8';
const CONTEXT_COLOR = '#a3a3b5';

function Card({ item, index, minHeight }) {
  return (
    <div
      data-reveal={(index % 3) + 1}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '26px',
        borderRadius: '22px',
        background: '#fff',
        border: '1px solid #DADAE4',
        minHeight,
      }}
    >
      <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#636262' }}>{pad2(index + 1)}</span>
      <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em', marginTop: 'auto' }}>{item.t}</span>
      <span style={{ fontSize: '14px', lineHeight: 1.55, color: '#636262' }}>{item.d}</span>
    </div>
  );
}

/**
 * Comparación antes/después en barras horizontales (una sola medida, un solo eje).
 * `chart` = { kicker, headline, unit, bars: [{ label, value, highlight? }], ticks: [], source }
 */
function BarChart({ chart }) {
  const max = Math.max(...chart.ticks);
  return (
    <figure
      data-reveal="1"
      style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        padding: 'clamp(24px,3vw,36px)',
        borderRadius: '22px',
        background: '#fff',
        border: '1px solid #DADAE4',
      }}
    >
      <figcaption style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.14em', color: '#636262' }}>
          {chart.kicker}
        </span>
        <span style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1 }}>
          {chart.headline}
        </span>
      </figcaption>

      <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: 'auto' }}>
        {chart.bars.map((b) => (
          <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '14px' }}>
              <span style={{ color: '#636262' }}>{b.label}</span>
              <span style={{ fontWeight: 700, color: '#00249C' }}>
                {b.value} {chart.unit}
              </span>
            </div>
            {/* Barra con una grilla tenue de fondo en cada marca del eje */}
            <div
              style={{
                position: 'relative',
                height: '28px',
                backgroundImage: `repeating-linear-gradient(90deg,#EDEDF2 0 1px,transparent 1px ${100 / (chart.ticks.length - 1)}%)`,
              }}
            >
              <div
                className="ach-bar"
                title={`${b.label}: ${b.value} ${chart.unit}`}
                style={{
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  width: `${(b.value / max) * 100}%`,
                  borderRadius: '0 4px 4px 0',
                  background: b.highlight ? BAR_COLOR : CONTEXT_COLOR,
                }}
              ></div>
            </div>
          </div>
        ))}
        {/* Eje */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '8px',
            borderTop: '1px solid #DADAE4',
            fontFamily: FONT_MONO,
            fontSize: '11px',
            color: '#636262',
          }}
        >
          {chart.ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Los mismos datos como tabla, para lectores de pantalla */}
      <table className="sr-only">
        <caption>{chart.kicker}</caption>
        <tbody>
          {chart.bars.map((b) => (
            <tr key={b.label}>
              <th scope="row">{b.label}</th>
              <td>
                {b.value} {chart.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {chart.source && <span style={{ fontSize: '12px', color: '#636262' }}>{chart.source}</span>}
    </figure>
  );
}

/**
 * Lo que el cliente logró con la plataforma. `title` · `items` = [{ t, d }]
 * `chart` (opcional, ver BarChart) = gráfico a la izquierda y las tarjetas en 2×2 a la derecha (styles/achievements.css).
 */
export default function AchievementsSection({ title, items, chart }) {
  return (
    <section
      id="s-resultados"
      style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
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
          <span style={{ color: '#DCD291' }}>.</span>
        </h2>
        {chart ? (
          <div className="ach-layout">
            <BarChart chart={chart} />
            <div className="ach-cards">
              {items.map((it, i) => (
                <Card key={it.t} item={it} index={i} minHeight="180px" />
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))',
              gap: '12px',
            }}
          >
            {items.map((it, i) => (
              <Card key={it.t} item={it} index={i} minHeight="200px" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
