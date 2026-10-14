import { INDUSTRY_FILTERS } from '@/data/industries';
import { FONT_MONO } from '@/styles/tokens';

const chipColors = (on) => ({
  background: on ? '#F9F6EE' : 'transparent',
  color: on ? '#00249C' : '#DADAE4',
  border: `1px solid ${on ? '#F9F6EE' : 'rgba(178,220,255,.25)'}`,
});

/** Filtro de casos de éxito por industria. */
export default function CaseFilters({ industry, onIndustry }) {
  return (
    <div
      data-reveal="2"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '20px 26px',
        borderRadius: '24px',
        background: 'rgba(8,14,44,.6)',
        border: '1px solid rgba(178,220,255,.14)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.16em', color: '#8fa0d8' }}>
        INDUSTRIA
      </span>
      <div role="group" aria-label="Filtrar por industria" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {INDUSTRY_FILTERS.map((opt) => (
          <button
            key={opt}
            onClick={() => onIndustry(opt)}
            aria-pressed={opt === industry}
            style={{
              font: '500 13px Inter,sans-serif',
              padding: '9px 14px',
              borderRadius: '999px',
              cursor: 'pointer',
              transition: 'all .25s',
              ...chipColors(opt === industry),
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
