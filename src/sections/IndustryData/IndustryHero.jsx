import { useEffect, useState } from 'react';
import SmartLink from '@/components/common/SmartLink';
import { useInterval } from '@/hooks/useInterval';
import { SITE } from '@/config/site';
import { INDUSTRY_DATA } from '@/data/industries';
import { FONT_MONO } from '@/styles/tokens';

// Hero de /nosotros/datos-de-la-industria (estructura inspirada en cxtrends.zendesk.com): título y llamados a la
// izquierda; a la derecha, una tarjeta "de vidrio" que rota sola por el dato principal de cada industria, con pausa
// y puntos para elegir. Isla. Con prefers-reduced-motion no rota sola.
const SLIDES = Object.entries(INDUSTRY_DATA).map(([industry, d]) => ({ industry, value: d.pain[0], text: d.pain[1] }));
const SLIDE_MS = 4500;

export default function IndustryHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [canAuto, setCanAuto] = useState(false);

  useEffect(() => {
    setCanAuto(SITE.features.motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  useInterval(() => setI((n) => (n + 1) % SLIDES.length), canAuto && !paused ? SLIDE_MS : null);

  const s = SLIDES[i];
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: '#00249C',
        background: 'linear-gradient(135deg,#F9F6EE 0%,#F9F6EE 42%,#d6e9fd 100%)',
        padding: 'clamp(150px,15vw,190px) var(--page-x) clamp(88px,10vw,128px)',
      }}
    >
      <style>{`
        .ind-hero-stat { animation: ind-hero-in .6s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes ind-hero-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .ind-hero-stat { animation: none; } }
      `}</style>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: 'clamp(40px,5vw,72px)',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <nav
            aria-label="Breadcrumb"
            data-reveal="1"
            style={{
              display: 'flex',
              gap: '10px',
              fontFamily: FONT_MONO,
              fontSize: '11px',
              letterSpacing: '.18em',
              color: '#636262',
            }}
          >
            <SmartLink className="hv-c-ink" href="/nosotros" style={{ color: '#636262' }}>
              NOSOTROS
            </SmartLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page" style={{ color: '#00249C' }}>
              DATOS DE LA INDUSTRIA
            </span>
          </nav>
          <h1
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(42px,5vw,76px)',
              lineHeight: 0.98,
              fontWeight: 800,
              letterSpacing: '-.05em',
              textWrap: 'balance',
            }}
          >
            Lo que viven las empresas de cada sector<span style={{ color: '#DCD291' }}>.</span>
          </h1>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: 'clamp(16px,1.3vw,19px)',
              lineHeight: 1.6,
              color: '#636262',
              maxWidth: '540px',
            }}
          >
            Los desafíos de experiencia del cliente que más se repiten en cada industria y los números que los explican.
            Datos de mercado y de nuestros proyectos en la región, para que sepas dónde está tu operación.
          </p>
          <div data-reveal="3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <SmartLink
              className="hv-bg-gold hv-c-blue"
              href="#industrias"
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 26px',
                borderRadius: '999px',
                background: '#00249C',
                color: '#F9F6EE',
                fontWeight: 700,
                fontSize: '15px',
                transition: 'all .3s',
              }}
            >
              Ver las industrias <span style={{ fontFamily: FONT_MONO }}>↓</span>
            </SmartLink>
            <SmartLink
              className="hv-bd-blue"
              href="/#contacto"
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 26px',
                borderRadius: '999px',
                border: '1px solid #DADAE4',
                color: '#00249C',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all .3s',
              }}
            >
              Conversemos <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>

        {/* Tarjeta de vidrio con el dato principal de cada industria */}
        <div
          data-reveal="3"
          style={{
            justifySelf: 'center',
            width: '100%',
            maxWidth: '440px',
            padding: 'clamp(28px,3vw,40px)',
            borderRadius: '28px',
            background: 'rgba(255,255,255,.55)',
            border: '1px solid rgba(255,255,255,.9)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 40px 80px -40px rgba(0,36,156,.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            key={i}
            className="ind-hero-stat"
            aria-live="polite"
            style={{ display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '190px' }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.2em', color: '#636262' }}>
              {s.industry.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: 'clamp(48px,5vw,72px)',
                fontWeight: 800,
                letterSpacing: '-.05em',
                lineHeight: 0.92,
              }}
            >
              {s.value}
            </span>
            <span style={{ fontSize: '16px', lineHeight: 1.5, color: '#04081c' }}>{s.text}</span>
          </div>
          {/* Pausa + puntos (como los controles del carrusel de la referencia) */}
          <div
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px 6px 6px',
              borderRadius: '999px',
              border: '1px solid rgba(4,8,28,.15)',
              background: 'rgba(255,255,255,.6)',
            }}
          >
            {canAuto && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Reanudar' : 'Pausar'}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1.5px solid #04081c',
                  background: 'transparent',
                  color: '#04081c',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  {paused ? (
                    <path d="M2 1l7 4-7 4z" fill="currentColor" />
                  ) : (
                    <path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" />
                  )}
                </svg>
              </button>
            )}
            {SLIDES.map((sl, n) => (
              <button
                key={sl.industry}
                type="button"
                onClick={() => setI(n)}
                aria-label={sl.industry}
                aria-current={n === i || undefined}
                style={{
                  width: n === i ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: n === i ? '#00249C' : 'rgba(4,8,28,.25)',
                  transition: 'all .3s',
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
