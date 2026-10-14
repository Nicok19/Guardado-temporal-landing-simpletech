import { CASES, toCaseView } from '@/data/cases';
import { SUITE_MODULES } from '@/data/suiteModules';
import CaseLogo from '@/components/common/CaseLogo';
import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

const COUNT = 3;
const SUITE_NAMES = ['SimpleSuite', ...SUITE_MODULES.map((m) => m.name)];

// Casos destacados que usan la suite (los mismos que salen en la Home), con su métrica principal.
const FEATURED = CASES.filter((c) => !c.hideInHome && c.slug && c.prods.some((p) => SUITE_NAMES.includes(p)))
  .slice(0, COUNT)
  .map(toCaseView);

/** Resultados de clientes con SimpleSuite (sección de /simplesuite): métrica, resumen y link al caso. Estática. */
export default function SuiteCasesSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(90deg,#274295 0%,#0e1740 45%,#000 100%)',
        color: '#fff',
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
      }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '760px' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#DCD291' }}>
            RESULTADOS REALES
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(34px,4vw,56px)',
              fontWeight: 800,
              letterSpacing: '-.04em',
              lineHeight: 1,
              textWrap: 'balance',
            }}
          >
            Empresas que ya trabajan con SimpleSuite.
          </h2>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '16px' }}
        >
          {FEATURED.map((c, i) => (
            <SmartLink
              key={c.slug}
              href={c.href}
              className="hv-bd-gold hv-bg-glass-6"
              data-reveal={i + 1}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: 'clamp(24px,3vw,32px)',
                borderRadius: '24px',
                border: '1px solid rgba(178,220,255,.18)',
                background: 'rgba(255,255,255,.03)',
                color: '#fff',
                transition: 'all .4s',
              }}
            >
              <div style={{ height: '52px', display: 'flex', alignItems: 'center' }}>
                <CaseLogo item={c} maxWidth="180px" shadow={false} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontSize: 'clamp(38px,3.6vw,52px)',
                    whiteSpace: 'nowrap',
                    fontWeight: 800,
                    letterSpacing: '-.05em',
                    lineHeight: 1,
                    color: '#DCD291',
                  }}
                >
                  {c.kpi}
                </span>
                <span style={{ fontSize: '14px', color: '#b2dcff' }}>{c.kpiL}</span>
              </div>
              <span style={{ fontSize: '15px', lineHeight: 1.6, color: '#DADAE4' }}>{c.summary}</span>
              <span style={{ marginTop: 'auto', fontFamily: FONT_MONO, fontSize: '12px', color: '#F9F6EE' }}>
                Ver el caso →
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
