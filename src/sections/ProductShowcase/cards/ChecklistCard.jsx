import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, IconTile, LINE, SKY, panel } from '../ui';

/**
 * Lista que se va validando ítem por ítem (etapas de un proceso, garantías...).
 * data = { title, heading, text?, items: ['...'], numbered? }
 */
export default function ChecklistCard({ data, step, reduced, reveal }) {
  const n = data.items.length;
  const s = reduced ? n : step % (n + 3); // ítems validados (con pausa al completar)

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div
        style={{ ...panel, width: '100%', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.12em', color: '#636262' }}>
          {data.heading.toUpperCase()}
        </span>
        {data.text && <span style={{ fontSize: '13px', lineHeight: 1.5, color: '#04081c' }}>{data.text}</span>}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {data.items.map((it, i) => {
            const done = i < s;
            const current = i === s;
            return (
              <span
                key={it}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '9px 0',
                  borderTop: i ? `1px solid ${LINE}` : 'none',
                  fontSize: '13px',
                  fontWeight: current ? 700 : 400,
                  color: done || current ? '#04081c' : '#9AA3C7',
                  transition: 'color .4s',
                }}
              >
                <IconTile
                  size={24}
                  radius="50%"
                  bg={done ? '#E8F8EF' : current ? BLUE : SKY}
                  color={done ? '#28c76f' : current ? '#fff' : '#9AA3C7'}
                >
                  {done ? (
                    <Icon name="check" size={13} strokeWidth={2.6} />
                  ) : (
                    <span style={{ fontFamily: FONT_MONO, fontSize: '10px' }}>{data.numbered ? i + 1 : '•'}</span>
                  )}
                </IconTile>
                {it}
              </span>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
