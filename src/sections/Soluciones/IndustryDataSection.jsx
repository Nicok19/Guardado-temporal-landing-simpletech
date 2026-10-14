import { INDUSTRY_DATA } from '@/data/industries';
import { FONT_MONO } from '@/styles/tokens';
import '@/styles/industries.css';

// Colores de cada tarjeta, en orden: alternan para que la grilla no sea repetitiva.
const THEMES = [
  { bg: '#00249C', ink: '#F9F6EE', muted: '#DADAE4', accent: '#DCD291', line: 'rgba(249,246,238,.18)' },
  { bg: '#060c28', ink: '#F9F6EE', muted: '#DADAE4', accent: '#DCD291', line: 'rgba(178,220,255,.16)' },
  { bg: '#fff', ink: '#00249C', muted: '#636262', accent: '#00249C', line: '#DADAE4', border: '1px solid #DADAE4' },
  { bg: '#060c28', ink: '#F9F6EE', muted: '#DADAE4', accent: '#DCD291', line: 'rgba(178,220,255,.16)' },
  { bg: '#00249C', ink: '#F9F6EE', muted: '#DADAE4', accent: '#DCD291', line: 'rgba(249,246,238,.18)' },
];
// Las primeras dos industrias van en tarjetas grandes (con el insight); el resto, compactas.
const LARGE = 2;

/**
 * "Datos generales de las industrias" (sección de /soluciones, arriba de los casos): todas las industrias a la vista,
 * cada una con su principal punto de dolor y los benchmarks del sector (data/industries.js). Estática.
 */
export default function IndustryDataSection() {
  return (
    <section
      id="industrias"
      style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(88px,10vw,140px)' }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
            DATOS GENERALES DE LAS INDUSTRIAS
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(34px,4vw,56px)',
              fontWeight: 800,
              letterSpacing: '-.04em',
              lineHeight: 1,
              textWrap: 'balance',
              color: '#060c28',
            }}
          >
            Lo que viven las empresas de cada sector<span style={{ color: '#00249C' }}>.</span>
          </h2>
        </div>

        <div className="ind-grid">
          {Object.entries(INDUSTRY_DATA).map(([industry, data], i) => {
            const t = THEMES[i % THEMES.length];
            const large = i < LARGE;
            return (
              <article
                key={industry}
                className={`ind-card${large ? ' ind-card--lg' : ''}`}
                data-reveal={(i % 3) + 1}
                style={{ background: t.bg, color: t.ink, border: t.border, '--ind-line': t.line }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: t.accent }}>
                  {industry.toUpperCase()}
                </span>
                <span
                  style={{
                    fontSize: large ? 'clamp(44px,4.4vw,64px)' : 'clamp(34px,3vw,42px)',
                    whiteSpace: 'nowrap',
                    fontWeight: 800,
                    letterSpacing: '-.05em',
                    lineHeight: 0.92,
                  }}
                >
                  {data.pain[0]}
                </span>
                <span
                  style={{
                    fontSize: large ? 'clamp(18px,1.6vw,21px)' : '16px',
                    fontWeight: 600,
                    letterSpacing: '-.01em',
                    lineHeight: 1.4,
                    textWrap: 'pretty',
                  }}
                >
                  {data.pain[1]}
                </span>
                {large && (
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: t.muted, fontStyle: 'italic' }}>
                    {data.insight}
                  </p>
                )}
                <ul className="ind-bench">
                  {data.bench.map(([value, label]) => (
                    <li key={label}>
                      <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-.03em', color: t.accent }}>
                        {value}
                      </span>
                      <span style={{ fontSize: '14px', lineHeight: 1.5, color: t.muted }}>{label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <span style={{ fontSize: '12px', color: '#636262' }}>
          Referencias de mercado y datos agregados de proyectos Simpletech en la región.
        </span>
      </div>
    </section>
  );
}
