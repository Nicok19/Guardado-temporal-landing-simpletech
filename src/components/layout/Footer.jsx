import SmartLink from '@/components/common/SmartLink';
import { SITE } from '@/config/site';
import { FOOTER_LINKS } from '@/data/navigation';
import { OFFICES } from '@/data/company';
import { FONT_MONO } from '@/styles/tokens';

const colTitle = {
  fontFamily: FONT_MONO,
  fontSize: '11px',
  letterSpacing: '.18em',
  color: '#8fa0d8',
  marginBottom: '6px',
};
const col = { display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' };

/** `reveal` = las columnas aparecen con animación al scrollear (data-reveal). */
export default function Footer({ reveal = false }) {
  const r = (n) => (reveal ? { 'data-reveal': String(n) } : {});
  return (
    <footer style={{ background: '#04081c', padding: '72px var(--page-x) 32px', color: '#DADAE4' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: '40px' }}
        >
          <div {...r(1)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img
              src={SITE.logoUrl}
              alt="simpletech®"
              loading="lazy"
              decoding="async"
              style={{ height: '26px', width: 'max-content', filter: 'brightness(0) invert(1)' }}
            />
            <span style={{ fontSize: '14px', lineHeight: 1.6, color: '#8fa0d8' }}>
              Socio estratégico en experiencia del cliente, automatización e IA.
            </span>
          </div>
          <div {...r(2)} style={col}>
            <span style={colTitle}>SITIO</span>
            {FOOTER_LINKS.map((l) => (
              <SmartLink key={l.href} href={l.href}>
                {l.label}
              </SmartLink>
            ))}
          </div>
          <div {...r(3)} style={col}>
            <span style={colTitle}>OFICINAS</span>
            {OFFICES.map((o) => (
              <span key={o.city}>
                {o.city} · <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#8fa0d8' }}>{o.phone}</span>
              </span>
            ))}
          </div>
          <div {...r(4)} style={col}>
            <span style={colTitle}>CONTACTO</span>
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
            <div style={{ display: 'flex', gap: '14px', marginTop: '6px', flexWrap: 'wrap' }}>
              {SITE.social.map((s) => (
                <SmartLink key={s.href} href={s.href}>
                  {s.label}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
        <div
          {...r(1)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            paddingTop: '24px',
            borderTop: '1px solid rgba(178,220,255,.1)',
            fontFamily: FONT_MONO,
            fontSize: '11px',
            color: '#8fa0d8',
            letterSpacing: '.08em',
          }}
        >
          <span>© 2026 SIMPLETECH®</span>
          <span>ES · EN · PT · FR</span>
        </div>
      </div>
    </footer>
  );
}
