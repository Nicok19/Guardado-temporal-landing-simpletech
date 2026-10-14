/** Chip con el punto de color de un producto (SimpleBots, SimpleSend, ...). */
export default function ProductChip({ name, color, border = '1px solid rgba(178,220,255,.25)', style }) {
  return (
    <span
      style={{
        fontSize: '12px',
        padding: '5px 10px',
        borderRadius: '999px',
        border,
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
        ...style,
      }}
    >
      <span style={{ width: '7px', height: '7px', borderRadius: '2px', background: color }}></span>
      {name}
    </span>
  );
}
