import { useEffect } from 'react';

/**
 * Anima los hijos de `ref` como una onda de audio (VoiceBot).
 * Usa transform: scaleY, así no cambia el layout: cada barra debe tener height 100%.
 * `intervalMs` = cada cuánto cambia la onda (más alto = más lenta).
 */
export function useWaveAnimation(ref, active = true, intervalMs = 110) {
  useEffect(() => {
    if (!active) return undefined;
    let raf;
    let last = 0;
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - last < intervalMs) return;
      last = t;
      const el = ref.current;
      if (!el) return;
      Array.from(el.children).forEach((bar, i) => {
        const scale = 0.18 + Math.abs(Math.sin(t / 380 + i * 0.55)) * 0.7 * (0.4 + Math.random() * 0.6);
        bar.style.transform = `scaleY(${scale})`;
      });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ref, active, intervalMs]);
}
