import { FONT_MONO } from '@/styles/tokens';

export default function BotsPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
      <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-.02em' }}>Flujo: Seguimiento de envíos</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', justifyItems: 'center' }}>
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '12px',
            background: '#7367f0',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Inicio · WhatsApp
        </div>
        <span style={{ width: '2px', height: '18px', background: '#CEC8F5' }}></span>
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '12px',
            background: '#fff',
            border: '1px solid #CEC8F5',
            fontSize: '14px',
          }}
        >
          ¿En qué podemos ayudarte?
        </div>
        <span
          style={{
            width: '60%',
            height: '18px',
            border: '2px solid #CEC8F5',
            borderBottom: 'none',
            borderRadius: '10px 10px 0 0',
          }}
        ></span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
            gap: '10px',
            width: '100%',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              background: '#fff',
              border: '1px solid #CEC8F5',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            Rastrear pedido
          </div>
          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              background: '#fff',
              border: '1px solid #CEC8F5',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            Cambiar dirección
          </div>
          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              background: '#04081c',
              color: '#fff',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            Hablar con agente
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
            gap: '10px',
            width: '100%',
            fontFamily: FONT_MONO,
            fontSize: '11px',
            color: '#636262',
            textAlign: 'center',
          }}
        >
          <span>API · tracking</span>
          <span>IA · validación</span>
          <span>→ SimpleAgents</span>
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
        Sin código · lógica profunda · publicación en 1 clic
      </span>
    </div>
  );
}
