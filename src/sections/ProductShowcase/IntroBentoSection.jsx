import { useState } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Kicker } from './ui';
import { CARDS } from './cards';

const TICK_MS = 1100;

/**
 * Intro de una página de producto al estilo gorgias.com: kicker, titular en dos tonos y bento de
 * 4 tarjetas con mini interfaces animadas (isla, client:visible). Todas comparten el mismo reloj.
 * `intro` = { kicker, title, titleMuted } · `cards` = [{ type, size, blue, ...datos de la tarjeta }]
 * Con prefers-reduced-motion cada tarjeta se ve en su estado final.
 */
export default function IntroBentoSection({ intro, cards }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [step, setStep] = useState(0);
  useInterval(() => setStep((s) => s + 1), reduced ? null : TICK_MS);

  return (
    <section style={{ background: '#F9F6EE', padding: '0 var(--page-x) clamp(72px,8vw,112px)' }}>
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Kicker>{intro.kicker}</Kicker>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              maxWidth: '900px',
              fontSize: 'clamp(32px,4.2vw,58px)',
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: '-.045em',
              color: '#00249C',
              textWrap: 'balance',
            }}
          >
            {intro.title} <span style={{ color: '#9AA3C7' }}>{intro.titleMuted}</span>
          </h2>
        </div>
        <div className="sb-bento">
          {cards.map((card, i) => {
            const CardType = CARDS[card.type];
            return (
              <CardType key={card.type + i} data={card} step={step} reduced={reduced} reveal={String((i % 2) + 1)} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
