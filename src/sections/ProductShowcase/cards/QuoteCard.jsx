import SmartLink from '@/components/common/SmartLink';
import { FONT_MONO } from '@/styles/tokens';
import Icon from '../icons';
import { BLUE, Card, ChatLog, IconTile, LINE, panel } from '../ui';

/**
 * Cita real de un cliente + chat ilustrativo que termina en una tarjeta de resultado (ticket, derivación...).
 * data = { title, logo, logoDark?, client, quote, author, role, photo?, href, chat: [{ t, out? }], result: { t, d, icon? } }
 * `logoDark` = oscurecer el logo (para archivos blancos sobre la tarjeta blanca).
 */
export default function QuoteCard({ data: q, step, reduced, reveal }) {
  const cycle = q.chat.length + 4;
  const s = reduced ? q.chat.length + 1 : step % cycle;
  const done = s > q.chat.length;
  return (
    <Card size={q.size} blue={q.blue} title={q.title} reveal={reveal}>
      <div className="sb-quote">
        <figure
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            paddingLeft: '18px',
            borderLeft: `2px solid ${LINE}`,
          }}
        >
          <img
            src={q.logo}
            alt={q.client}
            loading="lazy"
            style={{
              height: '30px',
              width: 'auto',
              alignSelf: 'flex-start',
              filter: q.logoDark ? 'brightness(0)' : undefined,
            }}
          />
          <blockquote style={{ margin: 0, fontSize: '17px', lineHeight: 1.45, color: '#04081c', textWrap: 'pretty' }}>
            “{q.quote}”
          </blockquote>
          <figcaption style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {q.photo && (
              <img
                src={q.photo}
                alt={q.author}
                loading="lazy"
                width="36"
                height="36"
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: BLUE }}>{q.author}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.1em', color: '#636262' }}>
                {q.role.toUpperCase()}
              </span>
            </span>
          </figcaption>
          <SmartLink
            className="hv-c-blue"
            href={q.href}
            style={{ fontSize: '14px', fontWeight: 600, color: BLUE, display: 'flex', gap: '8px' }}
          >
            Ver el caso <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
        </figure>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ ...panel, padding: '12px' }}>
            <ChatLog messages={q.chat} count={s} />
          </div>
          <div
            style={{
              ...panel,
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              padding: '12px 14px',
              opacity: done ? 1 : 0,
              transform: done ? 'none' : 'translateY(8px) scale(.98)',
              transition: 'opacity .5s ease, transform .5s cubic-bezier(.2,.8,.2,1)',
            }}
          >
            <IconTile>
              <Icon name={q.result.icon ?? 'check'} size={16} strokeWidth={2.2} />
            </IconTile>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#04081c' }}>{q.result.t}</span>
              <span style={{ fontSize: '11px', color: '#636262' }}>{q.result.d}</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
