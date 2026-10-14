import { useRef } from 'react';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';
import { FONT_MONO } from '@/styles/tokens';

const BARS = Array.from({ length: 36 }, (_, i) => i);

export default function VoicePreview() {
  const waveRef = useRef(null);
  useWaveAnimation(waveRef);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-.02em' }}>
          VoiceBot · Atención telefónica
        </span>
        <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#a855f7' }}>● 02:18</span>
      </div>
      <div
        ref={waveRef}
        style={{ height: '110px', display: 'flex', alignItems: 'center', gap: '4px', padding: '0 4px' }}
      >
        {BARS.map((i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: '100%',
              borderRadius: '4px',
              background: '#a855f7',
              transform: 'scaleY(.2)',
              transition: 'transform .12s linear',
            }}
          ></span>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '14px',
          lineHeight: 1.5,
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: '11px',
              color: '#636262',
              width: '56px',
              flex: 'none',
              paddingTop: '2px',
            }}
          >
            CLIENTE
          </span>
          <span>Quiero saber el saldo de mi tarjeta.</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: '11px',
              color: '#a855f7',
              width: '56px',
              flex: 'none',
              paddingTop: '2px',
            }}
          >
            IA
          </span>
          <span>Validé tu identidad por biometría de voz. Tu saldo disponible es de $ 48.200.</span>
        </div>
      </div>
      <span
        style={{
          marginTop: 'auto',
          fontFamily: FONT_MONO,
          fontSize: '12px',
          color: '#636262',
        }}
      >
        SimpleVoice · comprende · responde · deriva cuando hace falta
      </span>
    </div>
  );
}
