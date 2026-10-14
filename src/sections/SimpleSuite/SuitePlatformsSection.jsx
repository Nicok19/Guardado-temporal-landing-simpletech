import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';
import PreviewWindow from './previews/PreviewWindow';
import { SUITE_PLATFORMS } from './platforms';
import '@/styles/suite.css';

/**
 * Las plataformas en /simplesuite: un bloque por cada una (SUITE_PLATFORMS: módulos de la suite + SimplePipeline), alternando
 * el lado de la vista previa, con sus 4 puntos clave debajo y un link a su página. Isla por las vistas previas animadas.
 */
export default function SuitePlatformsSection() {
  return (
    <div id="plataformas">
      <section style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x)' }}>
        <div
          data-reveal="1"
          style={{
            maxWidth: 'var(--page-max)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.2em', color: '#636262' }}>
            LAS PLATAFORMAS DE LA SUITE
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(34px,4vw,56px)',
              fontWeight: 800,
              letterSpacing: '-.04em',
              lineHeight: 1,
              maxWidth: '820px',
              textWrap: 'balance',
            }}
          >
            {SUITE_PLATFORMS.length} plataformas que trabajan como una sola<span style={{ color: '#DCD291' }}>.</span>
          </h2>
        </div>
      </section>

      {SUITE_PLATFORMS.map((m, i) => {
        const { Preview } = m;
        return (
          <section
            key={m.id}
            className="suite-platform"
            style={{ background: i % 2 ? '#fff' : '#F9F6EE', color: '#00249C' }}
          >
            <div className={`suite-platform-inner${i % 2 ? ' suite-platform-inner--flip' : ''}`}>
              <div className="suite-platform-copy" data-reveal="1">
                {/* Nombre de la plataforma bien visible, con su color y su categoría */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <span
                    aria-hidden="true"
                    style={{ width: '18px', height: '18px', borderRadius: '6px', background: m.color, flex: 'none' }}
                  ></span>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 'clamp(40px,4.6vw,64px)',
                      fontWeight: 800,
                      letterSpacing: '-.045em',
                      lineHeight: 1,
                    }}
                  >
                    {m.name}
                  </h3>
                  <span
                    style={{
                      padding: '6px 12px',
                      borderRadius: '999px',
                      border: `1px solid ${m.color}`,
                      color: '#00249C',
                      fontFamily: FONT_MONO,
                      fontSize: '11px',
                      letterSpacing: '.14em',
                    }}
                  >
                    {m.tag}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(20px,1.8vw,24px)',
                    fontWeight: 700,
                    letterSpacing: '-.02em',
                    lineHeight: 1.3,
                    textWrap: 'balance',
                  }}
                >
                  {m.head}
                </p>
                <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262' }}>{m.desc}</p>
                <SmartLink
                  className="hv-bg-gold hv-c-blue"
                  href={m.href}
                  style={{
                    alignSelf: 'flex-start',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '14px 22px',
                    borderRadius: '999px',
                    background: '#00249C',
                    color: '#F9F6EE',
                    fontSize: '15px',
                    fontWeight: 600,
                    transition: 'all .3s',
                  }}
                >
                  Explorar {m.name} <span style={{ fontFamily: FONT_MONO }}>→</span>
                </SmartLink>
              </div>
              <div className="suite-platform-preview" data-reveal="2">
                <PreviewWindow module={m}>
                  <Preview />
                </PreviewWindow>
              </div>
              <ul className="suite-platform-feats">
                {m.feats.map((f, j) => (
                  <li key={f.t} data-reveal={Math.min(j + 1, 4)}>
                    <span style={{ width: '28px', height: '4px', borderRadius: '2px', background: m.color }}></span>
                    <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-.02em' }}>{f.t}</span>
                    <span style={{ fontSize: '14px', lineHeight: 1.55, color: '#636262' }}>{f.d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
