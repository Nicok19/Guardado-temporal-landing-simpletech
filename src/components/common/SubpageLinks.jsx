import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

/**
 * Tarjetas con links a subpáginas. Se usa en la página base de cada menú (resumen) y al pie de
 * cada subpágina para ir a las otras de la misma sección.
 * `items` = [{ label, desc, href }] (los mismos ítems del menú, ver data/navigation.js)
 * `title` = texto chico arriba de las tarjetas · `background` = color de fondo de la sección
 */
export default function SubpageLinks({ title, items, background = '#fff' }) {
  return (
    <section style={{ background, color: '#00249C', padding: 'clamp(64px,7vw,104px) var(--page-x)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        {title && (
          <span
            data-reveal="1"
            style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em', textTransform: 'uppercase' }}
          >
            {title}
          </span>
        )}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,220px),1fr))', gap: '12px' }}
        >
          {items.map((it, i) => (
            <SmartLink
              key={it.href}
              className="hv-lift-4 hv-bd-blue"
              data-reveal={Math.min(i + 1, 4)}
              href={it.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '28px',
                borderRadius: '24px',
                background: '#fff',
                border: '1px solid #DADAE4',
                minHeight: '190px',
                transition: 'all .4s cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.15 }}>
                {it.label}
              </span>
              {it.desc && <span style={{ fontSize: '15px', lineHeight: 1.5, color: '#636262' }}>{it.desc}</span>}
              <span style={{ marginTop: 'auto', fontFamily: FONT_MONO, fontSize: '16px' }}>→</span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
