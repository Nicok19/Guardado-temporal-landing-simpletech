// Unsplash redimensiona por parámetro `w`: así cada dispositivo baja solo el tamaño que necesita.
const SRCSET_WIDTHS = [480, 800, 1200, 1600];
const unsplashSrcSet = (src) =>
  src.includes('images.unsplash.com')
    ? SRCSET_WIDTHS.map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ')
    : undefined;

/**
 * Imagen que cubre su contenedor (object-fit: cover).
 * - `priority`: imagen principal visible al cargar (no lazy, alta prioridad → mejor LCP).
 * - `sizes`: ancho que ocupa en pantalla, para elegir el tamaño del srcset.
 * - `position`: encuadre de la foto (object-position), ej. 'right center'.
 * Sin `src` muestra un placeholder con el texto `placeholder`.
 */
export default function CoverImage({
  src,
  alt = '',
  placeholder,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  position,
  style,
}) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      {src ? (
        <img
          src={src}
          srcSet={unsplashSrcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            fontSize: '12px',
            color: '#8fa0d8',
            background: 'rgba(178,220,255,.06)',
          }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
