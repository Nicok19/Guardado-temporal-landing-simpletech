import { useState } from 'react';
import { FAQS } from '@/data/faqs';
import SmartLink from '@/components/common/SmartLink';
import { SITE } from '@/config/site';
import { FONT_MONO } from '@/styles/tokens';

// Ícono de WhatsApp del sitio actual.
const WHATSAPP_ICON = 'https://www.simpletech.uy/wp-content/uploads/2024/07/whatsapp_chat.webp';

/**
 * Preguntas frecuentes en acordeón; la primera arranca abierta. Al final, contacto por WhatsApp.
 * - Sin `title`: va debajo de PageHero (mismo fondo, sin espacio arriba), ej. /como-trabajamos/preguntas-frecuentes.
 * - Con `title` (+ `kicker`): sección con su propio encabezado, ej. al pie de /simplesuite/simplebots.
 * `items` = [{ q, a }] (por defecto, las preguntas generales de data/faqs.js).
 */
export default function FaqSection({ items = FAQS, kicker, title }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      style={{
        background: '#F9F6EE',
        color: '#00249C',
        padding: `${title ? 'clamp(88px,10vw,140px)' : '0'} var(--page-x) clamp(88px,10vw,140px)`,
      }}
    >
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        {title && (
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {kicker && (
              <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
                {kicker}
              </span>
            )}
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(34px,4vw,56px)',
                fontWeight: 800,
                letterSpacing: '-.04em',
                lineHeight: 1,
                textWrap: 'balance',
              }}
            >
              {title.replace(/\.$/, '')}
              <span style={{ color: '#DCD291' }}>.</span>
            </h2>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '880px' }}>
          {items.map((f, i) => {
            const on = openIndex === i;
            return (
              <div key={f.q} data-reveal="1" style={{ borderTop: '1px solid #DADAE4' }}>
                <button
                  onClick={() => setOpenIndex(on ? -1 : i)}
                  aria-expanded={on}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    width: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '24px 4px',
                  }}
                >
                  <span style={{ fontSize: 'clamp(18px,1.6vw,21px)', fontWeight: 600, letterSpacing: '-.015em' }}>
                    {f.q}
                  </span>
                  <span
                    style={{
                      flex: 'none',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      border: `1px solid ${on ? '#00249C' : '#DADAE4'}`,
                      background: on ? '#00249C' : 'transparent',
                      color: on ? '#F9F6EE' : '#00249C',
                      fontSize: '18px',
                      transform: `rotate(${on ? '45deg' : '0deg'})`,
                      transition: 'all .35s',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: on ? '240px' : '0px',
                    opacity: on ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height .5s cubic-bezier(.2,.8,.2,1),opacity .4s',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: '0 4px 24px',
                      fontSize: '16px',
                      lineHeight: 1.6,
                      color: '#636262',
                      maxWidth: '640px',
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid #DADAE4' }}></div>
        </div>
        {/* Contacto por WhatsApp para dudas que no están en la lista */}
        <div
          data-reveal="1"
          style={{
            marginTop: '40px',
            maxWidth: '880px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            padding: 'clamp(24px,3vw,32px)',
            borderRadius: '24px',
            background: '#fff',
            border: '1px solid #DADAE4',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: 'clamp(20px,2vw,26px)', fontWeight: 700, letterSpacing: '-.02em' }}>
              ¿Tenés alguna duda?
            </span>
            <span style={{ fontSize: '16px', lineHeight: 1.55, color: '#636262', maxWidth: '560px' }}>
              Presioná el ícono de WhatsApp y uno de nuestros agentes de Customer Success se pondrá en contacto con vos.
            </span>
          </div>
          <SmartLink
            className="hv-lift-4"
            href={SITE.whatsappUrl}
            aria-label="Escribinos por WhatsApp"
            style={{ flex: 'none', display: 'block', borderRadius: '50%', transition: 'transform .3s' }}
          >
            <img src={WHATSAPP_ICON} alt="" width="64" height="64" style={{ display: 'block' }} />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
