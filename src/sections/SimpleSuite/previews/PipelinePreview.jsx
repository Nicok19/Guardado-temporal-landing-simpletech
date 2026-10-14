import { FONT_MONO } from '@/styles/tokens';

const node = {
  padding: '10px 14px',
  borderRadius: '12px',
  background: '#fff',
  border: '1px solid #DADAE4',
  fontSize: '13px',
  textAlign: 'center',
};
const line = { width: '2px', height: '16px', background: '#FDD3B4', justifySelf: 'center' };
const AGENTS = ['Agente Ventas', 'Agente Postventa', 'Agente FAQ'];

/** Vista previa de SimplePipeline: un flujo con router, agentes especializados e integración. */
export default function PipelinePreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
      <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-.02em' }}>Flujo: Venta de viajes</span>
      <div style={{ display: 'grid', gap: '8px' }}>
        <div style={{ ...node, justifySelf: 'center', background: '#28c76f', color: '#fff', border: 'none' }}>
          Mensaje entrante · WhatsApp
        </div>
        <span style={line}></span>
        <div style={{ ...node, justifySelf: 'center', background: '#f97316', color: '#fff', border: 'none' }}>
          Router · clasifica la intención
        </div>
        <span style={line}></span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '8px' }}>
          {AGENTS.map((a, i) => (
            <div key={a} style={{ ...node, ...(i === 0 && { borderColor: '#f97316', fontWeight: 600 }) }}>
              {a}
            </div>
          ))}
        </div>
        <span style={line}></span>
        <div style={{ ...node, justifySelf: 'center', background: '#04081c', color: '#fff', border: 'none' }}>
          API · Sistema de reservas
        </div>
      </div>
      <span style={{ marginTop: 'auto', fontFamily: FONT_MONO, fontSize: '12px', color: '#636262' }}>
        Múltiples motores de IA · reglas de negocio · integración
      </span>
    </div>
  );
}
