import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import CaseLogo from '@/components/common/CaseLogo';
import { FONT_MONO } from '@/styles/tokens';

/** Otros casos de éxito (cases ya vienen pasados por toCaseView). */
export default function MoreCasesSection({ cases }) {
  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '24px', flexWrap: 'wrap' }}
        >
          <h2
            data-reveal="1"
            style={{
              margin: 0,
              fontSize: 'clamp(32px,3.6vw,52px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-.04em',
            }}
          >
            Más casos de éxito.
          </h2>
          <SmartLink
            className="hv-c-ink"
            data-reveal="2"
            href="/soluciones#casos"
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontSize: '15px',
              fontWeight: 600,
              color: '#00249C',
            }}
          >
            Ver todos{' '}
            <span
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#00249C',
                color: '#F9F6EE',
                display: 'grid',
                placeItems: 'center',
                fontFamily: FONT_MONO,
              }}
            >
              →
            </span>
          </SmartLink>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap: '16px' }}
        >
          {cases.map((c) => (
            <SmartLink
              key={c.client}
              className="hv-lift-6 hv-c-cream"
              href={c.href}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '24px',
                minHeight: '300px',
                padding: '24px',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#04081c',
                color: '#F9F6EE',
                transition: 'transform .45s cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <CoverImage
                sizes="(max-width: 768px) 100vw, 400px"
                placeholder={c.photoPh}
                src={c.photo}
                position={c.photoPosition}
                style={{ position: 'absolute', inset: 0 }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(135deg,rgba(0,36,156,.55),rgba(4,8,28,.15) 60%)',
                  mixBlendMode: 'multiply',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(0deg,rgba(4,8,28,.85),rgba(4,8,28,.1) 60%,rgba(4,8,28,.5))',
                }}
              ></div>
              <div style={{ position: 'relative', pointerEvents: 'none' }}>
                <CaseLogo item={c} fallbackSize="24px" maxWidth="180px" shadow={false} />
              </div>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '10.5px',
                    letterSpacing: '.14em',
                    color: '#DCD291',
                  }}
                >
                  {c.ind} · {c.country}
                </span>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    letterSpacing: '-.02em',
                    lineHeight: 1.2,
                    textWrap: 'pretty',
                  }}
                >
                  {c.headline}
                </span>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
