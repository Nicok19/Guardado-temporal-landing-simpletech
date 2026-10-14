export default function MetricsSection({ metrics }) {
  return (
    <section style={{ background: '#00249C', color: '#F9F6EE', padding: 'clamp(56px,6vw,88px) var(--page-x)' }}>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
          gap: 'clamp(24px,3vw,48px)',
        }}
      >
        {metrics.map((m, i) => (
          <div key={m.label} data-reveal={i + 1} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span
              style={{
                fontSize: 'clamp(56px,6.4vw,104px)',
                fontWeight: 800,
                letterSpacing: '-.055em',
                lineHeight: 0.9,
                color: m.highlight ? '#DCD291' : undefined,
              }}
            >
              {m.value}
            </span>
            <span style={{ fontSize: '17px', color: '#b2dcff' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
