import { numberLocale, t } from '@/i18n';
import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, LINE, SKY, panel, panelHead, panelSub } from '../ui';

/**
 * Campaña saliente: se completa la configuración, el mensaje toma las variables y avanza el embudo de envío.
 * data = { title, name, settings: [{ t, v }], template, fill: { var: valor }, funnel: [{ label, value }] }
 */
export default function CampaignCard({ data, step, reduced, reveal }) {
  const n = data.settings.length;
  const cycle = n + data.funnel.length + 4;
  const s = reduced ? cycle - 1 : step % cycle;
  const filled = s >= n; // con la configuración lista, el mensaje muestra los datos del cliente
  const sent = Math.max(0, s - n); // etapas del embudo visibles
  const max = data.funnel[0].value;
  // El mensaje se traduce antes de completarlo (src/i18n); las variables se completan en orden, porque en la
  // traducción se llaman distinto ({{nombre}} → {{name}}).
  const vars = [...data.template.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]);
  let v = 0;
  const message = t(data.template).replace(/\{\{(\w+)\}\}/g, (_, k) => (filled ? data.fill[vars[v++]] : `{{${k}}}`));

  return (
    <Card size={data.size} blue={data.blue} title={data.title} reveal={reveal}>
      <div className="sb-editor">
        <div style={panel}>
          <div style={panelHead}>
            Nueva campaña
            <span style={panelSub}>{data.name}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px' }}>
            {data.settings.map((r, i) => {
              const on = i < s || filled;
              return (
                <div
                  key={r.t}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: `1px solid ${on ? BLUE : LINE}`,
                    background: on ? SKY : '#fff',
                    transition: 'all .4s',
                  }}
                >
                  <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '.12em', color: '#636262' }}>
                    {r.t.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#04081c', textAlign: 'right' }}>{r.v}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={panel}>
          <div style={panelHead}>
            Vista previa
            <span style={{ ...panelSub, display: 'flex', gap: '6px', alignItems: 'center', color: BLUE }}>
              <Icon name="whatsapp" size={13} /> WHATSAPP
            </span>
          </div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span
              style={{
                alignSelf: 'flex-start',
                maxWidth: '92%',
                padding: '9px 12px',
                borderRadius: '12px 12px 12px 4px',
                background: SKY,
                fontSize: '12px',
                lineHeight: 1.45,
                color: '#04081c',
              }}
            >
              {message}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {data.funnel.map((f, i) => {
                const show = i < sent;
                return (
                  <div
                    key={f.label}
                    style={{ display: 'grid', gridTemplateColumns: '74px 1fr 48px', gap: '8px', alignItems: 'center' }}
                  >
                    <span style={{ fontSize: '11px', color: '#04081c' }}>{f.label}</span>
                    <span style={{ height: '8px', borderRadius: '4px', background: SKY, overflow: 'hidden' }}>
                      <span
                        style={{
                          display: 'block',
                          height: '100%',
                          width: show ? `${(f.value / max) * 100}%` : '0%',
                          borderRadius: '4px',
                          background: BLUE,
                          transition: 'width .9s cubic-bezier(.2,.8,.2,1)',
                        }}
                      ></span>
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: '10px',
                        color: '#636262',
                        textAlign: 'right',
                        opacity: show ? 1 : 0,
                        transition: 'opacity .4s',
                      }}
                    >
                      {f.value.toLocaleString(numberLocale())}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
