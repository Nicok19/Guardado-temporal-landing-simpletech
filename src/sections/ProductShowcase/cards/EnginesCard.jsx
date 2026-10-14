import { FONT_MONO } from '@/styles/tokens';
import { BLUE, Card, LINE, SKY, panel, panelHead, panelSub } from '../ui';

/**
 * Múltiples motores de IA: cada agente usa su modelo; por turnos, uno cambia de motor sin rehacer el flujo.
 * data = { title, agents: [{ t, engine }], engines: [{ name, icon? }] }
 */
export default function EnginesCard({ data, step, reduced, reveal }) {
  const n = data.agents.length;
  const active = reduced ? -1 : step % n; // agente que cambia de motor en este turno
  const engineOf = (a, i) =>
    i === active
      ? data.engines[
          (data.engines.findIndex((e) => e.name === a.engine) + 1 + Math.floor(step / n)) % data.engines.length
        ].name
      : a.engine;
  const inUse = data.agents.map(engineOf);

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div className="sb-editor">
        <div style={panel}>
          <div style={panelHead}>
            Agentes
            <span style={panelSub}>CASO VIAJES</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {data.agents.map((a, i) => {
              const on = i === active;
              return (
                <div
                  key={a.t}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderTop: i ? `1px solid ${LINE}` : 'none',
                    background: on ? SKY : '#fff',
                    transition: 'background .4s',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#04081c' }}>{a.t}</span>
                  <span
                    key={inUse[i]}
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: '10px',
                      letterSpacing: '.08em',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: on ? BLUE : SKY,
                      color: on ? '#fff' : BLUE,
                      animation: on && !reduced ? 'st-fade-in .4s ease' : 'none',
                      transition: 'all .4s',
                    }}
                  >
                    {inUse[i].toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={panel}>
          <div style={panelHead}>
            Motores de IA
            <span style={panelSub}>COMBINABLES</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '8px', padding: '12px' }}>
            {data.engines.map((e) => {
              const on = inUse.includes(e.name);
              return (
                <span
                  key={e.name}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: '10px',
                    border: `1px solid ${on ? BLUE : LINE}`,
                    background: on ? SKY : '#fff',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: on ? BLUE : '#9AA3C7',
                    transition: 'all .4s',
                  }}
                >
                  {e.icon && <img src={e.icon} alt="" width="18" height="18" loading="lazy" decoding="async" style={{ opacity: on ? 1 : 0.45 }} />}
                  {e.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
