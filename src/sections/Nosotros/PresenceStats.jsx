import { PRESENCE_STATS } from '@/data/company';
import { FONT_MONO } from '@/styles/tokens';
import '@/styles/presence.css';

/** Datos de la empresa en una franja (estilo zendesk.com/company). Estática. */
export default function PresenceStats() {
  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(72px,8vw,112px)' }}>
      <div className="pr-stats" style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        {PRESENCE_STATS.map((s, i) => (
          <div key={s.label} className="pr-stat" data-reveal={String(Math.min(i + 1, 4))}>
            <span
              style={{
                fontSize: 'clamp(44px,5.4vw,76px)',
                fontWeight: 800,
                letterSpacing: '-.05em',
                lineHeight: 1,
              }}
            >
              {s.value}
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.14em', color: '#636262' }}>
              {s.label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
