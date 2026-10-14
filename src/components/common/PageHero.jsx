import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

/**
 * Encabezado de una subpágina (/ecosistema/api, /blog/webinars, ...):
 * breadcrumb hacia la página padre, título (h1) y bajada opcional.
 * `parent` = { label, href } (sin `parent` no hay breadcrumb: página base, ej. /blog) · `title` · `lead`
 */
export default function PageHero({ parent, title, lead }) {
  return (
    <section
      style={{
        background: '#F9F6EE',
        color: '#00249C',
        padding: 'clamp(150px,15vw,190px) var(--page-x) clamp(48px,5vw,72px)',
      }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        {parent && (
          <nav
            aria-label="Breadcrumb"
            data-reveal="1"
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              alignItems: 'center',
              fontFamily: FONT_MONO,
              fontSize: '11px',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: '#636262',
            }}
          >
            <SmartLink className="hv-c-ink" href={parent.href} style={{ color: '#636262' }}>
              {parent.label}
            </SmartLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page" style={{ color: '#00249C' }}>
              {title}
            </span>
          </nav>
        )}
        <h1
          data-reveal="2"
          style={{
            margin: 0,
            fontSize: 'clamp(44px,6vw,92px)',
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: '-.05em',
            textWrap: 'balance',
          }}
        >
          {title}
          <span style={{ color: '#DCD291' }}>.</span>
        </h1>
        {lead && (
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: 'clamp(17px,1.4vw,20px)',
              lineHeight: 1.55,
              color: '#636262',
              maxWidth: '640px',
              textWrap: 'pretty',
            }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
