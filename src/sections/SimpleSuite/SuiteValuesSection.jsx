import { SUITE_VALUES } from '@/data/suite';
import { FONT_MONO } from '@/styles/tokens';

/** Lo que gana la operación al tener todo en una suite: tres tarjetas debajo del hero de /simplesuite. Estática. */
export default function SuiteValuesSection() {
  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(72px,8vw,112px) var(--page-x)' }}>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
          gap: '12px',
        }}
      >
        {SUITE_VALUES.map((v, i) => (
          <div
            key={v.t}
            data-reveal={i + 1}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: 'clamp(24px,3vw,32px)',
              borderRadius: '24px',
              background: '#fff',
              border: '1px solid #DADAE4',
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.14em', color: '#636262' }}>
              {v.k}
            </span>
            <span style={{ fontSize: 'clamp(22px,2.2vw,28px)', fontWeight: 700, letterSpacing: '-.025em' }}>{v.t}</span>
            <span style={{ fontSize: '15px', lineHeight: 1.6, color: '#636262' }}>{v.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
