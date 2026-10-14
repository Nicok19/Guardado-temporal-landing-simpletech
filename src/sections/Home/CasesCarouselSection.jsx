import { useEffect, useRef, useState } from 'react';
import CaseLogo from '@/components/common/CaseLogo';
import { useInterval } from '@/hooks/useInterval';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SITE } from '@/config/site';
import { CASES, toCaseView } from '@/data/cases';
import { pad2 } from '@/utils/format';
import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import { FONT_MONO } from '@/styles/tokens';

// El primer caso se repite al final: al llegar a él se vuelve al inicio sin animación (loop infinito).
// En la Home no se muestran los casos marcados con `hideInHome` (ej. DHL Chile y Uruguay: queda solo DHL).
const HOME_CASES = CASES.filter((c) => !c.hideInHome);
const SLIDES = [...HOME_CASES, HOME_CASES[0]].map(toCaseView);
const COUNT = HOME_CASES.length;
const AUTOPLAY_MS = 5500;
const SLIDE_EASE = 'cubic-bezier(.65,0,.35,1)';
// Swipe (tablet y celular): px antes de decidir si el gesto es horizontal o vertical, y px para cambiar de caso.
const SWIPE_LOCK_PX = 8;
const SWIPE_MIN_PX = 50;

export default function CasesCarouselSection() {
  const [slide, setSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [fast, setFast] = useState(false); // transición corta después de un swipe
  const [dragX, setDragX] = useState(null); // desplazamiento del dedo mientras se arrastra (px)
  const hovering = useRef(false);
  const wrapTimer = useRef(null);
  const swipe = useRef(null); // { id, x, y, axis: null | 'x' | 'y' }
  const swiped = useRef(false); // para no abrir el caso al soltar un arrastre
  const touchable = useMediaQuery(SITE.narrowQuery);

  useEffect(() => () => clearTimeout(wrapTimer.current), []);

  const goTo = (i, quick = false) => {
    setAnimate(true);
    setFast(quick);
    setSlide(i);
  };

  const next = (quick = false) => {
    if (slide >= COUNT) return;
    goTo(slide + 1, quick);
    if (slide + 1 === COUNT) {
      clearTimeout(wrapTimer.current);
      wrapTimer.current = setTimeout(
        () => {
          setAnimate(false);
          setSlide(0);
        },
        quick ? 550 : 1250,
      );
    }
  };

  const prev = (quick = false) => {
    clearTimeout(wrapTimer.current);
    if (slide === 0 || slide === COUNT) {
      // Saltar sin animación al clon del final y animar hacia el último caso real.
      setAnimate(false);
      setSlide(COUNT);
      requestAnimationFrame(() => requestAnimationFrame(() => goTo(COUNT - 1, quick)));
    } else goTo(slide - 1, quick);
  };

  useInterval(() => !hovering.current && dragX === null && next(), AUTOPLAY_MS);

  // ---- Swipe: solo en tablet y celular. Los gestos verticales siguen scrolleando la página (touch-action: pan-y).
  const onPointerDown = (e) => {
    if (!touchable || !e.isPrimary) return;
    swipe.current = { id: e.pointerId, x: e.clientX, y: e.clientY, axis: null };
    swiped.current = false;
  };

  const onPointerMove = (e) => {
    const s = swipe.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (!s.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_LOCK_PX) return;
      s.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (s.axis === 'y') return;
      e.currentTarget.setPointerCapture(e.pointerId);
      swiped.current = true;
    }
    if (s.axis !== 'x') return;
    // En el primer caso no hay nada a la izquierda: el arrastre hacia la derecha ofrece resistencia.
    setDragX(slide === 0 && dx > 0 ? dx * 0.35 : dx);
  };

  const endSwipe = (e) => {
    const s = swipe.current;
    if (!s || s.id !== e.pointerId) return;
    swipe.current = null;
    if (s.axis !== 'x') return;
    const dx = e.clientX - s.x;
    setDragX(null);
    if (e.type === 'pointerup' && Math.abs(dx) >= SWIPE_MIN_PX) {
      if (dx < 0) next(true);
      else prev(true);
    } else {
      setAnimate(true);
      setFast(true);
    }
  };

  const onClickCapture = (e) => {
    if (!swiped.current) return;
    e.preventDefault();
    e.stopPropagation();
    swiped.current = false;
  };

  const current = slide % COUNT;
  const dragging = dragX !== null;

  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '32px', flexWrap: 'wrap' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(40px,5.4vw,80px)',
                lineHeight: 0.98,
                fontWeight: 800,
                letterSpacing: '-.045em',
                maxWidth: '800px',
                textWrap: 'balance',
              }}
            >
              Resultados que ya generamos junto a nuestros clientes.
            </h2>
          </div>
          <SmartLink
            className="hv-bg-blue hv-c-cream"
            data-reveal="3"
            href="/soluciones#casos"
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '15px',
              padding: '16px 24px',
              borderRadius: '999px',
              border: '1px solid #00249C',
              color: '#00249C',
              transition: 'all .3s',
            }}
          >
            Ver casos de éxito <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
        </div>
        <div
          data-reveal="2"
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endSwipe}
            onPointerCancel={endSwipe}
            onClickCapture={onClickCapture}
            onDragStart={(e) => touchable && e.preventDefault()}
            style={{
              overflow: 'hidden',
              borderRadius: '28px',
              touchAction: touchable ? 'pan-y' : 'auto',
              userSelect: dragging ? 'none' : 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                transform: `translateX(calc(-${slide * 100}% + ${dragX ?? 0}px))`,
                transition: animate && !dragging ? `transform ${fast ? '.5s' : '1.2s'} ${SLIDE_EASE}` : 'none',
                willChange: 'transform',
              }}
            >
              {SLIDES.map((c, i) => (
                <div
                  key={i}
                  aria-hidden={i !== slide}
                  style={{
                    flex: '0 0 100%',
                    minWidth: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
                    gap: 'clamp(24px,3vw,48px)',
                    padding: 'clamp(14px,1.6vw,22px)',
                    background: '#04081c',
                    color: '#F9F6EE',
                    borderRadius: '28px',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      minHeight: 'clamp(320px,34vw,480px)',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      background: '#0b1233',
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
                        background: 'linear-gradient(135deg,rgba(0,36,156,.55),rgba(4,8,28,.15) 60%)',
                        mixBlendMode: 'multiply',
                      }}
                    ></div>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        background: 'linear-gradient(180deg,rgba(4,8,28,.6),transparent 38%)',
                      }}
                    ></div>
                    <div style={{ position: 'absolute', left: '22px', top: '20px', pointerEvents: 'none' }}>
                      <CaseLogo item={c} fallbackSize="26px" />
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: 'clamp(8px,1.6vw,24px)' }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        fontFamily: FONT_MONO,
                        fontSize: '11px',
                        letterSpacing: '.16em',
                        color: '#DADAE4',
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DCD291' }}></span>
                      {c.clientU} · {c.country}
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(26px,2.8vw,42px)',
                        fontWeight: 700,
                        letterSpacing: '-.035em',
                        lineHeight: 1.08,
                        textWrap: 'balance',
                      }}
                    >
                      {c.headline}
                    </span>
                    <div
                      style={{
                        marginTop: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        gap: '24px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          paddingLeft: '24px',
                          borderLeft: '2px solid #DCD291',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 'clamp(48px,5.6vw,84px)',
                            fontWeight: 800,
                            letterSpacing: '-.05em',
                            lineHeight: 0.9,
                          }}
                        >
                          {c.kpi}
                        </span>
                        <span style={{ fontSize: '14px', color: '#DADAE4' }}>{c.kpiL}</span>
                      </div>
                      <SmartLink
                        className="hv-c-gold"
                        href={c.href}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: '#F9F6EE',
                        }}
                      >
                        Ver caso de éxito{' '}
                        <span
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#DCD291',
                            color: '#00249C',
                            display: 'grid',
                            placeItems: 'center',
                            fontFamily: FONT_MONO,
                          }}
                        >
                          →
                        </span>
                      </SmartLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {HOME_CASES.map((c, i) => (
                <button
                  key={c.client}
                  onClick={() => goTo(i)}
                  aria-label={`Ver caso ${c.client}`}
                  style={{
                    width: i === current ? '36px' : '10px',
                    height: '10px',
                    borderRadius: '999px',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    background: i === current ? '#00249C' : '#DADAE4',
                    transition: 'all .4s',
                  }}
                ></button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '12px',
                  letterSpacing: '.08em',
                  color: '#636262',
                  paddingRight: '6px',
                }}
              >
                {pad2(current + 1)} / {pad2(COUNT)}
              </span>
              {/* Flechas solo en desktop: en tablet y celular se navega con swipe */}
              <div className="st-desktop-only" style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="hv-bg-blue hv-c-cream"
                  onClick={() => prev()}
                  aria-label="Anterior"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid #00249C',
                    background: 'transparent',
                    color: '#00249C',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'all .3s',
                  }}
                >
                  ←
                </button>
                <button
                  className="hv-bg-blue hv-c-cream"
                  onClick={() => next()}
                  aria-label="Siguiente"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid #00249C',
                    background: 'transparent',
                    color: '#00249C',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'all .3s',
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
