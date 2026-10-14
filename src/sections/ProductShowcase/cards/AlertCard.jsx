import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, IconTile, panel } from '../ui';

const W = 280;
const H = 110;

/**
 * Indicador que se dibuja punto a punto, cruza el umbral y dispara un aviso.
 * data = { title, metric, unit, limit, points: [..], alert: { t, d } }
 */
export default function AlertCard({ data, step, reduced, reveal }) {
  const pts = data.points;
  const cycle = pts.length + 3;
  const s = reduced ? cycle - 1 : step % cycle;
  const shown = Math.min(s + 2, pts.length); // puntos dibujados
  const top = Math.max(...pts, data.limit) * 1.15;
  const x = (i) => (i / (pts.length - 1)) * W;
  const y = (v) => H - (v / top) * H;
  const path = pts
    .slice(0, shown)
    .map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(' ');
  const last = pts[shown - 1];
  const over = last > data.limit;

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ ...panel, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.12em', color: '#636262' }}>
              {data.metric.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 800,
                letterSpacing: '-.03em',
                color: over ? '#ea5455' : '#04081c',
                transition: 'color .3s',
              }}
            >
              {last}
              <span style={{ fontSize: '13px', fontWeight: 600 }}> {data.unit}</span>
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" aria-hidden="true">
            <line
              x1="0"
              x2={W}
              y1={y(data.limit)}
              y2={y(data.limit)}
              stroke="#ea5455"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <path d={path} fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx={x(shown - 1)} cy={y(last)} r="4.5" fill={over ? '#ea5455' : BLUE} />
          </svg>
          <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '.1em', color: '#ea5455' }}>
            LÍMITE · {data.limit} {data.unit.toUpperCase()}
          </span>
        </div>
        <div
          style={{
            ...panel,
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            padding: '12px 14px',
            opacity: over ? 1 : 0,
            transform: over ? 'none' : 'translateY(8px) scale(.98)',
            transition: 'opacity .5s ease, transform .5s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <IconTile bg="#FDECEC" color="#ea5455">
            <Icon name="bell" size={16} strokeWidth={2} />
          </IconTile>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#04081c' }}>{data.alert.t}</span>
            <span style={{ fontSize: '11px', color: '#636262' }}>{data.alert.d}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
