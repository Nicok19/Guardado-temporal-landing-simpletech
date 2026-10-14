import { useState } from 'react';
import SmartLink from '@/components/common/SmartLink';
import { NAV_ITEMS, menuRows } from '@/data/navigation';
import { FONT_MONO } from '@/styles/tokens';

/**
 * Submenú desplegado: una fila (título + descripción) por página, ver menuRows().
 * `columns` = grilla de N columnas (ej. SimpleSuite); un ítem con `wide` ocupa todo el ancho en una fila
 * (etiqueta, nombre y descripción una al lado de la otra); cualquier ítem puede llevar una etiqueta con `badge`
 * (ej. Academy: "Plataforma de aprendizaje").
 */
function Dropdown({ items, columns }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: '-8px',
        paddingTop: '12px',
        minWidth: '300px',
        width: columns ? `${columns * 230}px` : undefined,
      }}
    >
      <div
        style={{
          display: columns ? 'grid' : 'flex',
          gridTemplateColumns: columns ? `repeat(${columns},minmax(0,1fr))` : undefined,
          flexDirection: 'column',
          gap: '2px',
          padding: '10px',
          borderRadius: '22px',
          background: 'rgba(6,12,40,.96)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(178,220,255,.16)',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,.6)',
        }}
      >
        {items.map((it) => {
          const wide = columns && it.wide;
          return (
            <SmartLink
              key={it.href}
              className="hv-bg-sky-8 hv-c-cream"
              href={it.href}
              style={{
                display: 'flex',
                // Ítem a lo ancho (ej. Academy): etiqueta, nombre y descripción en una sola fila.
                flexDirection: wide ? 'row' : 'column',
                alignItems: wide ? 'center' : undefined,
                gap: wide ? '14px' : '3px',
                padding: '12px 14px',
                borderRadius: '14px',
                transition: 'background .25s',
                gridColumn: wide ? '1 / -1' : undefined,
                // Ítem con etiqueta (ej. Academy): borde dorado para distinguirlo de las plataformas.
                ...(it.badge && { border: '1px solid rgba(220,210,145,.35)' }),
              }}
            >
              {it.badge && (
                <span
                  style={{
                    alignSelf: wide ? 'center' : 'flex-start',
                    marginBottom: wide ? 0 : '4px',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    background: 'rgba(220,210,145,.16)',
                    color: '#DCD291',
                    fontFamily: FONT_MONO,
                    fontSize: '10px',
                    letterSpacing: '.06em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {it.badge.toUpperCase()}
                </span>
              )}
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#F9F6EE', whiteSpace: 'nowrap' }}>
                {it.label}
              </span>
              <span style={{ fontSize: '12px', color: '#8fa0d8' }}>{it.desc}</span>
            </SmartLink>
          );
        })}
      </div>
    </div>
  );
}

export default function DesktopNav({ activeId }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {NAV_ITEMS.map((n) => {
        const active = n.id === activeId;
        const open = n.id === openId;
        return (
          <div
            key={n.id}
            onMouseEnter={() => setOpenId(n.id)}
            onMouseLeave={() => setOpenId(null)}
            style={{ position: 'relative' }}
          >
            <SmartLink
              className="hv-c-white hv-bg-sky-10"
              href={n.href}
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 500,
                padding: '10px 14px',
                borderRadius: '999px',
                color: active ? '#04081c' : '#DADAE4',
                background: active ? '#DCD291' : 'transparent',
                transition: 'all .3s',
              }}
            >
              {n.label}
              {n.items && (
                <span
                  style={{
                    fontSize: '9px',
                    opacity: 0.7,
                    transform: `rotate(${open ? '180deg' : '0deg'})`,
                    transition: 'transform .3s',
                  }}
                >
                  ▼
                </span>
              )}
            </SmartLink>
            {open && n.items && <Dropdown items={menuRows(n)} columns={n.columns} />}
          </div>
        );
      })}
    </div>
  );
}
