import { TELEPHONY_ITEMS } from '@/data/home';
import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

export default function TelephonySection() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#04081c',
        padding: 'clamp(88px,10vw,140px) var(--page-x)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))',
          gap: '56px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span
            data-reveal="1"
            style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              letterSpacing: '.24em',
              color: '#b2dcff',
            }}
          >
            TELEFONÍA · SIMPLEVOICE
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(40px,5.4vw,80px)',
              lineHeight: 0.96,
              fontWeight: 800,
              letterSpacing: '-.045em',
              textWrap: 'balance',
            }}
          >
            La voz también es un canal digital.
          </h2>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: 1.65,
              color: '#DADAE4',
              fontWeight: 300,
              maxWidth: '520px',
            }}
          >
            Con SimpleVoice unificamos telefonía IP, contact center en la nube y VoiceBots con IA en el mismo ecosistema
            que tus canales de mensajería. Y te acompañamos a definir qué conviene automatizar y qué debe seguir en
            manos de tu equipo.
          </p>
          <div data-reveal="4" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <SmartLink
              className="hv-bg-gold hv-c-blue"
              href="/simplesuite/simplevoice"
              style={{
                padding: '16px 24px',
                borderRadius: '999px',
                background: '#F9F6EE',
                color: '#00249C',
                fontWeight: 600,
                fontSize: '15px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                transition: 'all .3s',
              }}
            >
              Conocé SimpleVoice <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
            gap: '2px',
            borderRadius: '28px',
            overflow: 'hidden',
            background: 'rgba(178,220,255,.14)',
          }}
        >
          {TELEPHONY_ITEMS.map((t) => (
            <div
              key={t.t}
              data-reveal="2"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '28px',
                background: '#060c28',
                minHeight: '200px',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  border: '1px solid rgba(178,220,255,.22)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#DCD291',
                  fontSize: '18px',
                }}
              >
                {t.i}
              </span>
              <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.02em', marginTop: 'auto' }}>
                {t.t}
              </span>
              <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#DADAE4' }}>{t.d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
