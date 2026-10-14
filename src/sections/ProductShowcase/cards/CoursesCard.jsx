import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, IconTile, LINE, SKY, panel, panelHead, panelSub } from '../ui';

const FILL = 34; // % de avance por tick

/**
 * Ruta de aprendizaje: un curso por plataforma; las barras avanzan de a una hasta su progreso.
 * data = { title, path, courses: [{ t, target }], cta }
 */
export default function CoursesCard({ data, step, reduced, reveal }) {
  const n = data.courses.length;
  const cycle = n * 3 + 3;
  const s = reduced ? cycle : step % cycle;
  // Cada curso arranca a llenarse 2 ticks después del anterior
  const progress = data.courses.map((c, i) => Math.min(c.target, Math.max(0, (s - i * 2) * FILL)));

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ ...panel, width: '100%', maxWidth: '600px' }}>
        <div style={panelHead}>
          Mi ruta de aprendizaje
          <span style={panelSub}>{data.path}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {data.courses.map((c, i) => {
            const p = progress[i];
            const done = p >= 100;
            return (
              <div
                key={c.t}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(0,1fr) 72px',
                  gap: '14px',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderTop: i ? `1px solid ${LINE}` : 'none',
                }}
              >
                <IconTile size={34} radius="10px" bg={done ? BLUE : SKY} color={done ? '#fff' : BLUE}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '11px', fontWeight: 700 }}>
                    {c.t.replace('Simple', '').slice(0, 2)}
                  </span>
                </IconTile>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '7px', minWidth: 0 }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#04081c' }}>Curso {c.t}</span>
                  <span style={{ height: '6px', borderRadius: '3px', background: SKY, overflow: 'hidden' }}>
                    <span
                      style={{
                        display: 'block',
                        height: '100%',
                        width: `${p}%`,
                        borderRadius: '3px',
                        background: BLUE,
                        transition: 'width .9s cubic-bezier(.2,.8,.2,1)',
                      }}
                    ></span>
                  </span>
                </span>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: FONT_MONO,
                    fontSize: '10px',
                    letterSpacing: '.08em',
                    color: done ? '#1f9d57' : '#636262',
                  }}
                >
                  {done ? (
                    <>
                      <Icon name="check" size={12} strokeWidth={2.6} /> LISTO
                    </>
                  ) : (
                    `${p}%`
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 12px 12px',
            padding: '12px 14px',
            borderRadius: '12px',
            background: BLUE,
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {data.cta}
          <span style={{ fontFamily: FONT_MONO, color: '#DCD291' }}>→</span>
        </div>
      </div>
    </Card>
  );
}
