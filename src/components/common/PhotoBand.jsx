import CoverImage from '@/components/common/CoverImage';

/**
 * Foto ancha debajo del encabezado de una página (mismo fondo que PageHero): Nosotros, Cómo trabajamos, Ecosistema.
 * `photo` = { src, alt, position } (ej. TEAM.photo, METHOD_PHOTO, ECOSISTEMA_PHOTOS)
 */
export default function PhotoBand({ photo }) {
  return (
    <section style={{ background: '#F9F6EE', padding: '0 var(--page-x) clamp(56px,6vw,88px)' }}>
      <div data-reveal="2" style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <CoverImage
          {...photo}
          priority
          sizes="(max-width: 1400px) 100vw, 1400px"
          style={{ position: 'relative', height: 'clamp(240px,34vw,480px)', borderRadius: '28px' }}
        />
      </div>
    </section>
  );
}
