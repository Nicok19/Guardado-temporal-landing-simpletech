import { useState } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import CaseLogo from '@/components/common/CaseLogo';
import { CASES, toCaseView } from '@/data/cases';
import { FONT_MONO } from '@/styles/tokens';

const AUTOPLAY_MS = 6500;

/**
 * Casos con SimpleBots en pestañas que avanzan solas (estilo gorgias.com): a la izquierda la lista
 * con barra de progreso; a la derecha la foto del caso con su métrica. Pausa con el mouse encima. Isla.
 */
export default function CaseTabsSection({ cases }) {
  const items = cases.slugs.map((slug) => toCaseView(CASES.find((c) => c.slug === slug)));
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const running = !reduced && !paused;
  useInterval(() => setActive((i) => (i + 1) % items.length), running ? AUTOPLAY_MS : null);

  return (
    <section style={{ background: '#fff', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        className="sb-tabs"
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <span
              data-reveal="1"
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                fontFamily: FONT_MONO,
                fontSize: '12px',
                letterSpacing: '.2em',
                color: '#04081c',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00249C' }}></span>
              {cases.kicker}
            </span>
            <h2
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(32px,4vw,56px)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-.045em',
                color: '#00249C',
                textWrap: 'balance',
              }}
            >
              {cases.title}
            </h2>
          </div>
          <div role="tablist" aria-label={cases.kicker} style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((c, i) => {
              const on = i === active;
              return (
                <div
                  key={c.slug}
                  tabIndex={0}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActive(i))}
                  style={{
                    all: 'unset',
                    boxSizing: 'border-box',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '14px 0 14px 22px',
                    cursor: 'pointer',
                  }}
                >
                  {/* Línea lateral: gris; la activa se llena durante el tiempo de autoplay */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '10px',
                      bottom: '10px',
                      width: '3px',
                      borderRadius: '3px',
                      background: '#e6e4ee',
                      overflow: 'hidden',
                    }}
                  >
                    {on && (
                      <span
                        key={`${active}-${running}`}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          background: '#00249C',
                          transformOrigin: 'top',
                          animation: running ? `sb-fill ${AUTOPLAY_MS}ms linear forwards` : 'none',
                        }}
                      ></span>
                    )}
                  </span>
                  <span style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid #e6e4ee',
                        fontFamily: FONT_MONO,
                        fontSize: '10px',
                        letterSpacing: '.12em',
                        color: '#636262',
                      }}
                    >
                      {c.country}
                    </span>
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        letterSpacing: '-.02em',
                        color: on ? '#00249C' : '#9AA3C7',
                        transition: 'color .3s',
                      }}
                    >
                      {c.client}
                    </span>
                  </span>
                  {/* Descripción: se despliega solo en la pestaña activa */}
                  <span
                    style={{
                      display: 'grid',
                      gridTemplateRows: on ? '1fr' : '0fr',
                      opacity: on ? 1 : 0,
                      transition: 'grid-template-rows .6s ease, opacity .6s ease',
                    }}
                  >
                    <span style={{ overflow: 'hidden', fontSize: '15px', lineHeight: 1.55, color: '#636262' }}>
                      {c.summary}{' '}
                      <SmartLink
                        href={c.href}
                        tabIndex={on ? undefined : -1}
                        style={{ color: '#00249C', fontWeight: 600, whiteSpace: 'nowrap' }}
                      >
                        Ver caso →
                      </SmartLink>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sb-tab-media" data-reveal="2">
          {items.map((c, i) => (
            <div
              key={c.slug}
              aria-hidden={i !== active}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'none' : 'scale(1.04)',
                transition: 'opacity .8s ease, transform 1.2s cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <CoverImage
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
                  background: 'rgba(0,36,156,.28)', // velo plano en azul de marca (sin degradado)
                }}
              ></div>
              <div style={{ position: 'absolute', left: '24px', top: '22px', pointerEvents: 'none' }}>
                <CaseLogo item={c} fallbackSize="26px" />
              </div>
              {/* Métrica del caso, como la tarjeta flotante de gorgias.com */}
              <div
                style={{
                  position: 'absolute',
                  left: 'clamp(16px,6%,40px)',
                  right: 'clamp(16px,6%,40px)',
                  bottom: 'clamp(16px,6%,40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '20px 22px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,.94)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 24px 48px -20px rgba(0,0,0,.5)',
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? 'none' : 'translateY(14px)',
                  transition: 'opacity .6s ease .25s, transform .7s cubic-bezier(.2,.8,.2,1) .25s',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(40px,4.4vw,60px)',
                    fontWeight: 800,
                    letterSpacing: '-.05em',
                    lineHeight: 1,
                    color: '#04081c',
                  }}
                >
                  {c.kpi}
                </span>
                <span style={{ fontSize: '15px', color: '#636262' }}>{c.kpiL}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
