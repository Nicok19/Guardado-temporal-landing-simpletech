import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card } from '../ui';

/**
 * Canales orbitando alrededor del producto; el canal activo se resalta en dorado.
 * data = { title, items: ['WhatsApp', ...], label, centerIcon }
 */
export default function ChannelsCard({ data, step, reveal }) {
  const items = data.items;
  const active = step % items.length;
  return (
    <Card
      size={data.size}
      blue={data.blue}
      title={data.title}
      reveal={reveal}
      footer={
        <span
          style={{
            textAlign: 'center',
            fontFamily: FONT_MONO,
            fontSize: '12px',
            letterSpacing: '.14em',
            color: data.blue ? '#b2dcff' : '#636262',
          }}
        >
          {data.label} <span style={{ color: data.blue ? '#DCD291' : BLUE }}>{items[active].toUpperCase()}</span>
        </span>
      }
    >
      <div className="sb-orbit">
        <span className="sb-orbit-ring"></span>
        <span className="sb-orbit-ring sb-orbit-ring--inner"></span>
        <div
          style={{
            position: 'absolute',
            inset: '84px',
            borderRadius: '24px',
            display: 'grid',
            placeItems: 'center',
            background: '#fff',
            color: BLUE,
            boxShadow: '0 16px 36px -16px rgba(0,0,0,.5)',
          }}
        >
          <Icon name={data.centerIcon ?? 'flow'} size={34} />
        </div>
        <div className="sb-orbit-spin">
          {items.map((ch, i) => (
            <span
              key={ch}
              className="sb-orbit-item"
              data-active={i === active}
              title={ch}
              style={{ '--a': `${(360 / items.length) * i}deg` }}
            >
              <Icon name={ch.toLowerCase()} size={22} />
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
