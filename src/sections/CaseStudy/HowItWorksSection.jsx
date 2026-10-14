import { FONT_MONO } from '@/styles/tokens';
import { pad2 } from '@/utils/format';

/**
 * Cómo funciona la solución, paso a paso. `steps` = [{ t, d, dot }]
 * `image` = { src, alt } opcional: se muestra al costado y los pasos quedan en una columna.
 */
export default function HowItWorksSection({ title, label, steps, image }) {
  return (
    <section
      style={{
        position: 'relative',
        background: '#04081c',
        color: '#F9F6EE',
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '32px', flexWrap: 'wrap' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span
              data-reveal="1"
              style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em', color: '#DCD291' }}
            >
              CÓMO FUNCIONA
            </span>
            <h2
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(36px,4.4vw,64px)',
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: '-.045em',
                maxWidth: '720px',
                textWrap: 'balance',
              }}
            >
              {title}
            </h2>
          </div>
          <span
            data-reveal="3"
            style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.14em', color: '#8fa0d8' }}
          >
            {label}
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {image && (
            <img
              data-reveal="1"
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', borderRadius: '24px', display: 'block', background: '#fff' }}
            />
          )}
          <div
            data-reveal="2"
            style={{
              display: 'grid',
              gridTemplateColumns: image ? '1fr' : 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
              gap: '12px',
              gridColumn: image ? 'auto' : '1 / -1',
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.t}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: '22px',
                  borderRadius: '20px',
                  background: 'rgba(8,14,44,.8)',
                  border: '1px solid rgba(178,220,255,.14)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.14em', color: '#8fa0d8' }}>
                    {pad2(i + 1)}
                  </span>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: s.dot,
                      boxShadow: `0 0 14px ${s.dot}`,
                    }}
                  ></span>
                </div>
                <span style={{ fontSize: '19px', fontWeight: 700, letterSpacing: '-.02em' }}>{s.t}</span>
                <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#DADAE4' }}>{s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
