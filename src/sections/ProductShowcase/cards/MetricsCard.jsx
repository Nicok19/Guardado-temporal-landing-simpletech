import { useEffect, useState } from 'react';
import { FONT_MONO } from '@/styles/tokens';
import { BLUE, Card, LINE, panel } from '../ui';

const VISIBLE = 5; // cuántas métricas de la lista se ven a la vez

/**
 * Número grande que cuenta hasta su valor + lista de métricas que va rotando (una resaltada por tick).
 * data = { title, value, prefix, label, items: ['Estados', ...] }
 */
export default function MetricsCard({ data, step, reduced, reveal }) {
  const [n, setN] = useState(reduced ? data.value : 0);

  useEffect(() => {
    if (reduced) return setN(data.value);
    let raf;
    const start = performance.now();
    const run = (t) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round(data.value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [reduced, data.value]);

  const offset = reduced ? 0 : step % data.items.length;
  const rows = Array.from({ length: VISIBLE }, (_, i) => data.items[(offset + i) % data.items.length]);

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div
        style={{ ...panel, width: '100%', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '64px', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: '#04081c' }}>
            {data.prefix}
            {n}
          </span>
          <span style={{ fontSize: '14px', color: '#636262' }}>{data.label}</span>
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {rows.map((m, i) => (
            <span
              key={`${offset}-${i}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderTop: `1px solid ${LINE}`,
                fontSize: '13px',
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? BLUE : '#636262',
                animation: reduced ? 'none' : 'st-fade-in .4s ease',
              }}
            >
              {m}
              {i === 0 && (
                <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.1em' }}>EN VIVO</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
