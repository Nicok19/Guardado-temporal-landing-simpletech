import { useEffect, useRef, useState } from 'react';
import { TECH_PARTNERS } from '@/data/partners';
import SmartLink from '@/components/common/SmartLink';
import { SITE } from '@/config/site';
import { t } from '@/i18n';
import { FONT_MONO } from '@/styles/tokens';

// Logos como "stickers" (estilo landonorris.com): al entrar en pantalla caen rebotando y quedan apenas torcidos,
// flotan suave y, con el mouse encima, se enderezan con inclinación 3D que sigue al cursor y un brillo.
// El título se tipea letra por letra la primera vez que la sección entra en pantalla.
// Con prefers-reduced-motion (o SITE.features.motion = false) todo se muestra quieto y completo.
const HEADING = 'Alianzas que respaldan cada proyecto.';
const TYPE_MS = 55; // ms por letra (con un poco de variación para que parezca tipeado a mano)
const ROTATIONS = [-5, 4, -3]; // inclinación de reposo de cada sticker (grados)
const STAGGER_MS = 140;
const TILT_DEG = 14;

const CSS = `
.st-stk { perspective: 900px; animation: st-stk-float 5s ease-in-out infinite; animation-delay: calc(var(--i) * -1.7s); }
.st-stk:hover { animation-play-state: paused; }
@keyframes st-stk-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }
.st-stk-card {
  position: relative; height: 110px; border-radius: 20px; background: #F9F6EE;
  display: grid; place-items: center; padding: 20px;
  transform-style: preserve-3d;
  transform: translateY(-140px) rotate(calc(var(--r) * 5deg)) scale(.7); opacity: 0;
  transition: transform .9s cubic-bezier(.34,1.56,.64,1), opacity .4s ease, box-shadow .4s ease;
  box-shadow: 0 14px 30px -18px rgba(0,0,0,.6);
}
.st-stk-wrap:not([data-settled]) .st-stk-card { transition-delay: calc(var(--i) * ${STAGGER_MS}ms); }
.st-stk-wrap[data-shown] .st-stk-card { transform: rotate(calc(var(--r) * 1deg)); opacity: 1; }
.st-stk-wrap[data-shown] .st-stk:hover .st-stk-card {
  transform: translateY(-10px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(1.08);
  transition: transform .18s ease-out, box-shadow .3s ease;
  box-shadow: 0 30px 50px -20px rgba(0,0,0,.75);
}
.st-stk-card img { transform: translateZ(40px); transition: transform .3s ease; }
.st-stk-glare {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .3s ease;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,.9), rgba(255,255,255,0) 55%);
  mix-blend-mode: soft-light;
}
.st-stk:hover .st-stk-glare { opacity: 1; }
.st-caret {
  display: inline-block; width: .08em; height: .9em; margin-left: .04em; vertical-align: -.08em;
  background: #DCD291; animation: st-caret-blink 1s steps(1) infinite;
}
@keyframes st-caret-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .st-stk { animation: none; }
  .st-stk-card, .st-stk-wrap[data-shown] .st-stk:hover .st-stk-card { transform: rotate(calc(var(--r) * 1deg)); opacity: 1; transition: none; }
}
`;

const motionEnabled = () =>
  SITE.features.motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function PartnersTeaserSection() {
  const wrapRef = useRef(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);
  const heading = t(HEADING);
  // Letras ya tipeadas. En el servidor el título sale completo (SEO y sin JS); al hidratar se vacía y se tipea.
  const [typed, setTyped] = useState(heading.length);
  const [typing, setTyping] = useState(false);

  // Caen cuando la grilla entra en pantalla; después se saca el delay escalonado para que el hover responda al toque.
  useEffect(() => {
    const el = wrapRef.current;
    if (!motionEnabled() || !('IntersectionObserver' in window)) {
      setShown(true);
      setSettled(true);
      return undefined;
    }
    setTyped(0);
    let timer;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setTyping(true);
        setShown(true);
        timer = setTimeout(() => setSettled(true), 900 + TECH_PARTNERS.length * STAGGER_MS);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Tipeo: una letra por vez; al terminar, el cursor parpadea un rato y desaparece.
  useEffect(() => {
    if (!typing) return undefined;
    if (typed >= heading.length) {
      const done = setTimeout(() => setTyping(false), 1800);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setTyped((n) => n + 1), TYPE_MS * (0.6 + Math.random() * 0.8));
    return () => clearTimeout(next);
  }, [typing, typed, heading.length]);

  // Inclinación 3D y brillo que siguen al cursor (solo mouse).
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const s = e.currentTarget.style;
    s.setProperty('--ry', `${(x - 0.5) * 2 * TILT_DEG}deg`);
    s.setProperty('--rx', `${(0.5 - y) * 2 * TILT_DEG}deg`);
    s.setProperty('--gx', `${x * 100}%`);
    s.setProperty('--gy', `${y * 100}%`);
  };

  const onPointerLeave = (e) => {
    const s = e.currentTarget.style;
    ['--rx', '--ry', '--gx', '--gy'].forEach((p) => s.removeProperty(p));
  };

  return (
    <section
      style={{
        background: 'linear-gradient(90deg,#274295 0%,#0e1740 45%,#000 100%)',
        padding: 'clamp(72px,8vw,112px) var(--page-x)',
      }}
    >
      <style>{CSS}</style>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            aria-label={heading}
            style={{
              margin: 0,
              fontSize: 'clamp(32px,3.6vw,52px)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-.04em',
              textWrap: 'balance',
            }}
          >
            {/* Lo que falta tipear ocupa su lugar invisible: el bloque no salta de alto mientras se escribe */}
            <span aria-hidden="true">
              {heading.slice(0, typed)}
              {typing && <span className="st-caret"></span>}
              <span style={{ visibility: 'hidden' }}>{heading.slice(typed)}</span>
            </span>
          </h2>
          <SmartLink
            data-reveal="3"
            href="/ecosistema/partners"
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '15px',
              color: '#DCD291',
              width: 'max-content',
            }}
          >
            Ver partners <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
        </div>
        <div
          ref={wrapRef}
          className="st-stk-wrap"
          data-shown={shown || undefined}
          data-settled={settled || undefined}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '16px' }}
        >
          {TECH_PARTNERS.map((p, i) => (
            <div
              key={p.name}
              className="st-stk"
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              style={{ '--i': i, '--r': ROTATIONS[i % ROTATIONS.length] }}
            >
              <div className="st-stk-card">
                <img src={p.logo} alt={p.name} style={{ maxHeight: '36px', maxWidth: '100%', objectFit: 'contain' }} />
                <span className="st-stk-glare"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
