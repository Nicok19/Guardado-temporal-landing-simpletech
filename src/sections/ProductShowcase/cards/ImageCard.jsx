/**
 * Captura de la plataforma en lugar de una tarjeta animada (la imagen ya trae su marco y su sombra).
 * data = { src, alt }
 */
export default function ImageCard({ data, reveal }) {
  return (
    <img
      data-reveal={reveal}
      src={data.src}
      alt={data.alt}
      loading="lazy"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  );
}
