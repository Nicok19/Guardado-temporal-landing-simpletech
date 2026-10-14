import SmartLink from '@/components/common/SmartLink';
import { SUITE_VALUES } from '@/data/suite';
import { FONT_MONO } from '@/styles/tokens';
import { SUITE_PLATFORMS } from './platforms';

/**
 * Las plataformas en /simplesuite, resumidas: título, un párrafo, una tarjeta por plataforma (SUITE_PLATFORMS:
 * módulos de la suite + SimplePipeline) con su nombre, su categoría, una frase y el link a su página, y debajo lo
 * que se logra con ellas (SUITE_VALUES). Estático.
 */
export default function SuitePlatformsSection() {
  return (
    <section
      id="plataformas"
      style={{ background: '#F9F6EE', color: '#00249C', padding: 'clamp(72px,8vw,112px) var(--page-x)' }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '760px' }}>
          <span
            data-reveal="1"
            style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}
          >
            LAS PLATAFORMAS DE LA SUITE
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(34px,4vw,56px)',
              fontWeight: 800,
              letterSpacing: '-.04em',
              lineHeight: 1,
              textWrap: 'balance',
            }}
          >
            {SUITE_PLATFORMS.length} plataformas que trabajan como una sola<span style={{ color: '#DCD291' }}>.</span>
          </h2>
          <p data-reveal="3" style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262' }}>
            Cada una resuelve una parte de la experiencia de tus clientes y se integra con las demás. Usalas por
            separado o combinadas.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))',
            gap: '16px',
          }}
        >
          {SUITE_PLATFORMS.map((m, i) => (
            <SmartLink
              key={m.id}
              href={m.href}
              className="hv-bd-blue"
              data-reveal={String((i % 3) + 1)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                padding: '26px',
                borderRadius: '22px',
                background: '#fff',
                border: '1px solid #DADAE4',
                color: '#00249C',
                transition: 'border-color .3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    aria-hidden="true"
                    style={{ width: '12px', height: '12px', borderRadius: '4px', background: m.color, flex: 'none' }}
                  ></span>
                  <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-.03em' }}>{m.name}</span>
                </span>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '10px',
                    letterSpacing: '.14em',
                    color: '#636262',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.tag}
                </span>
              </div>
              <span style={{ fontSize: '15px', lineHeight: 1.5, color: '#636262' }}>{m.head}</span>
              <span
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Explorar {m.name} <span style={{ fontFamily: FONT_MONO }}>→</span>
              </span>
            </SmartLink>
          ))}
        </div>

        {/* Lo que se logra con las plataformas (resolver, automatizar, medir): subtítulo y franja de tres columnas
            con filete arriba, para que no se confundan con las tarjetas de plataformas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: 'clamp(16px,3vw,32px)' }}>
          <span
            data-reveal="1"
            style={{ fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1 }}
          >
            Con estas plataformas vas a poder…
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: 'clamp(24px,3vw,40px)',
            }}
          >
            {SUITE_VALUES.map((v, i) => (
              <div
                key={v.t}
                data-reveal={String(i + 1)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  paddingTop: '20px',
                  borderTop: '2px solid #00249C',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.16em', color: '#636262' }}>
                  {v.k}
                </span>
                <span style={{ fontSize: 'clamp(20px,2vw,24px)', fontWeight: 700, letterSpacing: '-.025em' }}>
                  {v.t}
                </span>
                <span style={{ fontSize: '15px', lineHeight: 1.6, color: '#636262' }}>{v.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
