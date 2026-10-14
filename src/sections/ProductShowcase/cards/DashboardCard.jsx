import { FONT_MONO } from '@/styles/tokens';
import { BLUE, Card, LINE, SKY, panel, panelHead, panelSub } from '../ui';

/**
 * Tablero en vivo: indicadores que se actualizan y barras de mensajes por canal.
 * data = { title, board, kpis: [{ label, values: [..] }], bars: { title, items: [{ label, values: [..] }] } }
 * Cada `values` es una serie que se recorre en loop (un valor por tick).
 */
export default function DashboardCard({ data, step, reduced, reveal }) {
  const at = (values) => values[reduced ? values.length - 1 : step % values.length];
  const max = Math.max(...data.bars.items.flatMap((b) => b.values));

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ ...panel, width: '100%', maxWidth: '600px' }}>
        <div style={panelHead}>
          {data.board}
          <span style={{ ...panelSub, display: 'flex', gap: '6px', alignItems: 'center', color: BLUE }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#28c76f',
                animation: reduced ? 'none' : 'st-pulse 1.6s ease-in-out infinite',
              }}
            ></span>
            EN VIVO
          </span>
        </div>
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="sb-kpis">
            {data.kpis.map((k) => (
              <div
                key={k.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: `1px solid ${LINE}`,
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '.1em', color: '#636262' }}>
                  {k.label.toUpperCase()}
                </span>
                <span
                  key={at(k.values)}
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    letterSpacing: '-.03em',
                    color: '#04081c',
                    animation: reduced ? 'none' : 'st-fade-in .4s ease',
                  }}
                >
                  {at(k.values)}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '.1em', color: '#636262' }}>
              {data.bars.title.toUpperCase()}
            </span>
            {data.bars.items.map((b, i) => {
              const v = at(b.values);
              return (
                <div
                  key={b.label}
                  style={{ display: 'grid', gridTemplateColumns: '78px 1fr 34px', gap: '10px', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '12px', color: '#04081c' }}>{b.label}</span>
                  <span style={{ height: '10px', borderRadius: '5px', background: SKY, overflow: 'hidden' }}>
                    <span
                      style={{
                        display: 'block',
                        height: '100%',
                        width: `${(v / max) * 100}%`,
                        borderRadius: '5px',
                        background: i === 0 ? BLUE : '#5B74C9',
                        transition: 'width .9s cubic-bezier(.2,.8,.2,1)',
                      }}
                    ></span>
                  </span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: '#636262', textAlign: 'right' }}>
                    {v}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
