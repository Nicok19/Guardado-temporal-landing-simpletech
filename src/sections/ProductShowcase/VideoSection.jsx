import { useState } from 'react';
import PosterVideo from '@/components/common/PosterVideo';
import { FONT_MONO } from '@/styles/tokens';
import { BLUE, Kicker } from './ui';

/**
 * Video con título. Puede ser un archivo propio (`src` + `poster`, en public/videos/): se muestra con PosterVideo,
 * como en el hero de /simplesuite (fotograma + play al centro). O un video de YouTube (`youtubeId`): portada propia
 * en azul de marca y el reproductor (youtube-nocookie) se carga recién al hacer click. Isla (client:visible).
 * `video` = { kicker?, title, text?, src?, poster?, youtubeId?, label, meta?, speaker?: { name, role } }
 */
export default function VideoSection({ video: v }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section style={{ background: '#F9F6EE', padding: '0 var(--page-x) clamp(72px,8vw,112px)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <div className="sb-video-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {v.kicker && <Kicker>{v.kicker}</Kicker>}
            <h2
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(32px,4.2vw,58px)',
                lineHeight: 1.04,
                fontWeight: 800,
                letterSpacing: '-.045em',
                color: BLUE,
                textWrap: 'balance',
              }}
            >
              {v.title}
            </h2>
          </div>
          {v.text && (
            <p data-reveal="3" style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262' }}>
              {v.text}
            </p>
          )}
        </div>

        {v.src ? (
          <div data-reveal="2">
            <PosterVideo video={v} />
          </div>
        ) : (
          <div
            data-reveal="2"
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: '28px',
              overflow: 'hidden',
              background: BLUE,
            }}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                title={v.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              ></iframe>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Reproducir: ${v.label}`}
                className="sb-video-cover"
                style={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'clamp(20px,4vw,48px)',
                  cursor: 'pointer',
                  color: '#F9F6EE',
                }}
              >
                <span
                  className="sb-video-meta"
                  style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.18em', color: '#b2dcff' }}
                >
                  {v.meta}
                </span>
                <span
                  className="sb-video-play"
                  style={{
                    alignSelf: 'center',
                    width: 'clamp(64px,9vw,104px)',
                    height: 'clamp(64px,9vw,104px)',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#DCD291',
                    color: BLUE,
                    boxShadow: '0 20px 50px -20px rgba(0,0,0,.6)',
                    transition: 'transform .3s cubic-bezier(.2,.8,.2,1)',
                  }}
                >
                  <svg width="38%" height="38%" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
                  </svg>
                </span>
                <span
                  className="sb-video-foot"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(22px,3vw,40px)',
                      fontWeight: 800,
                      letterSpacing: '-.035em',
                      lineHeight: 1.05,
                      maxWidth: '560px',
                    }}
                  >
                    {v.label}
                  </span>
                  {v.speaker && (
                    <span
                      className="sb-video-meta"
                      style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'right' }}
                    >
                      <span style={{ fontSize: '15px', fontWeight: 700 }}>{v.speaker.name}</span>
                      <span
                        style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.12em', color: '#b2dcff' }}
                      >
                        {v.speaker.role.toUpperCase()}
                      </span>
                    </span>
                  )}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
