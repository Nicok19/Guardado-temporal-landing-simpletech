import { useEffect, useRef, useState } from 'react';
import { SUITE_MODULES } from '@/data/suiteModules';
import { PRODUCT_COLORS } from '@/data/products';
import { ROUTES, suiteModulePath } from '@/config/routes';
import { SITE } from '@/config/site';
import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import { fadeIn } from '@/utils/animation';
import { FONT_MONO, FONT_POPPINS } from '@/styles/tokens';
import { MODULE_PREVIEWS } from '@/sections/SimpleSuite/previews';
import PreviewWindow from '@/sections/SimpleSuite/previews/PreviewWindow';
import PipelinePreview from '@/sections/SimpleSuite/previews/PipelinePreview';

// Foto de fondo (Unsplash, licencia libre): equipo trabajando con laptops.
const BG_PHOTO = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=60&w=1600&auto=format&fit=crop';

// Parallax de la foto de fondo: se mueve a PARALLAX_SPEED de la velocidad del scroll, en sentido contrario.
// La foto es más alta que la sección (PARALLAX_BLEED arriba y abajo) para que nunca se vean sus bordes.
const PARALLAX_SPEED = 0.2;
const PARALLAX_BLEED = '22%';

function useParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !SITE.features.motion || reduced) return undefined;
    const section = el.parentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      // 0 cuando el centro de la sección coincide con el centro de la pantalla.
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(offset * PARALLAX_SPEED).toFixed(1)}px, 0)`;
    };
    const onScroll = () => frame || (frame = requestAnimationFrame(update));
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
}

// Las plataformas del menú lateral: los módulos de SimpleSuite y SimplePipeline, todas iguales.
// `Preview` = maqueta de la interfaz que se muestra al elegirla. SimpleStats va al final de la lista.
const LAST = 'simplestats';
const PLATFORMS = [
  ...SUITE_MODULES.map((m) => ({ ...m, href: suiteModulePath(m.id), Preview: MODULE_PREVIEWS[m.id] })),
  {
    id: 'simplepipeline',
    name: 'SimplePipeline',
    tag: 'AGENTES IA',
    color: PRODUCT_COLORS.SimplePipeline,
    desc: 'Flujos con agentes de IA especializados, conectados a múltiples motores de IA y a tus sistemas internos para resolver de punta a punta.',
    href: ROUTES.simplepipeline,
    Preview: PipelinePreview,
  },
].sort((a, b) => (a.id === LAST) - (b.id === LAST));

/**
 * Plataformas propias (Home): menú lateral con cada plataforma; al elegir una se muestra su vista
 * previa y su descripción. Es isla (client:visible). En pantallas angostas el menú queda arriba.
 */
export default function ProductsTeaserSection() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const panelRef = useRef(null);
  const bgRef = useRef(null);
  const p = PLATFORMS[active];

  useEffect(() => fadeIn(panelRef.current), [active]);
  useParallax(bgRef);

  // Flechas ↑/↓ para moverse entre plataformas (patrón de tabs accesible).
  const onKeyDown = (e) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + PLATFORMS.length) % PLATFORMS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      style={{
        position: 'relative',
        background: '#00249C',
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
        overflow: 'hidden',
      }}
    >
      {/* Foto de fondo apenas visible: en blanco y negro (luminosity) para que tome el azul de la sección.
          Se mueve con parallax (useParallax). */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `-${PARALLAX_BLEED}`,
          bottom: `-${PARALLAX_BLEED}`,
          opacity: 0.14,
          mixBlendMode: 'luminosity',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <CoverImage src={BG_PHOTO} sizes="100vw" style={{ position: 'absolute', inset: 0 }} />
      </div>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1080px' }}>
            <h2
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(40px,5.4vw,80px)',
                lineHeight: 0.98,
                fontWeight: 800,
                letterSpacing: '-.045em',
              }}
            >
              Plataformas propias<span style={{ color: '#DCD291' }}>.</span>
            </h2>
            <p
              data-reveal="3"
              style={{
                margin: 0,
                fontSize: 'clamp(17px,1.4vw,19px)',
                lineHeight: 1.6,
                color: '#DADAE4',
                fontWeight: 300,
                textWrap: 'pretty',
              }}
            >
              SimpleSuite reúne en un mismo ecosistema todo lo que necesitás para gestionar cada interacción con tus
              clientes: bots sin código, atención omnicanal que combina IA y agentes humanos, métricas en tiempo real,
              campañas por WhatsApp y SMS, y telefonía con VoiceBots. Cada plataforma funciona por sí sola y se integra
              con las demás y con tus sistemas; y con SimplePipeline sumás agentes de IA especializados para automatizar
              procesos de punta a punta.
            </p>
          </div>
          <SmartLink
            className="hv-bg-gold hv-c-blue"
            data-reveal="3"
            href="/producto"
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '15px',
              padding: '16px 24px',
              borderRadius: '999px',
              background: '#F9F6EE',
              color: '#00249C',
              transition: 'all .3s',
            }}
          >
            Ver productos <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
        </div>

        <div
          data-reveal="2"
          style={{
            // Todo el componente (menú, vista previa y textos) a escala 75%.
            zoom: 0.75,
            display: 'flex',
            flexWrap: 'wrap',
            borderRadius: '28px',
            overflow: 'hidden',
            background: 'rgba(4,8,28,.28)',
            border: '1px solid rgba(178,220,255,.12)',
          }}
        >
          {/* Menú lateral */}
          <div
            role="tablist"
            aria-label="Plataformas"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', background: 'rgba(4,8,28,.3)' }}
          >
            {PLATFORMS.map((pl, i) => {
              const on = i === active;
              return (
                <button
                  key={pl.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`platform-tab-${pl.id}`}
                  aria-selected={on}
                  aria-controls="platform-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  style={{
                    all: 'unset',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    minHeight: '76px',
                    padding: '20px 28px',
                    fontFamily: FONT_POPPINS,
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '-.015em',
                    color: on ? '#F9F6EE' : 'rgba(249,246,238,.55)',
                    background: on ? 'rgba(4,8,28,.45)' : 'transparent',
                    borderBottom: i < PLATFORMS.length - 1 ? '1px solid rgba(178,220,255,.1)' : 'none',
                    boxShadow: on ? 'inset -2px 0 0 #DCD291' : 'none',
                    transition: 'color .3s, background .3s, box-shadow .3s',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '3px',
                      flex: 'none',
                      background: pl.color,
                      opacity: on ? 1 : 0.5,
                      transition: 'opacity .3s',
                    }}
                  ></span>
                  {pl.name}
                </button>
              );
            })}
          </div>

          {/* Plataforma elegida: vista previa + descripción */}
          <div
            ref={panelRef}
            role="tabpanel"
            id="platform-panel"
            aria-labelledby={`platform-tab-${p.id}`}
            style={{
              flex: '999 1 0',
              minWidth: 'min(100%,56%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              padding: 'clamp(28px,4vw,56px) clamp(20px,4vw,56px)',
              background: `radial-gradient(ellipse at 50% 40%, ${p.color}33, transparent 65%)`,
              transition: 'background .5s',
            }}
          >
            <div
              style={{
                width: 'min(100%,520px)',
                borderRadius: '28px',
                boxShadow: `0 0 90px -20px ${p.color}`,
              }}
            >
              <PreviewWindow module={p}>
                <p.Preview />
              </PreviewWindow>
            </div>
            <p
              style={{
                margin: 0,
                maxWidth: '600px',
                textAlign: 'center',
                fontSize: 'clamp(17px,1.5vw,20px)',
                lineHeight: 1.5,
                fontWeight: 500,
                color: '#F9F6EE',
                textWrap: 'balance',
              }}
            >
              {p.desc}
            </p>
            <SmartLink
              className="hv-bg-cream hv-c-blue"
              href={p.href}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: 700,
                padding: '14px 22px',
                borderRadius: '999px',
                background: '#DCD291',
                color: '#00249C',
                transition: 'all .3s',
              }}
            >
              Ver {p.name} <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
