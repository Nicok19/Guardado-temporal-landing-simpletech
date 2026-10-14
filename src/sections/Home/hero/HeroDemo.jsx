import { useState } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { HERO_FADE_MS, HERO_SCENES, HERO_TICK_MS } from '@/data/home';
import ChatScene, { CHAT_STEPS } from './ChatScene';
import PipelineScene from './PipelineScene';
import VoiceScene from './VoiceScene';

const SCENES = { chat: ChatScene, pipeline: PipelineScene, voice: VoiceScene };
const ticksOf = (scene) => Math.round(scene.ms / HERO_TICK_MS);
// La escena que sale se dibuja en su estado final mientras hace el fade; las que esperan, vacías.
const FINAL_STEP = 99;

/**
 * Animación del hero (isla): una sola animación continua, en loop infinito y sin controles.
 * Conversación → pipeline → llamada de voz → vuelve a la conversación, con fade + leve escala.
 * Con prefers-reduced-motion se muestra fija la conversación completa.
 */
export default function HeroDemo() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [{ current, previous }, setScenes] = useState({ current: 0, previous: null });
  const [step, setStep] = useState(1);

  useInterval(
    () => {
      if (step + 1 < ticksOf(HERO_SCENES[current])) return setStep(step + 1);
      setScenes({ current: (current + 1) % HERO_SCENES.length, previous: current });
      setStep(0);
    },
    reducedMotion ? null : HERO_TICK_MS,
  );

  const stepFor = (i) => {
    if (reducedMotion) return CHAT_STEPS.length;
    if (i === current) return step;
    return i === previous ? FINAL_STEP : 0;
  };

  return (
    <div
      role="img"
      aria-label="Demo: una conversación atendida por IA, el flujo que la resuelve y una llamada con un asistente de voz"
      style={{
        position: 'relative',
        width: 'min(100%, 340px)',
        height: '100%',
        margin: '0 auto',
        '--st-fade': `${HERO_FADE_MS}ms`,
      }}
    >
      {HERO_SCENES.map((scene, i) => {
        const active = reducedMotion ? scene.id === 'chat' : i === current;
        const Scene = SCENES[scene.id];
        return (
          <div key={scene.id} className="st-hero-scene" data-active={active} aria-hidden="true">
            <Scene step={stepFor(i)} active={active && !reducedMotion} />
          </div>
        );
      })}
    </div>
  );
}
