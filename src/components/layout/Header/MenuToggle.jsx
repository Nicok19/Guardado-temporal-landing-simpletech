const line = {
  position: 'absolute',
  left: '13px',
  width: '18px',
  height: '2px',
  borderRadius: '2px',
  background: '#fff',
  transition: 'transform .3s cubic-bezier(.2,.8,.2,1), opacity .2s',
};

/** Botón hamburguesa que se transforma en X cuando el menú está abierto. */
export default function MenuToggle({ open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={open}
      aria-controls="mobile-menu"
      style={{
        position: 'relative',
        flex: 'none',
        width: '44px',
        height: '44px',
        borderRadius: '999px',
        border: `1px solid ${open ? '#DCD291' : 'rgba(178,220,255,.25)'}`,
        background: open ? 'rgba(220,210,145,.12)' : 'transparent',
        cursor: 'pointer',
        transition: 'background .3s, border-color .3s',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span style={{ ...line, top: '15px', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}></span>
      <span style={{ ...line, top: '21px', opacity: open ? 0 : 1 }}></span>
      <span style={{ ...line, top: '27px', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}></span>
    </button>
  );
}
