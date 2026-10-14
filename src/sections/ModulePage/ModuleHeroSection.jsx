import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';
import { MODULE_PREVIEWS } from '@/sections/SimpleSuite/previews';
import PreviewWindow from '@/sections/SimpleSuite/previews/PreviewWindow';

/**
 * Hero de la página de una plataforma (/simplesuite/:modulo): ruta (SimpleSuite / plataforma), título, bajada y llamados;
 * a la derecha, la vista previa animada de la plataforma (o `hero.image`, si la hay). Isla por la vista previa.
 * `hero` = { kicker, title, lead, image?: { src, alt } } (data/showcases/:modulo.js) · `module` = módulo de data/suiteModules.js
 */
export default function ModuleHeroSection({ hero, module }) {
  const Preview = MODULE_PREVIEWS[module.id];
  return (
    <section
      style={{
        background: '#F9F6EE',
        color: '#00249C',
        padding: 'clamp(150px,15vw,190px) var(--page-x) clamp(72px,8vw,112px)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))',
          gap: '56px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <nav
            aria-label="Breadcrumb"
            data-reveal="1"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              fontFamily: FONT_MONO,
              fontSize: '11px',
              letterSpacing: '.18em',
              color: '#636262',
            }}
          >
            <SmartLink className="hv-c-ink" href="/simplesuite" style={{ color: '#636262' }}>
              SIMPLESUITE
            </SmartLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page" style={{ color: '#00249C' }}>
              {module.name.toUpperCase()}
            </span>
          </nav>
          <span
            data-reveal="1"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              fontFamily: FONT_MONO,
              fontSize: '12px',
              letterSpacing: '.16em',
              color: '#636262',
            }}
          >
            <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: module.color }}></span>
            {hero.kicker}
          </span>
          <h1
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(42px,5.4vw,80px)',
              lineHeight: 0.96,
              fontWeight: 800,
              letterSpacing: '-.05em',
              textWrap: 'balance',
            }}
          >
            {hero.title.replace(/\.$/, '')}
            <span style={{ color: '#DCD291' }}>.</span>
          </h1>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: 'clamp(17px,1.4vw,20px)',
              lineHeight: 1.55,
              color: '#636262',
              maxWidth: '540px',
            }}
          >
            {hero.lead}
          </p>
          <div data-reveal="3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <SmartLink
              className="hv-bg-gold hv-c-blue"
              href="/#contacto"
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 26px',
                borderRadius: '999px',
                background: '#00249C',
                color: '#F9F6EE',
                fontWeight: 700,
                fontSize: '15px',
                transition: 'all .3s',
              }}
            >
              Pedí una demo <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
            <SmartLink
              className="hv-bd-blue"
              href="#capacidades"
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 26px',
                borderRadius: '999px',
                border: '1px solid #DADAE4',
                color: '#00249C',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all .3s',
              }}
            >
              Ver capacidades <span style={{ fontFamily: FONT_MONO }}>↓</span>
            </SmartLink>
          </div>
        </div>
        <div data-reveal="2">
          {hero.image ? (
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              style={{ display: 'block', width: '100%', maxWidth: '600px', height: 'auto', margin: '0 auto' }}
            />
          ) : (
            <PreviewWindow module={module}>
              <Preview />
            </PreviewWindow>
          )}
        </div>
      </div>
    </section>
  );
}
