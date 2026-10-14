import { FONT_MONO } from '@/styles/tokens';

const INBOX = [
  { name: 'Martina R.', ch: 'WA', last: 'Necesito reprogramar la entrega', bg: '#fff' },
  { name: 'Diego P.', ch: 'IG', last: '¿Tienen stock del modelo azul?', bg: 'transparent' },
  { name: 'Ana L.', ch: 'WEB', last: 'Gracias, quedó resuelto', bg: 'transparent' },
  { name: 'Carlos M.', ch: 'FB', last: 'Bot · consultando estado…', bg: 'transparent' },
];

export default function AgentsPreview() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,.9fr) minmax(0,1.3fr)',
        gap: '14px',
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {INBOX.map((c) => (
          <div
            key={c.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              padding: '12px',
              borderRadius: '12px',
              background: c.bg,
              border: '1px solid #DADAE4',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{c.name}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: '#636262' }}>{c.ch}</span>
            </div>
            <span
              style={{
                fontSize: '12px',
                color: '#636262',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {c.last}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '14px',
          borderRadius: '14px',
          background: '#fff',
          border: '1px solid #DADAE4',
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: '10px',
            color: '#636262',
            letterSpacing: '.1em',
          }}
        >
          BOT → AGENTE · 00:42
        </span>
        <div
          style={{
            alignSelf: 'flex-start',
            maxWidth: '90%',
            padding: '10px 12px',
            borderRadius: '12px',
            background: '#DADAE4',
            fontSize: '13px',
          }}
        >
          Necesito reprogramar la entrega.
        </div>
        <div
          style={{
            alignSelf: 'flex-end',
            maxWidth: '90%',
            padding: '10px 12px',
            borderRadius: '12px',
            background: '#00cfe8',
            color: '#04081c',
            fontSize: '13px',
          }}
        >
          Listo, queda para el jueves de 9 a 12 h.
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <span
            style={{
              fontSize: '11px',
              padding: '5px 9px',
              borderRadius: '999px',
              border: '1px solid #DADAE4',
            }}
          >
            Respuesta sugerida IA
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '5px 9px',
              borderRadius: '999px',
              border: '1px solid #DADAE4',
            }}
          >
            Etiquetar
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '5px 9px',
              borderRadius: '999px',
              border: '1px solid #DADAE4',
            }}
          >
            Transferir
          </span>
        </div>
      </div>
    </div>
  );
}
