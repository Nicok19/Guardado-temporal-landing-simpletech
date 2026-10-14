import Icon from '@/sections/ProductShowcase/icons';
import { IconTile } from '@/sections/ProductShowcase/ui';

/** Qué resuelve la plataforma: cuatro tarjetas con ícono debajo del hero. Estática. `items` = [{ icon, t, d }] */
export default function ModuleSolutionsSection({ items }) {
  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(72px,8vw,112px)' }}>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
          gap: '12px',
        }}
      >
        {items.map((s, i) => (
          <div
            key={s.t}
            data-reveal={Math.min(i + 1, 4)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              padding: '26px',
              borderRadius: '22px',
              background: '#fff',
              border: '1px solid #DADAE4',
            }}
          >
            <IconTile size={40}>
              <Icon name={s.icon} />
            </IconTile>
            <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em' }}>{s.t}</span>
            <span style={{ fontSize: '14px', lineHeight: 1.55, color: '#636262' }}>{s.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
