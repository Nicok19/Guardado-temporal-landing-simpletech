import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, ChatLog, LINE, SKY, panel, panelHead, panelSub } from '../ui';

/**
 * Editor de flujos + prueba en vivo: las reglas se "ejecutan" mientras el chat avanza.
 * data = { title, flowName, rules: [{ t, v }], action, chat: [{ t, out? }], panels?: { rules, test } }
 */
export default function EditorCard({ data, step, reduced, reveal }) {
  const cycle = data.chat.length + 3; // mensajes + pausa al final
  const s = reduced ? data.chat.length : step % cycle;
  const activeRule = Math.min(s, data.rules.length);
  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div className="sb-editor">
        <div style={panel}>
          <div style={panelHead}>
            {data.panels?.rules ?? 'Árbol de decisión'}
            <span style={panelSub}>{data.flowName}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px' }}>
            {data.rules.map((r, i) => {
              const on = i === activeRule || (i < activeRule && s > 0);
              return (
                <div
                  key={r.t}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: `1px solid ${on ? BLUE : LINE}`,
                    background: on ? SKY : '#fff',
                    transition: 'all .4s',
                  }}
                >
                  <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '.12em', color: '#636262' }}>
                    {r.t.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#04081c' }}>{r.v}</span>
                </div>
              );
            })}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontSize: '12px',
                color: activeRule >= data.rules.length ? '#28c76f' : '#636262',
                transition: 'color .4s',
              }}
            >
              <Icon name="check" size={14} strokeWidth={2.2} />
              {data.action}
            </div>
          </div>
        </div>
        <div style={panel}>
          <div style={panelHead}>
            {data.panels?.test ?? 'Probar bot'}
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c76f' }}></span>
          </div>
          <div style={{ padding: '12px' }}>
            <ChatLog messages={data.chat} count={s} />
          </div>
        </div>
      </div>
    </Card>
  );
}
