import SmartLink from '@/components/common/SmartLink';
import { ROUTES, suiteModulePath } from '@/config/routes';
import { FONT_MONO } from '@/styles/tokens';
import Icon from '@/sections/ProductShowcase/icons';
import '@/styles/producto.css';

// Los tres frentes que resuelven las plataformas, con los productos de cada uno.
const PILLARS = [
  {
    icon: 'whatsapp',
    t: 'Mensajería',
    d: 'Llegá a tus clientes por los canales que ya usan —WhatsApp, Instagram, Messenger, SMS, Webchat y voz— con bots e IA que responden al instante.',
    prods: [
      { name: 'SimpleBots', href: suiteModulePath('simplebots') },
      { name: 'SimpleSend', href: suiteModulePath('simplesend') },
      { name: 'SimpleVoice', href: suiteModulePath('simplevoice') },
    ],
  },
  {
    icon: 'users',
    t: 'Gestión de clientes',
    d: 'Cada conversación, con su historial y su contexto, en la bandeja del agente indicado; y métricas en tiempo real para decidir mejor.',
    prods: [
      { name: 'SimpleAgents', href: suiteModulePath('simpleagents') },
      { name: 'SimpleStats', href: suiteModulePath('simplestats') },
    ],
  },
  {
    icon: 'grid',
    t: 'Omnicanal y 360',
    d: 'Todos los canales conectados entre sí y con tus sistemas —CRM, ERP o propios— para ver a cada cliente completo y actuar en un solo lugar.',
    prods: [{ name: 'SimplePipeline', href: ROUTES.simplepipeline }],
  },
];

/**
 * Para qué están las plataformas: resolver los desafíos de las empresas en mensajería y gestión de
 * clientes, con una mirada omnicanal y 360. Va debajo del encabezado azul de /producto. Estática.
 */
export default function PurposeSection() {
  return (
    <section style={{ background: '#fff', color: '#00249C', padding: 'clamp(88px,10vw,140px) var(--page-x)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}
      >
        <div className="pr-purpose-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <span data-reveal="1" style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em' }}>
              NUESTRO ENFOQUE
            </span>
            <h2
              data-reveal="2"
              style={{
                margin: 0,
                fontSize: 'clamp(32px,4vw,56px)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-.045em',
                textWrap: 'balance',
              }}
            >
              Una empresa omnicanal, con una mirada 360 de cada cliente.
            </h2>
          </div>
          <p
            data-reveal="3"
            style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4b5160', textWrap: 'pretty' }}
          >
            Nuestras plataformas nacen para resolver los desafíos reales de las empresas: comunicarse con sus clientes
            por los canales que ya usan y gestionar cada relación sin perder el hilo. La idea es que todo funcione como
            un solo ecosistema, conectado a tus sistemas, para que cada cliente reciba la misma atención en cualquier
            canal.
          </p>
        </div>

        <div className="pr-pillars">
          {PILLARS.map((p, i) => (
            <div key={p.t} className="pr-pillar" data-reveal={String(i + 1)}>
              <span
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  display: 'grid',
                  placeItems: 'center',
                  background: '#00249C',
                  color: '#fff',
                }}
              >
                <Icon name={p.icon} size={24} />
              </span>
              <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1 }}>
                {p.t}
              </h3>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#4b5160' }}>{p.d}</p>
              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '8px' }}>
                {p.prods.map((pr) => (
                  <SmartLink
                    key={pr.name}
                    className="hv-bg-blue hv-c-cream"
                    href={pr.href}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '999px',
                      border: '1px solid #00249C',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#00249C',
                      transition: 'all .3s',
                    }}
                  >
                    {pr.name}
                  </SmartLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
