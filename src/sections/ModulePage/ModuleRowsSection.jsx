import { useState } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';
import { CARDS } from '@/sections/ProductShowcase/cards';
import '@/styles/showcase.css';
import '@/styles/module-page.css';

const TICK_MS = 1100;

/**
 * Capacidades de una plataforma en filas que alternan texto y tarjeta animada (como zendesk.com.mx/service/ai).
 * `rows` = [{ kicker, title, text, link?, full?, card: { type, ... } }] (`full`: texto arriba y tarjeta a todo el ancho). Las tarjetas comparten el mismo reloj;
 * con prefers-reduced-motion se ven en su estado final. Isla (client:visible).
 */
export default function ModuleRowsSection({ rows }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [step, setStep] = useState(0);
  useInterval(() => setStep((s) => s + 1), reduced ? null : TICK_MS);

  return (
    <div id="capacidades">
      {rows.map((r, i) => {
        const CardType = CARDS[r.card.type];
        return (
          <section key={r.title} className="module-row" style={{ background: i % 2 ? '#F9F6EE' : '#fff' }}>
            <div
              className={`module-row-inner${r.full ? ' module-row-inner--full' : i % 2 ? ' module-row-inner--flip' : ''}`}
            >
              <div className="module-row-copy" data-reveal="1">
                <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.18em', color: '#636262' }}>
                  {r.kicker}
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(30px,3.4vw,48px)',
                    fontWeight: 800,
                    letterSpacing: '-.04em',
                    lineHeight: 1.02,
                    textWrap: 'balance',
                  }}
                >
                  {r.title}
                </h2>
                <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, color: '#636262' }}>{r.text}</p>
                {r.link && (
                  <SmartLink
                    className="hv-c-ink"
                    href={r.link.href}
                    style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '15px', color: '#00249C' }}
                  >
                    {r.link.label} <span style={{ fontFamily: FONT_MONO }}>→</span>
                  </SmartLink>
                )}
              </div>
              <div className="module-row-card">
                <CardType
                  data={{ ...r.card, size: r.full ? 'full' : 'wide' }}
                  step={step}
                  reduced={reduced}
                  reveal="2"
                />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
