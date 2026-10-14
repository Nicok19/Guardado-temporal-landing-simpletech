import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, IconTile, panel } from '../ui';

const STAGES = 5; // 0 campaña · 1 intento por el canal principal · 2 no entregado · 3 respaldo · 4 entregado

/**
 * Respaldo entre canales: el mensaje intenta por el canal principal y, si no llega, sale por el alternativo.
 * data = { title, primary, backup, note }
 */
export default function FallbackCard({ data, step, reduced, reveal }) {
  const s = reduced ? STAGES - 1 : step % (STAGES + 1);
  const rows = [
    {
      icon: data.primary.toLowerCase(),
      label: data.primary,
      state: s < 1 ? 'idle' : s === 1 ? 'sending' : 'failed',
      text: s < 1 ? 'En espera' : s === 1 ? 'Enviando…' : 'No entregado',
    },
    {
      icon: data.backup.toLowerCase(),
      label: data.backup,
      state: s < 3 ? 'idle' : s === 3 ? 'sending' : 'done',
      text: s < 3 ? 'Respaldo' : s === 3 ? 'Enviando…' : 'Entregado',
    },
  ];
  const tone = {
    idle: { bg: '#fff', color: '#9AA3C7', mark: null },
    sending: { bg: '#fff', color: BLUE, mark: null },
    failed: { bg: '#FDECEC', color: '#ea5455', mark: 'x' },
    done: { bg: '#E8F8EF', color: '#28c76f', mark: 'check' },
  };

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rows.map((r, i) => {
          const t = tone[r.state];
          return (
            <div key={r.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
              {i === 1 && (
                <span
                  style={{
                    alignSelf: 'center',
                    fontFamily: FONT_MONO,
                    fontSize: '10px',
                    letterSpacing: '.14em',
                    color: s >= 2 ? '#DCD291' : 'rgba(178,220,255,.5)',
                    transition: 'color .4s',
                  }}
                >
                  ↓ SI NO LLEGA
                </span>
              )}
              <div
                style={{
                  ...panel,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  background: t.bg,
                  transform: r.state === 'sending' ? 'scale(1.03)' : 'none',
                  transition: 'all .4s',
                }}
              >
                <IconTile size={40} radius="12px" bg={BLUE} color="#fff">
                  <Icon name={r.icon} size={20} />
                </IconTile>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#04081c' }}>{r.label}</span>
                  <span style={{ fontSize: '12px', color: t.color, transition: 'color .4s' }}>{r.text}</span>
                </span>
                {t.mark && (
                  <IconTile size={26} radius="50%" bg="#fff" color={t.color}>
                    <Icon name={t.mark} size={14} strokeWidth={2.6} />
                  </IconTile>
                )}
              </div>
            </div>
          );
        })}
        <span style={{ textAlign: 'center', fontSize: '13px', lineHeight: 1.45, color: '#b2dcff' }}>{data.note}</span>
      </div>
    </Card>
  );
}
