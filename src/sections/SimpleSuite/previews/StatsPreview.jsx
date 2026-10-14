import { t } from '@/i18n';
import { FONT_MONO } from '@/styles/tokens';

// Iniciales de los días: se traducen juntas (en inglés, M T W T F S S) porque sueltas son ambiguas.
const DAYS = 'L M M J V S D';
const BARS = [42, 58, 51, 74, 66, 88, 80].map((h, i) => ({
  h: `${h}%`,
  c: i === 5 ? '#1e9aff' : '#b2dcff',
}));

export default function StatsPreview() {
  const days = t(DAYS).split(' ');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '10px' }}>
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
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: '#636262' }}>TIEMPO MEDIO DE RESPUESTA</span>
          <span style={{ fontSize: '28px', fontWeight: 700 }}>1m 12s</span>
          <span style={{ fontSize: '12px', color: '#137a41' }}>↓ 34% vs. mes anterior</span>
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
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: '#636262' }}>RESUELTO POR BOT</span>
          <span style={{ fontSize: '28px', fontWeight: 700 }}>72%</span>
          <span style={{ fontSize: '12px', color: '#636262' }}>de las conversaciones</span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: '160px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          padding: '16px',
          borderRadius: '14px',
          background: '#fff',
          border: '1px solid #DADAE4',
        }}
      >
        {BARS.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: '100%', height: b.h, borderRadius: '6px 6px 2px 2px', background: b.c }}></div>
            <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: '#636262' }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
