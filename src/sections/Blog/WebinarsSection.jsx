import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import { PAST_WEBINARS, WEBINAR_TOPICS, YOUTUBE_CHANNEL } from '@/data/webinars';
import { FONT_MONO } from '@/styles/tokens';

const H2 = {
  margin: 0,
  fontSize: 'clamp(34px,4vw,56px)',
  fontWeight: 800,
  letterSpacing: '-.04em',
  lineHeight: 1,
  textWrap: 'balance',
};

/**
 * Página /blog/webinars: de qué tratan los webinars, los que ya pasaron (grabados en YouTube)
 * y link al canal para no perderse el próximo. Va debajo de PageHero (mismo fondo).
 */
export default function WebinarsSection() {
  return (
    <section style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(88px,10vw,140px)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '72px' }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '40px' }}
        >
          {WEBINAR_TOPICS.map((t, i) => (
            <div
              key={t.t}
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
                {t.t}
              </span>
              <span style={{ fontSize: '15px', lineHeight: 1.6, color: '#636262' }}>{t.d}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
              WEBINARS ANTERIORES
            </span>
            <h2 style={H2}>Algunos que ya pasaron.</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,230px),1fr))',
              gap: '16px',
            }}
          >
            {PAST_WEBINARS.map((w, i) => (
              <SmartLink
                key={w.url}
                className="hv-lift-6 hv-shadow-blue hv-c-blue"
                data-reveal={Math.min(i + 1, 4)}
                href={w.url}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: '#fff',
                  border: '1px solid #DADAE4',
                  transition: 'transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16 / 9', background: '#04081c' }}>
                  <CoverImage
                    src={w.thumb}
                    alt=""
                    sizes="(max-width: 768px) 100vw, 360px"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                  {/* Botón de play */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '16px',
                      bottom: '16px',
                      display: 'grid',
                      placeItems: 'center',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#DCD291',
                      color: '#00249C',
                      fontSize: '16px',
                      boxShadow: '0 6px 20px rgba(4,8,28,.35)',
                    }}
                  >
                    ▶
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px', flex: 1 }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.14em', color: '#636262' }}>
                    {w.date.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.2 }}>
                    {w.title}
                  </span>
                  <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#636262' }}>{w.d}</span>
                  <span style={{ marginTop: 'auto', paddingTop: '8px', fontFamily: FONT_MONO, fontSize: '12px' }}>
                    Ver en YouTube ↗
                  </span>
                </div>
              </SmartLink>
            ))}
          </div>
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
              No te pierdas el próximo.
            </span>
            <span style={{ fontSize: '15px', color: '#DADAE4', lineHeight: 1.5 }}>
              Suscribite a nuestro canal y mirá todos los webinars grabados.
            </span>
          </div>
          <SmartLink
            className="hv-bg-cream hv-c-blue"
            href={YOUTUBE_CHANNEL}
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
            Ir al canal de YouTube <span style={{ fontFamily: FONT_MONO }}>↗</span>
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
