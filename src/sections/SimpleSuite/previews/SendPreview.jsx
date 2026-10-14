import { useEffect, useRef } from 'react';
import { FONT_MONO } from '@/styles/tokens';

export default function SendPreview() {
  const barRef = useRef(null);

  // Barra de progreso del envío: arranca en 8% y avanza hasta 83%.
  useEffect(() => {
    const t = setTimeout(() => {
      const b = barRef.current;
      if (!b) return;
      b.style.transition = 'width 5s cubic-bezier(.3,.6,.2,1)';
      b.style.width = '83%';
    }, 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-.02em' }}>
            Campaña · Recordatorio de pago
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#636262' }}>WhatsApp + SMS fallback</span>
        </div>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: '11px',
            padding: '6px 10px',
            borderRadius: '999px',
            background: 'rgba(40,199,111,.15)',
            color: '#137a41',
          }}
        >
          ENVIANDO
        </span>
      </div>
      <div style={{ height: '10px', borderRadius: '999px', background: '#DADAE4', overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', width: '8%', background: '#28c76f', borderRadius: '999px' }}></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '10px' }}>
        <div
          style={{
            padding: '16px',
            borderRadius: '14px',
            background: '#fff',
            border: '1px solid #DADAE4',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: '#636262' }}>ENTREGADOS</span>
          <span style={{ fontSize: '24px', fontWeight: 700 }}>98,2%</span>
        </div>
        <div
          style={{
            padding: '16px',
            borderRadius: '14px',
            background: '#fff',
            border: '1px solid #DADAE4',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: '#636262' }}>LEÍDOS</span>
          <span style={{ fontSize: '24px', fontWeight: 700 }}>87,5%</span>
        </div>
        <div
          style={{
            padding: '16px',
            borderRadius: '14px',
            background: '#fff',
            border: '1px solid #DADAE4',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: '#636262' }}>RESPUESTA</span>
          <span style={{ fontSize: '24px', fontWeight: 700 }}>41%</span>
        </div>
      </div>
      <div
        style={{
          marginTop: 'auto',
          padding: '14px',
          borderRadius: '14px',
          background: '#04081c',
          color: '#F9F6EE',
          fontSize: '13px',
          lineHeight: 1.5,
        }}
      >
        Hola {'{{nombre}}'}, te recordamos que tu cuota vence el 30/09. ¿Querés pagar ahora?
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(249,246,238,.3)',
              fontSize: '12px',
            }}
          >
            Pagar
          </span>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(249,246,238,.3)',
              fontSize: '12px',
            }}
          >
            Más tarde
          </span>
        </div>
      </div>
    </div>
  );
}
