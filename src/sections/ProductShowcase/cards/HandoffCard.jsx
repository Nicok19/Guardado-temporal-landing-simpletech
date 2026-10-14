import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, IconTile, SKY, panel } from '../ui';

const STAGES = 5; // 0 bot · 1 derivando · 2-4 agente con el contexto (aparece de a un ítem)

/**
 * Derivación del bot al agente: el modo cambia de "bot" a "agente" y llega el contexto de la conversación.
 * data = { title, from, to, context: ['Historial completo', ...] }
 */
export default function HandoffCard({ data, step, reduced, reveal }) {
  const s = reduced ? STAGES - 1 : step % (STAGES + 1);
  const agent = s >= 2;
  const moving = s === 1;
  const dark = data.blue;

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Selector de modo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '4px',
            borderRadius: '999px',
            background: dark ? 'rgba(255,255,255,.12)' : SKY,
            fontFamily: FONT_MONO,
            fontSize: '10px',
            letterSpacing: '.12em',
            textAlign: 'center',
          }}
        >
          {['MODO BOT', 'MODO AGENTE'].map((label, i) => {
            const on = (i === 1) === agent;
            return (
              <span
                key={label}
                style={{
                  padding: '8px 0',
                  borderRadius: '999px',
                  background: on ? '#fff' : 'transparent',
                  color: on ? BLUE : dark ? '#b2dcff' : '#636262',
                  transition: 'all .4s',
                }}
              >
                {label}
              </span>
            );
          })}
        </div>

        {/* Bot → agente */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '12px', alignItems: 'center' }}>
          {[{ icon: 'bot', label: data.from, on: !agent }, null, { icon: 'headset', label: data.to, on: agent }].map(
            (node, i) =>
              node ? (
                <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      transform: node.on ? 'scale(1.06)' : 'scale(.94)',
                      opacity: node.on ? 1 : 0.55,
                      transition: 'all .4s',
                    }}
                  >
                    <IconTile size={56} radius="18px" bg={node.on ? '#DCD291' : '#fff'} color={BLUE}>
                      <Icon name={node.icon} size={26} />
                    </IconTile>
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: '10px',
                      letterSpacing: '.1em',
                      color: dark ? '#F9F6EE' : '#04081c',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {node.label.toUpperCase()}
                  </span>
                </span>
              ) : (
                <span
                  key={i}
                  style={{
                    position: 'relative',
                    height: '2px',
                    marginBottom: '22px',
                    background: 'rgba(178,220,255,.35)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      left: agent ? '100%' : moving ? '100%' : '0%',
                      width: '10px',
                      height: '10px',
                      marginLeft: '-5px',
                      borderRadius: '50%',
                      background: '#DCD291',
                      opacity: moving ? 1 : 0,
                      transition: moving ? 'left 1s cubic-bezier(.65,0,.35,1), opacity .2s' : 'opacity .2s',
                    }}
                  ></span>
                </span>
              ),
          )}
        </div>

        {/* Contexto que recibe el agente */}
        <div style={{ ...panel, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.12em', color: '#636262' }}>
            EL AGENTE RECIBE
          </span>
          {data.context.map((c, i) => {
            const show = agent && i <= s - 2;
            return (
              <span
                key={c}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: '#04081c',
                  opacity: show ? 1 : 0.3,
                  transition: 'opacity .4s',
                }}
              >
                <IconTile size={22} radius="50%" bg={show ? '#E8F8EF' : SKY} color={show ? '#28c76f' : '#9AA3C7'}>
                  <Icon name="check" size={12} strokeWidth={2.6} />
                </IconTile>
                {c}
              </span>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
