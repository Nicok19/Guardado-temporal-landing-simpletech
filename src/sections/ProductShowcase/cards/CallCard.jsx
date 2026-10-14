import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, ChatLog, IconTile, SKY, Waveform, panel, panelHead, panelSub } from '../ui';

/**
 * Llamada en curso con un VoiceBot: onda de voz, contador, transcripción y la acción que ejecuta en tus sistemas.
 * data = { title, line, caller, transcript: [{ t, out? }], action: { t, d } }   (`out` = lo que dice el VoiceBot)
 */
export default function CallCard({ data, step, reduced, reveal }) {
  const cycle = data.transcript.length + 4;
  const s = reduced ? cycle - 1 : step % cycle;
  const done = s > data.transcript.length;
  const seconds = 12 + s * 4; // el contador avanza con la conversación
  const time = `0${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div className="sb-editor">
        <div style={{ ...panel, display: 'flex', flexDirection: 'column' }}>
          <div style={panelHead}>
            {data.line}
            <span style={{ ...panelSub, color: BLUE }}>EN CURSO · {time}</span>
          </div>
          <div
            style={{
              padding: '18px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <IconTile size={56} radius="50%" bg={BLUE} color="#fff">
              <Icon name="phone" size={24} />
            </IconTile>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#04081c' }}>{data.caller}</span>
            <Waveform active={!reduced && !done} bars={22} />
            <div
              style={{
                width: '100%',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '12px',
                background: done ? '#E8F8EF' : SKY,
                transition: 'background .4s',
              }}
            >
              <span style={{ color: done ? '#28c76f' : BLUE, display: 'grid' }}>
                <Icon name={done ? 'check' : 'plug'} size={16} strokeWidth={2.2} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#04081c' }}>
                  {done ? data.action.t : 'Consultando tus sistemas…'}
                </span>
                <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '.1em', color: '#636262' }}>
                  {data.action.d.toUpperCase()}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div style={panel}>
          <div style={panelHead}>
            Transcripción
            <span style={panelSub}>VOICEBOT · IA</span>
          </div>
          <div style={{ padding: '12px' }}>
            <ChatLog messages={data.transcript} count={s} minHeight="190px" />
          </div>
        </div>
      </div>
    </Card>
  );
}
