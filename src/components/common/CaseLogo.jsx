/**
 * Logo del cliente de un caso; si no tiene logo, muestra el nombre.
 * `item.logoWhite` = el logo viene en color: se pasa a blanco para que se lea sobre fondo oscuro.
 */
export default function CaseLogo({ item, maxWidth, shadow = true, fallbackSize = '24px' }) {
  if (!item.logo)
    return <span style={{ fontSize: fallbackSize, fontWeight: 800, letterSpacing: '-.04em' }}>{item.client}</span>;
  const filters = [item.logoWhite && 'brightness(0) invert(1)', shadow && 'drop-shadow(0 2px 12px rgba(0,0,0,.35))'];
  return (
    <img
      src={item.logo}
      alt={item.client}
      loading="lazy"
      decoding="async"
      style={{
        height: item.logoH,
        width: 'auto',
        maxWidth,
        display: 'block',
        filter: filters.filter(Boolean).join(' ') || undefined,
      }}
    />
  );
}
