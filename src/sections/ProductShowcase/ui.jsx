import { FONT_MONO } from '@/styles/tokens';

// Piezas compartidas de las páginas de producto (estilo gorgias.com): paneles, burbujas de chat y tarjetas.
export const BLUE = '#00249C';
export const LINE = '#e6e4ee';
export const SKY = '#E8EEFF';

export const kicker = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  fontFamily: FONT_MONO,
  fontSize: '12px',
  letterSpacing: '.2em',
  color: '#04081c',
};

export const panel = {
  borderRadius: '16px',
  background: '#fff',
  border: `1px solid ${LINE}`,
  boxShadow: '0 24px 48px -28px rgba(0,36,156,.35)',
  overflow: 'hidden',
};

export const panelHead = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 14px',
  borderBottom: `1px solid ${LINE}`,
  fontSize: '12px',
  fontWeight: 600,
  color: '#04081c',
  whiteSpace: 'nowrap',
};

export const panelSub = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontFamily: FONT_MONO,
  fontSize: '10px',
  fontWeight: 400,
  color: '#636262',
};

export const monoLabel = { fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.12em' };

/** Etiqueta chica con punto (ej. "● CONOCÉ SIMPLEBOTS"). */
export function Kicker({ children, reveal = '1' }) {
  return (
    <span data-reveal={reveal} style={kicker}>
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: BLUE }}></span>
      {children}
    </span>
  );
}

/** Tarjeta del bento. `size` = 'wide' | 'narrow' · `blue` = fondo azul de marca. */
export function Card({ size = 'wide', blue = false, title, reveal = '1', children, footer }) {
  return (
    <div className={`sb-card sb-card--${size}${blue ? ' sb-card--blue' : ''}`} data-reveal={reveal}>
      {title && <h3 className="sb-card-title">{title}</h3>}
      <div className="sb-card-stage">{children}</div>
      {footer}
    </div>
  );
}

/**
 * Burbuja de chat; aparece con fade + subida cuando `show`.
 * `out` = mensaje propio (a la derecha, en azul): el cliente cuando prueba un bot, el agente en la bandeja.
 */
export function Bubble({ out, show, children }) {
  return (
    <span
      style={{
        alignSelf: out ? 'flex-end' : 'flex-start',
        maxWidth: '88%',
        padding: '8px 11px',
        borderRadius: out ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
        background: out ? BLUE : SKY,
        color: out ? '#fff' : '#04081c',
        fontSize: '12px',
        lineHeight: 1.4,
        opacity: show ? 1 : 0,
        transform: show ? 'none' : 'translateY(6px)',
        transition: 'opacity .4s ease, transform .4s cubic-bezier(.2,.8,.2,1)',
      }}
    >
      {children}
    </span>
  );
}

/** Mensajes ({ t, out? }) que aparecen de a uno según `count` (cuántos se ven). */
export function ChatLog({ messages, count, minHeight = '150px' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minHeight, justifyContent: 'flex-end' }}>
      {messages.map((m, i) => (
        <Bubble key={i} out={m.out} show={i < count}>
          {m.t}
        </Bubble>
      ))}
    </div>
  );
}

/**
 * Onda de voz: barras que suben y bajan (keyframes sb-wave en showcase.css) mientras `active`.
 * `bars` = cantidad · `color` · `height` en px.
 */
export function Waveform({ active = true, bars = 24, color = BLUE, height = 36 }) {
  return (
    <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: '3px', height: `${height}px` }}>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="sb-wave-bar"
          style={{
            width: '3px',
            height: '100%',
            borderRadius: '2px',
            background: color,
            transform: active ? undefined : 'scaleY(.12)',
            animation: active ? undefined : 'none',
            // Cada barra con su propio ritmo, para que la onda no se vea mecánica
            animationDuration: `${0.7 + ((i * 37) % 9) / 10}s`,
            animationDelay: `${-((i * 53) % 10) / 10}s`,
          }}
        ></span>
      ))}
    </span>
  );
}

/** Ícono dentro de un cuadrado redondeado (badges de check, avatares). */
export function IconTile({ children, size = 32, bg = SKY, color = BLUE, radius = '10px' }) {
  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        flex: 'none',
        borderRadius: radius,
        display: 'grid',
        placeItems: 'center',
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}
