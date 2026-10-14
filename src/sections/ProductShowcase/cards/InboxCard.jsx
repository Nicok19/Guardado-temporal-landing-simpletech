import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, ChatLog, IconTile, LINE, SKY, panel, panelHead, panelSub } from '../ui';

/**
 * Bandeja unificada: entran conversaciones de distintos canales y el agente responde la primera.
 * data = { title, inbox, conversations: [{ ch, name, last, tag }], chat: [{ t, out? }] }
 */
export default function InboxCard({ data, step, reduced, reveal }) {
  const n = data.conversations.length;
  const cycle = n + data.chat.length + 3;
  const s = reduced ? cycle - 1 : step % cycle;
  const listCount = Math.min(s + 1, n); // primero llegan las conversaciones...
  const chatCount = Math.max(0, s - n + 1); // ...después el agente responde la primera
  const active = data.conversations[0];

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div className="sb-inbox">
        <div style={panel}>
          <div style={panelHead}>
            Bandeja
            <span style={panelSub}>{data.inbox}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {data.conversations.map((c, i) => {
              const show = i < listCount;
              const on = i === 0;
              return (
                <div
                  key={c.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto minmax(0,1fr)',
                    gap: '10px',
                    alignItems: 'center',
                    padding: '10px 12px',
                    borderBottom: i < n - 1 ? `1px solid ${LINE}` : 'none',
                    background: on && show ? SKY : '#fff',
                    opacity: show ? 1 : 0,
                    transform: show ? 'none' : 'translateX(-8px)',
                    transition: 'opacity .4s ease, transform .4s cubic-bezier(.2,.8,.2,1), background .4s',
                  }}
                >
                  <IconTile size={30} radius="50%" bg={on ? BLUE : SKY} color={on ? '#fff' : BLUE}>
                    <Icon name={c.ch} size={15} />
                  </IconTile>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#04081c' }}>{c.name}</span>
                      <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '.1em', color: BLUE }}>
                        {c.tag.toUpperCase()}
                      </span>
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#636262',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {c.last}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={panel}>
          <div style={panelHead}>
            {active.name}
            <span style={{ ...panelSub, color: BLUE }}>MODO AGENTE</span>
          </div>
          <div style={{ padding: '12px' }}>
            <ChatLog messages={data.chat} count={chatCount} minHeight="170px" />
          </div>
        </div>
      </div>
    </Card>
  );
}
