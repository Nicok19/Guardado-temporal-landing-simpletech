import { useEffect, useRef } from 'react';
import CaseLogo from '@/components/common/CaseLogo';
import { CASES, toCaseView } from '@/data/cases';
import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import { SITE } from '@/config/site';
import { FONT_MONO } from '@/styles/tokens';

// Abanico fijo de tarjetas (estilo "What's up on socials" de landonorris.com): sin autoplay ni carrusel.
// Cada tarjeta lleva la foto y los datos del caso, y entera es un link al caso.
// En la Home no se muestran los casos marcados con `hideInHome`; de los que quedan, solo los primeros FAN_SIZE.
const FAN_SIZE = 5;
// Posición en el abanico de cada caso, en orden: el primero al centro y el resto alternando a los costados.
const FAN_OFFSETS = [0, -1, 1, -2, 2];
// En el HTML van de izquierda a derecha (así el CSS sabe cuáles quedan a cada lado de la tarjeta con hover);
// `order` = orden original, para la fila del celular.
const HOME_CASES = CASES.filter((c) => !c.hideInHome)
  .slice(0, FAN_SIZE)
  .map((c, i) => ({ ...toCaseView(c), offset: FAN_OFFSETS[i], order: i }))
  .sort((a, b) => a.offset - b.offset);

// Desktop: abanico en arco. Al pasar el mouse, la tarjeta sube y se agranda (escala pareja, la foto no se deforma)
// y el resto baja al 40% de opacidad, se achica (--s) y se corre hacia afuera (--shift): así ninguna se monta sobre otra.
// Al scrollear, las tarjetas suben una a una desde abajo (--in: 0 → 1 según el scroll, ver useScrollEntrance).
// La entrada usa las propiedades `translate` y `rotate`, que se suman al `transform` del abanico sin pisarlo.
// Hasta 1280px (tablet, celular y notebooks chicas): fila horizontal que se recorre con el dedo, sin rotación.
const CSS = `
.st-fan { --card-w: clamp(230px, 18vw, 270px); position: relative; height: calc(var(--card-w) * 1.4 + 90px); }
.st-fan-card {
  position: absolute; left: 50%; top: 0; width: var(--card-w); aspect-ratio: 5 / 7;
  transform-origin: 50% 100%;
  transform: translateX(calc(-50% + var(--card-w) * .95 * var(--o) + var(--shift, 0px))) translateY(calc(var(--a) * 38px)) rotate(calc(var(--o) * 6deg)) scale(var(--s, 1));
  translate: 0 calc((1 - var(--in, 1)) * 320px);
  rotate: calc((1 - var(--in, 1)) * var(--o) * 4deg);
  opacity: var(--in, 1);
  transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s ease, opacity .25s ease;
}
.st-fan-card:hover, .st-fan-card:focus-visible {
  z-index: 20 !important;
  transform: translateX(calc(-50% + var(--card-w) * .95 * var(--o) + var(--shift, 0px))) translateY(calc(var(--a) * 38px - 16px)) rotate(calc(var(--o) * 6deg)) scale(1.1);
  box-shadow: 0 30px 60px -20px rgba(0,36,156,.5);
}
.st-fan:has(.st-fan-card:hover, .st-fan-card:focus-visible) .st-fan-card:not(:hover, :focus-visible) { opacity: calc(var(--in, 1) * .4); --s: .8; }
.st-fan-card:is(:hover, :focus-visible) ~ .st-fan-card { --shift: calc(var(--card-w) * .2); }
.st-fan-card:has(~ .st-fan-card:is(:hover, :focus-visible)) { --shift: calc(var(--card-w) * -.2); }
@media (max-width: 1279.98px) {
  .st-fan {
    --card-w: min(78vw, 300px); height: auto; display: flex; gap: 16px;
    overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
    margin: 0 calc(var(--page-x) * -1); padding: 8px var(--page-x) 24px;
  }
  .st-fan::-webkit-scrollbar { display: none; }
  .st-fan-card, .st-fan-card:hover, .st-fan-card:focus-visible {
    position: relative; left: auto; flex: 0 0 var(--card-w); order: var(--order);
    transform: none; scroll-snap-align: center; opacity: 1 !important; translate: none; rotate: none;
  }
}
`;

// Progreso de entrada de cada tarjeta según el scroll: empieza cuando el abanico asoma por abajo y termina cuando su
// borde superior llega al 40% de la pantalla. Cada tarjeta (de izquierda a derecha) arranca un poco después que la anterior.
const ENTER_DELAY = 0.13; // fracción del recorrido entre una tarjeta y la siguiente
const ENTER_SPAN = 0.45; // fracción del recorrido que dura la entrada de cada tarjeta
const easeOut = (p) => 1 - Math.pow(1 - p, 3);
const clamp01 = (n) => Math.min(1, Math.max(0, n));

function useScrollEntrance(ref) {
  useEffect(() => {
    const stage = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!stage || !SITE.features.motion || reduced) return undefined;
    const cards = [...stage.querySelectorAll('.st-fan-card')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const progress = (vh - stage.getBoundingClientRect().top) / (vh * 0.6);
      cards.forEach((card, k) =>
        card.style.setProperty('--in', easeOut(clamp01((progress - k * ENTER_DELAY) / ENTER_SPAN)).toFixed(3)),
      );
    };
    const onScroll = () => frame || (frame = requestAnimationFrame(update));
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cards.forEach((card) => card.style.removeProperty('--in'));
    };
  }, [ref]);
}

export default function CasesCarouselSection() {
  const stageRef = useRef(null);
  useScrollEntrance(stageRef);

  return (
    <section
      style={{
        background: '#F9F6EE',
        color: '#00249C',
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
        overflow: 'hidden',
      }}
    >
      <style>{CSS}</style>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '32px', flexWrap: 'wrap' }}
        >
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
        <div className="st-fan" ref={stageRef}>
          {HOME_CASES.map((c) => {
            const { offset } = c;
            const abs = Math.abs(offset);
            return (
              <SmartLink
                key={c.client}
                href={c.href}
                className="st-fan-card"
                style={{
                  '--o': offset,
                  '--a': abs * abs * 0.5 + abs * 0.5,
                  '--order': c.order,
                  zIndex: 10 - abs,
                  display: 'block',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  background: '#04081c',
                  color: '#F9F6EE',
                  boxShadow: '0 18px 40px -24px rgba(4,8,28,.55)',
                }}
              >
                <CoverImage
                  placeholder={c.photoPh}
                  src={c.photo}
                  position={c.photoPosition}
                  sizes="(max-width: 1280px) 80vw, 300px"
                  style={{ position: 'absolute', inset: 0 }}
                />
                {/* Velo: oscuro arriba para el logo y abajo para los datos */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                      'linear-gradient(180deg,rgba(4,8,28,.55),transparent 22%,rgba(4,8,28,.25) 30%,rgba(4,8,28,.9) 50%,#04081c)',
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '22px',
                    gap: '12px',
                  }}
                >
                  <CaseLogo item={c} fallbackSize="22px" />
                  <span
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      fontFamily: FONT_MONO,
                      fontSize: '10.5px',
                      letterSpacing: '.14em',
                      color: '#DADAE4',
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#DCD291' }}></span>
                    {c.ind} · {c.country}
                  </span>
                  <span
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      letterSpacing: '-.03em',
                      lineHeight: 1.14,
                      textWrap: 'balance',
                    }}
                  >
                    {c.headline}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      gap: '12px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(249,246,238,.18)',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                      <span
                        style={{
                          fontSize: '36px',
                          fontWeight: 800,
                          letterSpacing: '-.05em',
                          lineHeight: 0.9,
                          color: '#DCD291',
                        }}
                      >
                        {c.kpi}
                      </span>
                      <span style={{ fontSize: '12px', lineHeight: 1.35, color: '#DADAE4' }}>{c.kpiL}</span>
                    </div>
                    <span
                      aria-hidden="true"
                      style={{
                        flex: '0 0 auto',
                        width: '38px',
                        height: '38px',
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
                  </div>
                </div>
              </SmartLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
