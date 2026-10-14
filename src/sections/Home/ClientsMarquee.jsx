import { SITE } from '@/config/site';
import { CLIENT_LOGOS } from '@/data/clients';
import { FONT_MONO } from '@/styles/tokens';

// Logos duplicados para que la marquesina sea un loop continuo.
const LOOP = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function ClientsMarquee() {
  if (!SITE.features.showClients) return null;

  return (
    <div
      data-reveal="1"
      style={{
        background: '#04081c',
        borderTop: '1px solid rgba(178,220,255,.08)',
        borderBottom: '1px solid rgba(178,220,255,.08)',
        padding: '28px 0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      <span
        style={{
          flex: 'none',
          paddingLeft: '24px',
          fontFamily: FONT_MONO,
          fontSize: '11px',
          letterSpacing: '.2em',
          color: '#8fa0d8',
          whiteSpace: 'nowrap',
        }}
      >
        CONFÍAN EN NOSOTROS
      </span>
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
          WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '64px',
            alignItems: 'center',
            width: 'max-content',
            animation: 'st-marquee 60s linear infinite',
          }}
        >
          {LOOP.map((c, i) => (
            <img
              key={i}
              src={c.src}
              alt={c.name}
              style={{ height: c.h, width: 'auto', display: 'block', flex: 'none', opacity: 0.7 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
