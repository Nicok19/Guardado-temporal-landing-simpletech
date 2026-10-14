import { Fragment, useEffect, useRef, useState } from 'react';
import { DELIVERY_PHASES, DELIVERY_TIMELINE } from '@/data/company';
import { pad2 } from '@/utils/format';
import { FONT_MONO } from '@/styles/tokens';
import '@/styles/delivery.css';

const LINE = 0.6; // un paso se activa cuando su número cruza este punto de la pantalla (60% desde arriba)

/**
 * Paso activo de una lista según el scroll: el último cuyo elemento ya cruzó la línea LINE de la pantalla
 * (-1 si todavía ninguno). Los anteriores quedan completados; cuando el final de la lista (`end`) también cruza la
 * línea, se completan todos. Al volver hacia arriba se desandan.
 */
function useScrollStep(refs, end) {
  const [current, setCurrent] = useState(-1);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * LINE;
      let next = -1;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) next = i;
      });
      if (end.current && end.current.getBoundingClientRect().bottom < line) next = refs.current.length;
      setCurrent(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [refs, end]);
  return current;
}

/**
 * Una fase de la entrega como línea de tiempo vertical: número, título y detalle de cada paso.
 * Los pasos se van completando con el scroll (useScrollStep); no reaccionan al mouse.
 */
function PhaseTimeline({ phase, index }) {
  const steps = DELIVERY_TIMELINE[phase.id];
  const refs = useRef([]);
  const end = useRef(null);
  const current = useScrollStep(refs, end);

  return (
    <div className="nv-phase" data-reveal="2">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
          {pad2(index + 1)} · FASE
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: 'clamp(26px,2.6vw,36px)',
            fontWeight: 800,
            letterSpacing: '-.035em',
            lineHeight: 1.05,
          }}
        >
          {phase.label}
        </h3>
        {phase.tag && (
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '5px 12px',
              borderRadius: '999px',
              background: '#DCD291',
              color: '#00249C',
              fontFamily: FONT_MONO,
              fontSize: '11px',
              letterSpacing: '.12em',
            }}
          >
            {phase.tag.toUpperCase()}
          </span>
        )}
        <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.55, color: '#636262', maxWidth: '360px' }}>
          {phase.desc}
        </p>
      </div>

      <ol ref={end} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => {
          const on = i === current;
          const done = i < current;
          const last = i === steps.length - 1;
          return (
            <li key={s.t} ref={(el) => (refs.current[i] = el)} className="nv-step">
              {/* Número + tramo de línea hacia el paso siguiente */}
              <span style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                {!last && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '48px',
                      bottom: '-8px',
                      width: '2px',
                      background: done ? '#00249C' : '#DADAE4',
                      transition: 'background .5s',
                    }}
                  ></span>
                )}
                <span
                  style={{
                    position: 'relative',
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '17px',
                    fontWeight: 800,
                    background: on ? '#DCD291' : done ? '#00249C' : '#fff',
                    color: on || !done ? '#00249C' : '#F9F6EE',
                    border: `2px solid ${on ? '#DCD291' : '#00249C'}`,
                    transform: on ? 'scale(1.08)' : 'none',
                    transition: 'all .4s cubic-bezier(.2,.8,.2,1)',
                  }}
                >
                  {pad2(i + 1)}
                </span>
              </span>
              <span className="nv-step-body" style={{ background: on ? '#EEF3FF' : 'transparent' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-.015em', lineHeight: 1.25 }}>
                  {s.t}
                </span>
                {s.items.length > 0 && (
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {s.items.map((x) => (
                      <span key={x} style={{ fontSize: '14px', lineHeight: 1.45, color: '#4b5160' }}>
                        {x.endsWith('*') ? (
                          <>
                            {x.slice(0, -1)}
                            <span style={{ color: '#ea5455' }}>*</span>
                          </>
                        ) : (
                          x
                        )}
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      {phase.note && (
        <span className="nv-phase-note" style={{ fontSize: '13px', color: '#636262' }}>
          <span style={{ color: '#ea5455' }}>*</span> {phase.note}
        </span>
      )}
    </div>
  );
}

/**
 * Pase entre las dos fases: la preventa le entrega el proyecto a la implementación en el kick-off.
 * Se anima al entrar en pantalla (styles/delivery.css: .nv-handoff).
 */
function PhaseHandoff({ from, to }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`nv-handoff${inView ? ' is-in' : ''}`} aria-label={`De ${from} a ${to}, en el kick-off`}>
      <span className="nv-handoff-chip nv-handoff-chip--from">{from.toUpperCase()}</span>
      <span className="nv-handoff-track" aria-hidden="true">
        <span className="nv-handoff-fill"></span>
        <span className="nv-handoff-dot"></span>
        <span className="nv-handoff-dot"></span>
        <span className="nv-handoff-dot"></span>
        <span className="nv-handoff-mark">Kick-off: arrancamos juntos</span>
      </span>
      <span className="nv-handoff-chip">{to.toUpperCase()}</span>
    </div>
  );
}

/**
 * Cómo entregamos la solución: las dos fases (preventa consultiva e implementación) por separado,
 * cada una como línea de tiempo vertical que se completa a medida que se baja por la página.
 */
export default function DeliverySection() {
  return (
    <section
      id="s-entrega"
      style={{ background: '#fff', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span data-reveal="1" style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em' }}>
            CÓMO ENTREGAMOS LA SOLUCIÓN
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(30px,3.6vw,48px)',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-.035em',
              maxWidth: '820px',
              textWrap: 'balance',
            }}
          >
            Un proyecto integral diseñado para entregar valor, eficiencia y resultados medibles en cada etapa.
          </h2>
        </div>
        {DELIVERY_PHASES.map((phase, i) => (
          <Fragment key={phase.id}>
            {i > 0 && <PhaseHandoff from={DELIVERY_PHASES[i - 1].label} to={phase.label} />}
            <PhaseTimeline phase={phase} index={i} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
