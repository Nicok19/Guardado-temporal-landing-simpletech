import { useRef } from 'react';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';
import { HERO_TICK_MS, HERO_VOICE } from '@/data/home';
import { pad2 } from '@/utils/format';
import { ILLU, panelStyle, monoLabel, sticker } from './panel';

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
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${ILLU.cream}` }}
          ></span>
        ))}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            ...sticker(ILLU.blue, 5),
            border: `3px solid ${ILLU.ink}`,
            color: ILLU.gold,
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            fontSize: '26px',
            letterSpacing: '-.02em',
          }}
        >
          {HERO_VOICE.initials}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '17px', fontWeight: 600 }}>{HERO_VOICE.agent}</span>
        {/* Estado como sticker */}
        <span
          style={{
            ...monoLabel,
            ...sticker(ILLU.mint, 3),
            fontWeight: 700,
            padding: '5px 10px',
            borderRadius: '999px',
            rotate: '-2deg',
          }}
        >
          ● {HERO_VOICE.status.toUpperCase()} · 00:{pad2(seconds)}
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
              borderRadius: '4px',
              background: ILLU.gold,
              border: `1.5px solid ${ILLU.ink}`,
              transform: 'scaleY(.3)',
              transition: 'transform .2s linear',
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
