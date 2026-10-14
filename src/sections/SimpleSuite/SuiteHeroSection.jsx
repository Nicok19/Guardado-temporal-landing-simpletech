import { SITE } from '@/config/site';
import { SUITE_HERO } from '@/data/suite';
import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

/**
 * Hero de /simplesuite: logo, título a lo ancho y los dos llamados (demo y plataformas). Estático.
 * Fondo crema y texto azul, como el resto de los heroes internos (ej. ModuleHeroSection).
 */
export default function SuiteHeroSection() {
  return (
    <section
      style={{
        background: '#F9F6EE',
        color: '#00249C',
        padding: 'clamp(150px,15vw,190px) var(--page-x) clamp(88px,10vw,120px)',
      }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <img
          data-reveal="1"
          src={SITE.suiteLogoUrl}
          alt="SimpleSuite"
          style={{ height: 'clamp(34px,4vw,52px)', width: 'max-content' }}
        />
        <h1
          data-reveal="2"
          style={{
            margin: 0,
            maxWidth: '1100px',
            fontSize: 'clamp(44px,6.4vw,96px)',
            lineHeight: 0.96,
            fontWeight: 800,
            letterSpacing: '-.05em',
            textWrap: 'balance',
          }}
        >
          {SUITE_HERO.title.replace(/\.$/, '')}
          <span style={{ color: '#DCD291' }}>.</span>
        </h1>
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
            href="#plataformas"
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
            Conocé las plataformas <span style={{ fontFamily: FONT_MONO }}>↓</span>
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
