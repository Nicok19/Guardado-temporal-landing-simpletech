import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import BrandShape from '@/components/common/BrandShape';
import { FONT_MONO } from '@/styles/tokens';

const factLabel = { fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.16em', color: '#8fa0d8' };

/** Cabecera del caso: breadcrumb, logo, título, datos clave y foto con productos usados. */
export default function HeroSection({ caseItem, study }) {
  return (
    <section
      style={{
        position: 'relative',
        background: '#04081c',
        color: '#F9F6EE',
        padding: 'clamp(150px,14vw,190px) var(--page-x) clamp(64px,7vw,100px)',
        overflow: 'hidden',
      }}
    >
      <BrandShape
        fill="#b2dcff"
        style={{
          position: 'absolute',
          left: '-160px',
          bottom: '-200px',
          width: '520px',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))',
          gap: 'clamp(32px,4vw,64px)',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
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
              color: '#8fa0d8',
            }}
          >
            <SmartLink className="hv-c-gold" href="/soluciones#casos" style={{ color: '#8fa0d8' }}>
              CASOS DE ÉXITO
            </SmartLink>
            <span>/</span>
            <span style={{ color: '#DCD291' }}>{caseItem.clientU}</span>
          </nav>
          {caseItem.logo && (
            <img
              data-reveal="1"
              src={caseItem.logo}
              alt={caseItem.client}
              style={{
                height: 'clamp(30px,3vw,42px)',
                width: 'auto',
                alignSelf: 'flex-start',
                display: 'block',
                filter: caseItem.logoWhite ? 'brightness(0) invert(1)' : undefined,
              }}
            />
          )}
          <h1
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(36px,4.2vw,60px)',
              lineHeight: 0.98,
              fontWeight: 800,
              letterSpacing: '-.045em',
              textWrap: 'balance',
            }}
          >
            {caseItem.headline}
          </h1>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              maxWidth: '520px',
              fontSize: 'clamp(17px,1.4vw,20px)',
              lineHeight: 1.55,
              color: '#DADAE4',
              textWrap: 'pretty',
            }}
          >
            {study.lead}
          </p>
          <div
            data-reveal="3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
              gap: '1px',
              borderRadius: '18px',
              overflow: 'hidden',
              background: 'rgba(178,220,255,.14)',
              border: '1px solid rgba(178,220,255,.14)',
            }}
          >
            {study.facts.map((f) => (
              <div
                key={f.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '16px 18px',
                  background: '#04081c',
                }}
              >
                <span style={factLabel}>{f.label}</span>
                <span style={{ fontSize: '15px', fontWeight: 600 }}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          data-reveal="2"
          style={{
            position: 'relative',
            minHeight: 'clamp(380px,42vw,600px)',
            borderRadius: '28px',
            overflow: 'hidden',
            background: '#0b1233',
          }}
        >
          <CoverImage
            priority
            placeholder={`Foto del caso ${caseItem.client}`}
            src={caseItem.photo}
            position={caseItem.photoPosition}
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
              background: 'linear-gradient(0deg,rgba(4,8,28,.75),transparent 45%)',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              left: '24px',
              right: '24px',
              bottom: '24px',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              pointerEvents: 'none',
            }}
          >
            {caseItem.prods.map((p) => (
              <span
                key={p.name}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '999px',
                  background: 'rgba(4,8,28,.6)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(178,220,255,.2)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }}></span>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
