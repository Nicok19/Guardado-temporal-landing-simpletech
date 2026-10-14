import { FONT_MONO } from '@/styles/tokens';

/**
 * Cita corta de una persona del cliente, dentro de otra sección (desafío, "por qué nos eligieron").
 * `quote` = { text, author, role, photo? } · `dark` = sobre fondo oscuro
 */
export default function InlineQuote({ quote, dark = false }) {
  return (
    <figure
      style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '20px 22px',
        borderRadius: '20px',
        background: dark ? 'rgba(255,255,255,.08)' : '#fff',
        border: dark ? '1px solid rgba(178,220,255,.18)' : '1px solid #DADAE4',
      }}
    >
      <blockquote
        style={{
          margin: 0,
          fontSize: '15px',
          lineHeight: 1.55,
          fontStyle: 'italic',
          color: dark ? '#F9F6EE' : '#04081c',
          textWrap: 'pretty',
        }}
      >
        “{quote.text}”
      </blockquote>
      <figcaption style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {quote.photo && (
          <img
            src={quote.photo}
            alt={quote.author}
            loading="lazy"
            width="40"
            height="40"
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flex: 'none' }}
          />
        )}
        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: dark ? '#F9F6EE' : '#00249C' }}>{quote.author}</span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: '11px',
              letterSpacing: '.1em',
              color: dark ? '#b2dcff' : '#636262',
            }}
          >
            {quote.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
