import { COMMERCIAL_PARTNERS, PARTNER_BENEFITS, TECH_PARTNERS } from '@/data/partners';
import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

const DARK_BG = 'linear-gradient(90deg,#274295 0%,#0e1740 45%,#000 100%)';

const H2 = {
  margin: 0,
  fontSize: 'clamp(34px,4vw,56px)',
  fontWeight: 800,
  letterSpacing: '-.04em',
  lineHeight: 1,
  textWrap: 'balance',
};

const COUNTRIES = [...new Set(COMMERCIAL_PARTNERS.map((p) => p.country))];

/** Encabezado de cada bloque: dato chico (cantidad), título y bajada. */
function BlockHeader({ kicker, title, text, dark = false }) {
  return (
    <div
      data-reveal="1"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
        gap: '24px 48px',
        alignItems: 'end',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: '12px',
            letterSpacing: '.2em',
            color: dark ? '#DCD291' : '#636262',
          }}
        >
          {kicker}
        </span>
        <h2 style={H2}>{title}</h2>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: '17px',
          lineHeight: 1.6,
          color: dark ? '#DADAE4' : '#636262',
          maxWidth: '520px',
        }}
      >
        {text}
      </p>
    </div>
  );
}

/**
 * Página /ecosistema/partners: partners tecnológicos (logo grande y qué aporta cada uno),
 * partners comerciales (logo y país) y cómo ser partner (beneficios y CTA).
 */
export default function PartnersSection() {
  return (
    <>
      {/* Partners tecnológicos */}
      <section
        id="s-tecnologicos"
        style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(88px,10vw,140px)' }}
      >
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          <BlockHeader
            kicker={`PARTNERS TECNOLÓGICOS · ${TECH_PARTNERS.length}`}
            title="La tecnología que potencia nuestras plataformas."
            text="Trabajamos con líderes globales para que cada conversación sea oficial, segura y escalable."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: '16px',
            }}
          >
            {TECH_PARTNERS.map((p, i) => (
              <article
                key={p.name}
                className="hv-lift-6"
                data-reveal={i + 1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '28px',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                  overflow: 'hidden',
                  transition: 'transform .45s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    height: 'clamp(180px,16vw,220px)',
                    padding: '32px',
                    borderBottom: '1px solid #DADAE4',
                  }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    style={{ width: '100%', maxWidth: '240px', maxHeight: '96px', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '28px' }}>
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      background: '#F9F6EE',
                      fontFamily: FONT_MONO,
                      fontSize: '11px',
                      letterSpacing: '.12em',
                      color: '#00249C',
                    }}
                  >
                    {p.role.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-.02em', marginTop: '6px' }}>
                    {p.badge}
                  </span>
                  <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#636262' }}>{p.text}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners comerciales */}
      <section
        id="s-comerciales"
        style={{ background: DARK_BG, color: '#fff', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}
      >
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          <BlockHeader
            dark
            kicker={`PARTNERS COMERCIALES · ${COMMERCIAL_PARTNERS.length}`}
            title="Una red que lleva nuestras soluciones a la región."
            text={`Socios estratégicos en ${COUNTRIES.map((c) => c.charAt(0) + c.slice(1).toLowerCase()).join(' y ')} que venden, implementan y acompañan a clientes con nuestras plataformas.`}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
              gap: '16px',
            }}
          >
            {COMMERCIAL_PARTNERS.map((p, i) => (
              <article
                key={p.name}
                className="hv-bd-gold hv-bg-glass-6"
                data-reveal={i + 1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '32px',
                  padding: '32px',
                  borderRadius: '28px',
                  border: '1px solid rgba(178,220,255,.18)',
                  background: 'rgba(255,255,255,.03)',
                  minHeight: '260px',
                  transition: 'all .4s',
                }}
              >
                <span
                  style={{
                    alignSelf: 'flex-start',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    border: '1px solid rgba(178,220,255,.3)',
                    fontFamily: FONT_MONO,
                    fontSize: '11px',
                    letterSpacing: '.14em',
                    color: '#b2dcff',
                  }}
                >
                  {p.country}
                </span>
                <div
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    flex: 1,
                    padding: '28px',
                    borderRadius: '20px',
                    background: '#F9F6EE',
                  }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    style={{ width: '100%', maxWidth: '220px', maxHeight: '88px', objectFit: 'contain' }}
                  />
                </div>
                <span style={{ fontSize: '14px', color: '#DADAE4' }}>Partner comercial</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ser partner */}
      <section
        id="s-sumate"
        style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}
      >
        <div
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          <BlockHeader
            kicker="SER PARTNER"
            title="Sumate a nuestra red de socios estratégicos."
            text="Vendé nuestros desarrollos y resolvé la omnicanalidad de tus clientes con el respaldo de nuestro equipo."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: '40px',
            }}
          >
            {PARTNER_BENEFITS.map((b, i) => (
              <div
                key={b.n}
                data-reveal={i + 1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingTop: '24px',
                  borderTop: '2px solid #00249C',
                }}
              >
                <span style={{ fontSize: 'clamp(22px,2.2vw,28px)', fontWeight: 700, letterSpacing: '-.025em' }}>
                  {b.t}
                </span>
                <span style={{ fontSize: '15px', lineHeight: 1.6, color: '#636262' }}>{b.d}</span>
              </div>
            ))}
          </div>
          <div
            data-reveal="1"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              padding: '32px',
              borderRadius: '28px',
              background: '#00249C',
              color: '#fff',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '620px' }}>
              <span style={{ fontSize: 'clamp(22px,2.4vw,32px)', fontWeight: 700, letterSpacing: '-.025em' }}>
                ¿Querés ser partner?
              </span>
              <span style={{ fontSize: '15px', color: '#DADAE4', lineHeight: 1.5 }}>
                Contanos sobre tu empresa y armamos juntos la propuesta.
              </span>
            </div>
            <SmartLink
              className="hv-bg-cream hv-c-blue"
              href="/#contacto"
              style={{
                padding: '18px 28px',
                borderRadius: '999px',
                background: '#DCD291',
                color: '#00249C',
                fontWeight: 700,
                fontSize: '15px',
                transition: 'all .3s',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              Quiero ser partner <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}
