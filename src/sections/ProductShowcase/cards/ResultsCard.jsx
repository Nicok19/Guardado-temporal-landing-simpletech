import { useEffect, useState } from 'react';
import Icon from '../icons';
import { BLUE, Card, IconTile, monoLabel, panel } from '../ui';

/**
 * Métricas reales de clientes: la principal cuenta hasta su valor; la secundaria es fija.
 * data = { title, main: { prefix?, value (número), suffix?, label, client }, extra: { value (texto), label, client } }
 */
export default function ResultsCard({ data, reduced, reveal }) {
  const { main, extra } = data;
  const [n, setN] = useState(reduced ? main.value : 0);

  useEffect(() => {
    if (reduced) return setN(main.value);
    let raf;
    const start = performance.now();
    const run = (t) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(main.value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [reduced, main.value]);

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ ...panel, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <span
              style={{ fontSize: '64px', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: '#04081c' }}
            >
              {main.prefix}
              {n}
              {main.suffix}
            </span>
            <IconTile size={30} radius="50%" bg="#E8F8EF" color="#28c76f">
              <Icon name="check" size={16} strokeWidth={2.4} />
            </IconTile>
          </div>
          <span style={{ fontSize: '14px', color: '#636262' }}>{main.label}</span>
          <span style={{ ...monoLabel, fontSize: '11px', color: BLUE }}>{main.client.toUpperCase()}</span>
        </div>
        <div
          style={{
            ...panel,
            padding: '14px 18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            boxShadow: 'none',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-.04em', color: '#04081c' }}>
            {extra.value}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '13px', color: '#636262' }}>{extra.label}</span>
            <span style={{ ...monoLabel, color: BLUE }}>{extra.client.toUpperCase()}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
