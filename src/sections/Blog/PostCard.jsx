import SmartLink from '@/components/common/SmartLink';
import { numberLocale } from '@/i18n';
import { FONT_MONO } from '@/styles/tokens';

/** Fecha de un artículo en el idioma de la página (14 de octubre de 2026 / October 14, 2026…). */
export const formatPostDate = (iso) =>
  new Date(iso).toLocaleDateString(numberLocale(), { day: 'numeric', month: 'long', year: 'numeric' });

/** Tarjeta de un artículo (listado del blog y "Más artículos"). `large` = la del destacado, con la foto al costado. */
export default function PostCard({ post, large = false }) {
  return (
    <SmartLink
      href={`/blog/${post.slug}`}
      className="hv-bd-blue blog-card"
      style={{
        display: 'grid',
        gridTemplateColumns: large ? 'repeat(auto-fit,minmax(min(100%,360px),1fr))' : 'minmax(0,1fr)',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid #DADAE4',
        color: '#00249C',
        transition: 'border-color .3s',
        height: '100%',
        // La foto arriba y el texto pegado a ella: el alto sobrante (tarjetas de la misma fila) queda abajo.
        gridTemplateRows: large ? undefined : 'auto 1fr',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: large ? 'auto' : '16 / 9',
          minHeight: large ? '260px' : 0,
          background: '#0b1233',
        }}
      >
        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt}
            loading={large ? 'eager' : 'lazy'}
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: large ? 'clamp(24px,3vw,40px)' : '22px',
          justifyContent: large ? 'center' : 'flex-start',
        }}
      >
        <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.14em', color: '#636262' }}>
          {[formatPostDate(post.date), `${post.minutes} MIN`].join(' · ').toUpperCase()}
        </span>
        <span
          style={{
            fontSize: large ? 'clamp(26px,2.6vw,38px)' : '20px',
            fontWeight: 800,
            letterSpacing: '-.03em',
            lineHeight: 1.12,
            textWrap: 'balance',
          }}
        >
          {post.title}
        </span>
        <span
          style={{
            fontSize: large ? '17px' : '14.5px',
            lineHeight: 1.55,
            color: '#636262',
            display: '-webkit-box',
            WebkitLineClamp: large ? 4 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </span>
        {post.categories.length > 0 && (
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '6px' }}>
            {post.categories.slice(0, 3).map((c) => (
              <span
                key={c}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: '#F9F6EE',
                  border: '1px solid #DADAE4',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {c}
              </span>
            ))}
          </span>
        )}
      </div>
    </SmartLink>
  );
}
