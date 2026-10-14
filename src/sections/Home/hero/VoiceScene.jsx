import { useRef } from 'react';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';
import { HERO_TICK_MS, HERO_VOICE } from '@/data/home';
import { pad2 } from '@/utils/format';
import { panelStyle, monoLabel } from './panel';

const BARS = Array.from({ length: 24 }, (_, i) => i);
const CALL_START_SECONDS = 12;

/**
 * Escena 3 · Llamada de voz: avatar con anillos que pulsan, onda de audio y contador.
 * `step` = paso actual (marca el tiempo del contador); `active` = escena visible.
 */
export default function VoiceScene({ step, active }) {
  const waveRef = useRef(null);
  useWaveAnimation(waveRef, active, 200);
  // Contador en segundos reales desde que arranca la escena.
  const seconds = CALL_START_SECONDS + Math.min(47, Math.floor((step * HERO_TICK_MS) / 1000));

  return (
    <div style={{ ...panelStyle, alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '22px' }}>
      <div style={{ position: 'relative', width: '104px', height: '104px', flex: 'none' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="st-ring"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid #DCD291' }}
          ></span>
        ))}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#1e4bd8,#00249C)',
            border: '1px solid rgba(220,210,145,.5)',
            color: '#DCD291',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            fontSize: '26px',
            letterSpacing: '-.02em',
            boxShadow: '0 10px 40px -10px rgba(0,36,156,.9)',
          }}
        >
          {HERO_VOICE.initials}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '17px', fontWeight: 600 }}>{HERO_VOICE.agent}</span>
        <span style={{ ...monoLabel, color: '#28c76f' }}>
          ● {HERO_VOICE.status.toUpperCase()} · <span style={{ color: '#DCD291' }}>00:{pad2(seconds)}</span>
        </span>
      </div>

      <div
        ref={waveRef}
        aria-hidden="true"
        style={{ width: '82%', height: '48px', display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        {BARS.map((i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: '100%',
              borderRadius: '3px',
              background: '#DCD291',
              transform: 'scaleY(.3)',
              transition: 'transform .2s linear',
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
