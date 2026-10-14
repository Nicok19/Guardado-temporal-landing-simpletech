import SmartLink from '@/components/common/SmartLink';
import { caseStudyPath } from '@/config/routes';
import { FONT_MONO } from '@/styles/tokens';

// Testimonios de clientes en /simplesuite, con el estilo ilustrado del sitio: tarjetas crema tipo sticker (contorno
// de tinta y sombra dura, apenas torcidas) sobre el azul de la marca. Cada una: comillas, cita, foto, nombre,
// cargo, logo de la empresa y link a su caso de éxito. Estática.
// Las fotos son las de los casos de éxito (data/caseStudies.js, de simpletech.uy); los logos, los de data/cases.js
// (vienen claros, para fondo oscuro: sobre la tarjeta se pasan a tinta).
const INK = '#04081c';
const CREAM = '#F9F6EE';
const BLUE = '#00249C';
const GOLD = '#DCD291';

const TESTIMONIALS = [
  {
    quote:
      'El chatbot ha tenido un buen feedback por parte de los corredores y proveedores, ahora se sienten más conectados con nosotros y obtienen respuestas al instante.',
    author: 'Luis Manjarres',
    role: 'Gerencia de Operaciones en San Cristóbal Seguros',
    photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Luis-Manjarres-San-Cristobal_edited.webp',
    company: 'San Cristóbal Seguros',
    logo: '/uploads/logos/sancristobal.png',
    logoH: '26px',
    slug: 'san-cristobal',
  },
  {
    quote:
      'Con el equipo de Simpletech lo que hemos logrado es un partnership. Nuestra asociación común es la innovación, exceder las expectativas y ser ágiles.',
    author: 'Eduardo Zukauskas',
    role: 'Gerente de Operaciones IT en Ta-Ta Supermercados',
    photo: 'https://www.simpletech.uy/wp-content/uploads/2024/06/Eduardo-Zukauskas-TaTa.webp',
    company: 'Ta-Ta',
    logo: '/uploads/logos/tata.png',
    logoH: '30px',
    slug: 'ta-ta',
  },
];

const CSS = `
.st-testi-card { transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease; }
@media (hover: hover) {
  .st-testi-card:hover { transform: rotate(0deg) translateY(-6px) !important; box-shadow: 12px 12px 0 ${INK} !important; }
}
@media (prefers-reduced-motion: reduce) { .st-testi-card { transition: none; } }
`;

export default function SuiteTestimonialsSection() {
  return (
    <section style={{ background: BLUE, color: CREAM, padding: 'clamp(80px,9vw,128px) var(--page-x)' }}>
      <style>{CSS}</style>
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px,5vw,64px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span
            data-reveal="1"
            style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#b2dcff' }}
          >
            TESTIMONIOS
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(34px,4.2vw,58px)',
              fontWeight: 800,
              letterSpacing: '-.04em',
              lineHeight: 1,
              textWrap: 'balance',
            }}
          >
            Lo que dicen nuestros clientes<span style={{ color: GOLD }}>.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))',
            gap: 'clamp(28px,4vw,48px)',
            alignItems: 'stretch',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={t.author} data-reveal={String(i + 2)} style={{ display: 'flex' }}>
              <figure
                className="st-testi-card"
                style={{
                  flex: 1,
                  margin: 0,
                  padding: 'clamp(28px,3vw,40px)',
                  borderRadius: '28px',
                  background: CREAM,
                  color: INK,
                  border: `2px solid ${INK}`,
                  boxShadow: `8px 8px 0 ${INK}`,
                  transform: `rotate(${i % 2 ? 1 : -1}deg)`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {/* Comillas grandes y logo de la empresa */}
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: '96px',
                      fontWeight: 800,
                      lineHeight: 0.7,
                      height: '52px',
                      color: GOLD,
                      WebkitTextStroke: `2px ${INK}`,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    “
                  </span>
                  <img
                    src={t.logo}
                    alt={t.company}
                    loading="lazy"
                    decoding="async"
                    style={{ height: t.logoH, width: 'auto', filter: 'brightness(0)', opacity: 0.75 }}
                  />
                </div>

                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 'clamp(20px,1.9vw,25px)',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    letterSpacing: '-.02em',
                    textWrap: 'pretty',
                  }}
                >
                  {t.quote}
                </blockquote>

                <figcaption
                  style={{
                    marginTop: 'auto',
                    paddingTop: '22px',
                    borderTop: `2px dashed rgba(4,8,28,.2)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <img
                    src={t.photo}
                    alt={t.author}
                    width="60"
                    height="60"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `2px solid ${INK}`,
                      boxShadow: `3px 3px 0 ${INK}`,
                      flex: 'none',
                    }}
                  />
                  <span
                    style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 180px', minWidth: 0 }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-.02em', color: BLUE }}>
                      {t.author}
                    </span>
                    <span style={{ fontSize: '13.5px', lineHeight: 1.4, color: '#636262' }}>{t.role}</span>
                  </span>
                  <SmartLink
                    href={caseStudyPath(t.slug)}
                    className="hv-bg-blue hv-c-cream"
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      padding: '10px 16px',
                      borderRadius: '999px',
                      background: GOLD,
                      color: INK,
                      border: `2px solid ${INK}`,
                      boxShadow: `3px 3px 0 ${INK}`,
                      fontSize: '13px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      transition: 'all .3s',
                    }}
                  >
                    Ver caso <span style={{ fontFamily: FONT_MONO }}>→</span>
                  </SmartLink>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
