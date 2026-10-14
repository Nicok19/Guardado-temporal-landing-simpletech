import { HERO_CHAT, HERO_CHAT_TYPING } from '@/data/home';
import { panelStyle } from './panel';

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

function Bubble({ m }) {
  const agentStyle = {
    ...bubbleBase,
    background: m.human ? 'rgba(168,85,247,.16)' : 'rgba(178,220,255,.08)',
    border: '1px solid rgba(178,220,255,.14)',
    borderBottomLeftRadius: '4px',
    color: '#F9F6EE',
  };
  const clientStyle = { ...bubbleBase, background: '#F9F6EE', color: '#00249C', borderBottomRightRadius: '4px' };
  return (
    <div
      className="st-msg"
      style={{ flex: 'none', display: 'flex', justifyContent: m.agent ? 'flex-start' : 'flex-end' }}
    >
      <div style={m.agent ? agentStyle : clientStyle}>
        <span
          style={{
            fontSize: '10.5px',
            fontWeight: 600,
            color: m.human ? '#c79bff' : m.agent ? '#DCD291' : '#00249C',
            opacity: m.agent ? 1 : 0.7,
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
          background: 'rgba(178,220,255,.08)',
          border: '1px solid rgba(178,220,255,.14)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="st-typing-dot"
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DCD291' }}
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
