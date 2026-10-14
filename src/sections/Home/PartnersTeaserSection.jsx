import { TECH_PARTNERS } from '@/data/partners';
import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';

export default function PartnersTeaserSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(90deg,#274295 0%,#0e1740 45%,#000 100%)',
        padding: 'clamp(72px,8vw,112px) var(--page-x)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(32px,3.6vw,52px)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-.04em',
              textWrap: 'balance',
            }}
          >
            Alianzas que respaldan cada proyecto.
          </h2>
          <SmartLink
            data-reveal="3"
            href="/ecosistema/partners"
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '15px',
              color: '#DCD291',
              width: 'max-content',
            }}
          >
            Ver partners <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
        </div>
        <div data-reveal="2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '12px' }}>
          {TECH_PARTNERS.map((p) => (
            <div
              key={p.name}
              style={{
                height: '110px',
                borderRadius: '20px',
                background: '#F9F6EE',
                display: 'grid',
                placeItems: 'center',
                padding: '20px',
              }}
            >
              <img src={p.logo} alt={p.name} style={{ maxHeight: '36px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
