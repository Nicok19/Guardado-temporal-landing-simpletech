import { useState } from 'react';
import { CASES, toCaseView } from '@/data/cases';
import { FONT_MONO } from '@/styles/tokens';
import CaseFilters from './cases/CaseFilters';
import CaseCard from './cases/CaseCard';
import Testimonials from './cases/Testimonials';

const ALL_INDUSTRIES = 'Todas';

/** Casos de éxito con filtro por industria (sección de /soluciones). */
export default function SuccessCasesSection() {
  const [industry, setIndustry] = useState(ALL_INDUSTRIES);

  const filtered = CASES.filter((c) => industry === ALL_INDUSTRIES || c.ind === industry).map(toCaseView);

  return (
    <section
      id="casos"
      className="bg-night"
      style={{
        position: 'relative',
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
      }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
            gap: '40px',
            alignItems: 'end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span
              data-reveal="1"
              style={{
                fontFamily: FONT_MONO,
                fontSize: '12px',
                letterSpacing: '.24em',
                color: '#b2dcff',
              }}
            >
              CASOS DE ÉXITO
            </span>
            <h2
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(40px,5.4vw,80px)',
                lineHeight: 0.96,
                fontWeight: 800,
                letterSpacing: '-.05em',
                textWrap: 'balance',
              }}
            >
              Ellos ya están revolucionando su CX.
            </h2>
          </div>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: 1.65,
              color: '#DADAE4',
              fontWeight: 300,
              maxWidth: '500px',
            }}
          >
            Desafíos resueltos en conjunto con nuestros clientes. Filtrá por industria para ver los de tu sector.
          </p>
        </div>
        <CaseFilters industry={industry} onIndustry={setIndustry} />
        <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#8fa0d8', letterSpacing: '.08em' }}>
          {filtered.length} {filtered.length === 1 ? 'CASO' : 'CASOS'}
        </span>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))', gap: '16px' }}
        >
          {filtered.map((c) => (
            <CaseCard key={c.client} c={c} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{
              padding: '48px',
              borderRadius: '24px',
              border: '1px dashed rgba(178,220,255,.3)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 600 }}>No hay casos publicados de esa industria.</span>
            <button
              onClick={() => setIndustry(ALL_INDUSTRIES)}
              style={{
                font: '600 14px Inter,sans-serif',
                padding: '12px 20px',
                borderRadius: '999px',
                border: 'none',
                background: '#F9F6EE',
                color: '#00249C',
                cursor: 'pointer',
              }}
            >
              Ver todos
            </button>
          </div>
        )}
        <Testimonials />
      </div>
    </section>
  );
}
