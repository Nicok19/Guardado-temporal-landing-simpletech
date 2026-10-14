import { useRef, useState } from 'react';

/**
 * Video propio (archivo en public/videos/) con su póster y un play grande al centro mientras no se reproduce;
 * los controles del navegador aparecen recién al darle play. No descarga nada hasta entonces (preload="none").
 * Lo usan el hero de /simplesuite y el video de /academy. Necesita ser isla (client:*).
 * `video` = { src, poster, label }; `style` = estilos extra del recuadro (bordes, sombra…).
 */
export default function PosterVideo({ video, style }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    ref.current?.play();
  };

  return (
    <div style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', background: '#04081c', ...style }}>
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        aria-label={video.label}
        controls={started}
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }}
      ></video>
      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label="Reproducir video"
          className="hv-bg-gold hv-c-blue"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
            // Proporcional al ancho del video: tapa el círculo central de los pósters (el núcleo pasa a ser el play).
            width: 'clamp(64px,19%,200px)',
            aspectRatio: '1',
            borderRadius: '50%',
            border: 'none',
            background: '#00249C',
            color: '#F9F6EE',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 16px 40px -12px rgba(4,8,28,.6)',
            transition: 'all .3s',
          }}
        >
          <svg width="30%" height="30%" viewBox="0 0 24 24" aria-hidden="true" style={{ marginLeft: '8%' }}>
            <path d="M6 4l14 8-14 8z" fill="currentColor" />
          </svg>
        </button>
      )}
    </div>
  );
}
