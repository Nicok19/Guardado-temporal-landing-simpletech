import { HERO_CHAT, HERO_CHAT_TYPING } from '@/data/home';
import { ILLU, panelStyle, sticker } from './panel';

/**
 * Pasos de la conversación: antes de cada mensaje del agente hay un paso con "escribiendo…".
 * Paso n → { count: mensajes visibles, typing: si se muestra el indicador }.
 */
export const CHAT_STEPS = HERO_CHAT.flatMap((m, i) => [
  ...(m.agent ? [{ count: i, typing: true }] : []),
  { count: i + 1, typing: false },
]);

const bubbleBase = {
  maxWidth: '84%',
  padding: '8px 11px',
  borderRadius: '14px',
  fontSize: '13px',
  lineHeight: 1.4,
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
};

// Burbujas como stickers: cliente en crema, agente en celeste (lila si es una persona), apenas torcidas.
function Bubble({ m }) {
  const agentStyle = {
    ...bubbleBase,
    ...sticker(m.human ? ILLU.lilac : ILLU.sky),
    borderBottomLeftRadius: '4px',
    rotate: '-1deg',
  };
  const clientStyle = { ...bubbleBase, ...sticker(ILLU.cream), borderBottomRightRadius: '4px', rotate: '1deg' };
  return (
    <div
      className="st-msg"
      style={{ flex: 'none', display: 'flex', justifyContent: m.agent ? 'flex-start' : 'flex-end' }}
    >
      <div style={m.agent ? agentStyle : clientStyle}>
        <span
          style={{
            fontSize: '10.5px',
            fontWeight: 700,
            color: ILLU.ink,
            opacity: 0.6,
          }}
        >
          {m.who}
        </span>
        <span>{m.t}</span>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="st-msg" style={{ flex: 'none', display: 'flex' }} aria-label={HERO_CHAT_TYPING}>
      <div
        style={{
          display: 'flex',
          gap: '4px',
          padding: '11px 13px',
          borderRadius: '14px',
          borderBottomLeftRadius: '4px',
          ...sticker(ILLU.sky),
          rotate: '-1deg',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="st-typing-dot"
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: ILLU.ink }}
          ></span>
        ))}
      </div>
    </div>
  );
}

/** Escena 1 · Conversación entre cliente y agente. `step` = paso de CHAT_STEPS (1 = primer mensaje). */
export default function ChatScene({ step }) {
  const current = CHAT_STEPS[Math.min(step, CHAT_STEPS.length) - 1] ?? { count: 0, typing: false };
  const visible = HERO_CHAT.slice(0, current.count);

  return (
    <div style={{ ...panelStyle, gap: '12px', padding: '16px' }}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          // Los mensajes se apilan de arriba hacia abajo: cada uno nuevo aparece debajo del anterior.
          justifyContent: 'flex-start',
          gap: '22px',
          paddingTop: '24px',
        }}
      >
        {visible.map((m, i) => (
          <Bubble key={i} m={m} />
        ))}
        {current.typing && <TypingBubble />}
      </div>
    </div>
  );
}
