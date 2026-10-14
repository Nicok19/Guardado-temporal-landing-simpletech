import { FONT_MONO } from '@/styles/tokens';

// prefix "+" se muestra fuera del número animado (data-count).
const STATS = [
  { prefix: '+', value: 200, label: 'Empresas' },
  { prefix: '', value: 2011, label: 'Desde' },
  { prefix: '+', value: 40, label: 'Países' },
];

export default function HeroStats() {
  return (
    <div
      data-reveal="4"
      className="st-hero-stats"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
        gap: '24px',
        borderTop: '1px solid rgba(178,220,255,.16)',
      }}
    >
      {STATS.map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span className="st-hero-stat-num" style={{ fontWeight: 700, letterSpacing: '-.03em' }}>
            {s.prefix}
            <span data-count={s.value}>{s.value}</span>
          </span>
          <span
            className="st-hero-stat-label"
            style={{
              fontFamily: FONT_MONO,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: '#b2dcff',
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
