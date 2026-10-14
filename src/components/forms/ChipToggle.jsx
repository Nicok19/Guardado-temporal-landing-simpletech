/** Botón tipo chip seleccionable (selección múltiple). */
export default function ChipToggle({ selected, onToggle, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      style={{
        font: '500 13px Inter,sans-serif',
        padding: '9px 14px',
        borderRadius: '999px',
        cursor: 'pointer',
        border: `1px solid ${selected ? '#00249C' : '#DADAE4'}`,
        background: selected ? '#00249C' : '#fff',
        color: selected ? '#F9F6EE' : '#00249C',
        transition: 'all .25s',
      }}
    >
      {children}
    </button>
  );
}
