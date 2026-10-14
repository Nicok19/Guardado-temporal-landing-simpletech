import { useCallback, useEffect, useRef, useState } from 'react';
import SmartLink from '@/components/common/SmartLink';
import { INDUSTRY_DATA } from '@/data/industries';
import { SITE } from '@/config/site';
import { FONT_MONO } from '@/styles/tokens';

// Industrias en /nosotros/datos-de-la-industria (estructura inspirada en las "5 tendencias" de cxtrends.zendesk.com):
// una tarjeta alta de color por industria, escalonadas, en un carrusel que avanza solo (y con flechas o swipe). Cada tarjeta
// tiene el dato principal en un panel de vidrio y una flecha que abre el detalle (insight + benchmarks), con
// anterior / siguiente. Isla. Datos: data/industries.js.
const INK = '#04081c';
const CREAM = '#F9F6EE';
const BLUE = '#00249C';

// Color de cada tarjeta, en orden. `deco` = color de los anillos decorativos.
const THEMES = [
  { bg: BLUE, ink: CREAM, muted: 'rgba(249,246,238,.75)', deco: '#3a5bd9' },
  { bg: '#7fd9ae', ink: INK, muted: 'rgba(4,8,28,.7)', deco: '#5cc795' },
  { bg: '#DCD291', ink: INK, muted: 'rgba(4,8,28,.7)', deco: '#cdbf6d' },
  { bg: '#d4c2ff', ink: INK, muted: 'rgba(4,8,28,.7)', deco: '#b9a2f5' },
  { bg: '#b2dcff', ink: INK, muted: 'rgba(4,8,28,.7)', deco: '#8cc6f5' },
];
const ITEMS = Object.entries(INDUSTRY_DATA).map(([industry, d], i) => ({
  industry,
  ...d,
  theme: THEMES[i % THEMES.length],
}));
const pad2 = (n) => String(n).padStart(2, '0');
// Carrusel: siempre se ven tarjetas enteras (3, 2 o 1 según el ancho) y el riel se desliza con una transición suave.
// Avanza una tarjeta cada AUTO_MS en loop infinito: al final del riel van copias de las primeras tarjetas y, cuando
// se llega a ellas, se vuelve al inicio sin animación (no se nota). Se pausa con el mouse encima, con el foco
// adentro, con el detalle abierto, fuera de pantalla y durante PAUSE_MS después de moverlo a mano.
const AUTO_MS = 3500;
const PAUSE_MS = 8000;
const GAP = 24;
const SLIDE = 'transform .9s cubic-bezier(.65,0,.35,1)';
const perViewFor = (w) => (w >= 900 ? 3 : w >= 560 ? 2 : 1);

const CSS = `
/* Ventana del carrusel: recorta a los costados; el padding deja ver la sombra dura y la caída escalonada. */
.ind-viewport { overflow: hidden; padding: 4px 10px 128px 0; touch-action: pan-y; }
.ind-track { display: flex; gap: ${GAP}px; will-change: transform; }
.ind-tcard { flex: 0 0 var(--card-w); transform: translateY(var(--drop)); }
@media (max-width: 760px) { .ind-tcard { transform: none; } .ind-viewport { padding-bottom: 24px; } }
.ind-tcard-open { transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
.ind-tcard:hover .ind-tcard-open { transform: scale(1.12) rotate(-45deg); }
.ind-modal-in { animation: ind-modal-in .35s cubic-bezier(.2,.8,.2,1) both; }
@keyframes ind-modal-in { from { opacity: 0; transform: translateY(20px) scale(.98); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .ind-modal-in { animation: none; } .ind-tcard-open { transition: none; } }
`;

/** Anillos decorativos (estilo ilustrado del sitio) en la mitad de cada tarjeta. */
function Rings({ color }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      style={{ position: 'absolute', right: '-60px', top: '38%', width: '240px', opacity: 0.9 }}
    >
      {[90, 66, 42].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={color} strokeWidth="14" />
      ))}
    </svg>
  );
}

function Card({ item, index, onOpen }) {
  const t = item.theme;
  return (
    <article
      className="ind-tcard"
      style={{
        '--drop': `${[0, 48, 96, 48, 0][index % 5]}px`,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '480px',
        borderRadius: '24px',
        background: t.bg,
        color: t.ink,
        padding: '26px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: `2px solid ${INK}`,
        boxShadow: `6px 6px 0 ${INK}`,
      }}
    >
      <Rings color={t.deco} />
      <span
        style={{
          position: 'relative',
          fontFamily: FONT_MONO,
          fontSize: '11px',
          letterSpacing: '.18em',
          fontWeight: 700,
        }}
      >
        {`INDUSTRIA ${pad2(index + 1)}`}
      </span>
      <h3
        style={{
          position: 'relative',
          margin: 0,
          fontSize: '30px',
          fontWeight: 800,
          letterSpacing: '-.035em',
          lineHeight: 1.05,
        }}
      >
        {item.industry}
      </h3>
      <button
        type="button"
        className="ind-tcard-open"
        onClick={onOpen}
        aria-label={`Ver datos de ${item.industry}`}
        style={{
          position: 'relative',
          alignSelf: 'flex-start',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          background: INK,
          color: CREAM,
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          fontFamily: FONT_MONO,
          fontSize: '16px',
        }}
      >
        →
      </button>
      {/* Dato principal en un panel de vidrio */}
      <div
        style={{
          position: 'relative',
          marginTop: 'auto',
          padding: '18px 20px',
          borderRadius: '18px',
          background: 'rgba(255,255,255,.28)',
          border: '1px solid rgba(255,255,255,.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 0.95 }}>
          {item.pain[0]}
        </span>
        <span style={{ fontSize: '14px', lineHeight: 1.45, color: t.muted }}>{item.pain[1]}</span>
      </div>
    </article>
  );
}

/** Detalle de una industria: insight, dato principal con su fuente y benchmarks. */
function Modal({ index, onClose, onNav }) {
  const item = ITEMS[index];
  const t = item.theme;
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onNav]);

  const navBtn = {
    padding: '10px 16px',
    borderRadius: '999px',
    border: `2px solid ${INK}`,
    background: CREAM,
    color: INK,
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(4,8,28,.6)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr)', // el modal nunca más ancho que la pantalla
        placeItems: 'center',
        padding: '20px',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ind-modal-title"
        className="ind-modal-in"
        key={index}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(720px, 100%)',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          borderRadius: '28px',
          background: CREAM,
          color: INK,
          border: `2px solid ${INK}`,
          boxShadow: `8px 8px 0 ${INK}`,
        }}
      >
        <div
          style={{
            background: t.bg,
            color: t.ink,
            padding: 'clamp(24px,3vw,36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            borderBottom: `2px solid ${INK}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.18em', fontWeight: 700 }}>
              {`INDUSTRIA ${pad2(index + 1)} / ${pad2(ITEMS.length)}`}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: `2px solid ${INK}`,
                background: CREAM,
                color: INK,
                fontSize: '18px',
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
          <h3
            id="ind-modal-title"
            style={{
              margin: 0,
              fontSize: 'clamp(32px,4vw,48px)',
              fontWeight: 800,
              letterSpacing: '-.04em',
              lineHeight: 1,
            }}
          >
            {item.industry}
          </h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap' }}>
            <span
              style={{ fontSize: 'clamp(40px,5vw,56px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 0.95 }}
            >
              {item.pain[0]}
            </span>
            <span style={{ flex: '1 1 260px', fontSize: '16px', lineHeight: 1.45, fontWeight: 600 }}>
              {item.pain[1]}
            </span>
          </div>
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.14em', color: t.muted }}>
            {item.pain[2]}
          </span>
        </div>

        <div style={{ padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.5, fontWeight: 600, letterSpacing: '-.01em' }}>
            “{item.insight}”
          </p>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))',
              gap: '12px',
            }}
          >
            {item.bench.map(([value, label]) => (
              <li
                key={label}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: '#fff',
                  border: `2px solid ${INK}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-.03em', color: BLUE }}>{value}</span>
                <span style={{ fontSize: '13.5px', lineHeight: 1.45, color: '#4a4f66' }}>{label}</span>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => onNav(-1)} style={navBtn}>
                ← Anterior
              </button>
              <button type="button" onClick={() => onNav(1)} style={navBtn}>
                Siguiente →
              </button>
            </div>
            <SmartLink
              href="/soluciones#casos"
              className="hv-bg-blue hv-c-cream"
              style={{ ...navBtn, background: '#DCD291', boxShadow: `3px 3px 0 ${INK}`, transition: 'all .3s' }}
            >
              Ver casos de éxito <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndustryCardsSection() {
  const [open, setOpen] = useState(null);
  const viewRef = useRef(null);
  const [{ perView, cardW }, setSize] = useState({ perView: 3, cardW: 0 });
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const auto = useRef({ hover: false, touched: -Infinity, visible: false, open: false });
  auto.current.open = open !== null;
  const swipe = useRef(null);

  // Riel: las tarjetas reales + copias de las primeras (para el loop).
  const track = [...ITEMS, ...ITEMS.slice(0, perView)];

  // Ancho de cada tarjeta para que entren justas `perView` tarjetas enteras.
  useEffect(() => {
    const el = viewRef.current;
    const measure = () => {
      const w = el.clientWidth - 10; // menos el padding derecho de la ventana (para la sombra)
      const n = perViewFor(w);
      setSize({ perView: n, cardW: (w - GAP * (n - 1)) / n });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const indexRef = useRef(0);
  indexRef.current = index;
  const go = useCallback((dir) => {
    const i = indexRef.current;
    if (dir < 0 && i === 0) {
      // Desde el inicio hacia atrás: salta sin animación a las copias del final y anima un paso hacia atrás.
      setAnimate(false);
      setIndex(ITEMS.length);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(ITEMS.length - 1);
        }),
      );
      return;
    }
    if (i >= ITEMS.length) {
      // Si no llegó a dispararse la vuelta al inicio (pestaña oculta, etc.), se hace ahora.
      setAnimate(false);
      setIndex(i - ITEMS.length);
      return;
    }
    setAnimate(true);
    setIndex(i + dir);
  }, []);

  // Al terminar de llegar a las copias del final, vuelve al inicio sin animación (el loop no se nota).
  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (index >= ITEMS.length) {
      setAnimate(false);
      setIndex(index - ITEMS.length);
    }
  };

  const manual = (dir) => {
    auto.current.touched = performance.now();
    go(dir);
  };

  // Avance automático.
  useEffect(() => {
    const el = viewRef.current;
    if (!el || !SITE.features.motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => (auto.current.visible = e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const id = setInterval(() => {
      const a = auto.current;
      if (!a.visible || a.hover || a.open || el.contains(document.activeElement)) return;
      if (performance.now() - a.touched < PAUSE_MS) return;
      go(1);
    }, AUTO_MS);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [go]);

  // Swipe en pantallas táctiles (el gesto vertical sigue scrolleando la página).
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse') return;
    swipe.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (swipe.current == null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 50) manual(dx < 0 ? 1 : -1);
  };

  // Estables: el modal registra el teclado una sola vez.
  const nav = useCallback((d) => setOpen((i) => (i + d + ITEMS.length) % ITEMS.length), []);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section
      id="industrias"
      style={{ background: '#fff', color: BLUE, padding: 'clamp(80px,9vw,128px) var(--page-x) 0', overflow: 'hidden' }}
    >
      <style>{CSS}</style>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
            <h2
              data-reveal="1"
              style={{
                margin: 0,
                fontSize: 'clamp(34px,4.2vw,58px)',
                fontWeight: 800,
                letterSpacing: '-.04em',
                lineHeight: 1,
                textWrap: 'balance',
              }}
            >
              {`${ITEMS.length} industrias, ${ITEMS.length} desafíos`}
              <span style={{ color: '#DCD291' }}>.</span>
            </h2>
            <p data-reveal="2" style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262' }}>
              El problema que más se repite en cada sector, con los números que lo explican. Abrí cada industria para
              ver el detalle y los benchmarks.
            </p>
          </div>
          <div data-reveal="2" style={{ display: 'flex', gap: '10px' }}>
            {[
              ['Anterior', '←', -1],
              ['Siguiente', '→', 1],
            ].map(([label, arrow, dir]) => (
              <button
                key={label}
                type="button"
                onClick={() => manual(dir)}
                aria-label={label}
                className="hv-bg-blue hv-c-cream"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: `1px solid ${BLUE}`,
                  background: 'transparent',
                  color: BLUE,
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all .3s',
                }}
              >
                {arrow}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={viewRef}
          className="ind-viewport"
          data-reveal="2"
          onMouseEnter={() => (auto.current.hover = true)}
          onMouseLeave={() => (auto.current.hover = false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipe.current = null)}
        >
          <div
            className="ind-track"
            onTransitionEnd={onTransitionEnd}
            style={{
              '--card-w': cardW ? `${cardW}px` : 'calc((100% - 48px) / 3)',
              transform: `translateX(${-index * (cardW + GAP)}px)`,
              transition: animate ? SLIDE : 'none',
            }}
          >
            {track.map((item, i) => {
              const real = i % ITEMS.length;
              const clone = i >= ITEMS.length;
              return (
                <div
                  key={i}
                  aria-hidden={clone || undefined}
                  inert={clone ? '' : undefined}
                  style={{ display: 'contents' }}
                >
                  <Card item={item} index={real} onOpen={() => setOpen(real)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {open !== null && <Modal index={open} onClose={close} onNav={nav} />}
    </section>
  );
}
