import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import { FONT_MONO } from '@/styles/tokens';

const PHOTO = 'https://images.unsplash.com/photo-1552664730-d307ca884978?fm=jpg&q=70&w=1200&auto=format&fit=crop';

export default function AboutTeaserSection() {
  return (
    <section
      id="home-nosotros"
      style={{
        position: 'relative',
        background: '#F9F6EE',
        color: '#00249C',
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
          gap: 'clamp(32px,4vw,64px)',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'flex-start' }}>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(36px,4.4vw,64px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-.045em',
              textWrap: 'balance',
            }}
          >
            Tu socio estratégico para hacer simple lo complejo.
          </h2>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: 1.6,
              color: '#636262',
              maxWidth: '500px',
              textWrap: 'pretty',
            }}
          >
            Desde 2011 entendemos la operación de cada organización y la potenciamos con nuestras plataformas SaaS de
            experiencia del cliente, telefonía e IA.
          </p>
          <SmartLink
            className="hv-bg-blue hv-c-cream"
            data-reveal="4"
            href="/nosotros"
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '15px',
              padding: '16px 24px',
              borderRadius: '999px',
              border: '1px solid #00249C',
              color: '#00249C',
              transition: 'all .3s',
            }}
          >
            Conocé Simpletech <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
        </div>
        <div
          data-reveal="2"
          style={{
            position: 'relative',
            minHeight: 'clamp(300px,32vw,460px)',
            borderRadius: '28px',
            overflow: 'hidden',
            background: '#0b1233',
          }}
        >
          <CoverImage
            src={PHOTO}
            alt="Equipo de trabajo en un workshop relevando procesos con post-its"
            style={{ position: 'absolute', inset: 0 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(135deg,rgba(0,36,156,.35),rgba(4,8,28,0) 60%)',
              mixBlendMode: 'multiply',
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--page-max)',
          margin: 'clamp(48px,6vw,72px) auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
          gap: '2px',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#DADAE4',
          border: '1px solid #DADAE4',
        }}
      >
        <div
          data-reveal="1"
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '28px', background: '#F9F6EE' }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#636262' }}>01 · DIAGNÓSTICO</span>
          <span style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-.02em' }}>
            Entendemos tu operación antes de hablar de tecnología.
          </span>
        </div>
        <div
          data-reveal="2"
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '28px', background: '#F9F6EE' }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#636262' }}>02 · CRITERIO</span>
          <span style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-.02em' }}>
            Buenas prácticas probadas en +200 empresas y cada industria.
          </span>
        </div>
        <div
          data-reveal="3"
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '28px', background: '#F9F6EE' }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: '#636262' }}>03 · ACOMPAÑAMIENTO</span>
          <span style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-.02em' }}>
            Medimos, ajustamos y evolucionamos con vos, siempre.
          </span>
        </div>
      </div>
    </section>
  );
}
