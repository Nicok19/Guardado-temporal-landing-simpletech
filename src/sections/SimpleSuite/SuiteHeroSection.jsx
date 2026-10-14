import { SITE } from '@/config/site';
import { SUITE_HERO } from '@/data/suite';
import SmartLink from '@/components/common/SmartLink';
import PosterVideo from '@/components/common/PosterVideo';
import { FONT_MONO } from '@/styles/tokens';

/**
 * Hero de /simplesuite: a la izquierda el logo, el título y los dos llamados (demo y plataformas); a la derecha el
 * video (debajo en pantallas angostas). Fondo crema y texto azul, como el resto de los heroes internos
 * (ej. ModuleHeroSection). Isla por el video (PosterVideo: play grande al centro hasta que se reproduce).
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
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))',
          gap: 'clamp(40px,5vw,72px)',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <img
            data-reveal="1"
            src={SITE.suiteLogoUrl}
            alt="SimpleSuite"
            style={{ height: 'clamp(30px,3.2vw,44px)', width: 'max-content' }}
          />
          <h1
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(36px,3.6vw,54px)',
              lineHeight: 0.98,
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

        <div data-reveal="3">
          <PosterVideo video={SUITE_HERO.video} style={{ boxShadow: '0 40px 80px -40px rgba(0,36,156,.45)' }} />
        </div>
      </div>
    </section>
  );
}
