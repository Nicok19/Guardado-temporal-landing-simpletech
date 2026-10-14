import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';
import { pad2 } from '@/utils/format';

/**
 * Soluciones implementadas para el cliente: filas que alternan imagen y texto.
 * `title` · `items` = [{ area, text, benefits, img, alt }] · `related` = [{ label, href }] (casos relacionados)
 */
export default function SolutionsSection({ title, items, related = [] }) {
  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(48px,6vw,88px)',
        }}
      >
        <h2
          data-reveal="1"
          style={{
            margin: 0,
            fontSize: 'clamp(32px,4vw,56px)',
            lineHeight: 1.02,
            fontWeight: 800,
            letterSpacing: '-.04em',
          }}
        >
          {title}
          <span style={{ color: '#DCD291' }}>.</span>
        </h2>
        {items.map((it, i) => (
          <article
            key={it.area}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: i % 2 ? 'row-reverse' : 'row',
              gap: 'clamp(28px,4vw,56px)',
              alignItems: 'center',
            }}
          >
            <img
              data-reveal="1"
              src={it.img}
              alt={it.alt}
              loading="lazy"
              decoding="async"
              width="1024"
              height="458"
              style={{
                flex: '1 1 420px',
                minWidth: 0,
                width: '100%',
                height: 'auto',
                aspectRatio: '1024 / 458',
                objectFit: 'cover',
                borderRadius: '24px',
                display: 'block',
              }}
            />
            <div data-reveal="2" style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
                {pad2(i + 1)} · SOLUCIÓN
              </span>
              <h3 style={{ margin: 0, fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 700, letterSpacing: '-.03em' }}>
                {it.area}
              </h3>
              <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#04081c', textWrap: 'pretty' }}>
                {it.text}
              </p>
              <p
                style={{
                  margin: 0,
                  paddingLeft: '16px',
                  borderLeft: '2px solid #DCD291',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#636262',
                  textWrap: 'pretty',
                }}
              >
                {it.benefits}
              </p>
            </div>
          </article>
        ))}
        {related.length > 0 && (
          <div
            data-reveal="1"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              paddingTop: '32px',
              borderTop: '1px solid #DADAE4',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 600, marginRight: '8px' }}>Conocé los casos completos:</span>
            {related.map((r) => (
              <SmartLink
                key={r.href}
                className="hv-bg-blue hv-c-cream"
                href={r.href}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '12px 20px',
                  borderRadius: '999px',
                  border: '1px solid #00249C',
                  transition: 'all .3s',
                }}
              >
                {r.label} <span style={{ fontFamily: FONT_MONO }}>{r.href.startsWith('/') ? '→' : '↗'}</span>
              </SmartLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
