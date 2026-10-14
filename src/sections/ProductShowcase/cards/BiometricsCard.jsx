import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, IconTile, Waveform, panel } from '../ui';

const STAGES = 4; // 0 habla · 1 analizando · 2-3 verificada

/**
 * Biometría de voz: el cliente habla, la voz se analiza y la identidad queda verificada.
 * data = { title, phrase, steps: ['Escuchando', 'Analizando la huella de voz', 'Identidad verificada'], note }
 */
export default function BiometricsCard({ data, step, reduced, reveal }) {
  const s = reduced ? STAGES - 1 : step % (STAGES + 1);
  const label = data.steps[Math.min(s, 2)];
  const ok = s >= 2;

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          style={{
            ...panel,
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '13px', fontStyle: 'italic', color: '#636262', textAlign: 'center' }}>
            “{data.phrase}”
          </span>
          <Waveform active={!reduced && s < 2} bars={26} height={44} color={ok ? '#28c76f' : BLUE} />
          <span
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              padding: '8px 14px',
              borderRadius: '999px',
              background: ok ? '#E8F8EF' : '#E8EEFF',
              color: ok ? '#1f9d57' : BLUE,
              fontFamily: FONT_MONO,
              fontSize: '11px',
              letterSpacing: '.1em',
              transition: 'all .4s',
            }}
          >
            {ok ? (
              <Icon name="check" size={14} strokeWidth={2.6} />
            ) : (
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: BLUE }}></span>
            )}
            {label.toUpperCase()}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <IconTile size={36} radius="12px" bg="#fff" color={BLUE}>
            <Icon name="shield" size={18} />
          </IconTile>
          <span style={{ fontSize: '13px', lineHeight: 1.45, color: '#b2dcff' }}>{data.note}</span>
        </div>
      </div>
    </Card>
  );
}
