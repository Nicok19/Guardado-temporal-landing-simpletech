import { FONT_MONO } from '@/styles/tokens';

const dot = { width: '10px', height: '10px', borderRadius: '50%', background: '#DADAE4' };

/**
 * Marco tipo ventana de navegador (url + etiqueta del módulo) para la vista previa de un módulo.
 * `contentRef` = ref opcional del área de contenido (para animar el cambio de módulo).
 */
export default function PreviewWindow({ module, contentRef, children }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '28px',
        background: '#F9F6EE',
        color: '#04081c',
        minHeight: '460px',
        overflow: 'hidden',
        boxShadow: '0 50px 120px -40px rgba(0,0,0,.6)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 22px',
          borderBottom: '1px solid #DADAE4',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={dot}></span>
          <span style={dot}></span>
          <span style={dot}></span>
        </div>
        <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: '#636262' }}>{module.url ?? module.name}</span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: '10px',
            letterSpacing: '.14em',
            padding: '5px 10px',
            borderRadius: '999px',
            background: module.color,
            color: '#fff',
          }}
        >
          {module.tag}
        </span>
      </div>
      <div ref={contentRef} style={{ flex: 1, padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {children}
      </div>
    </div>
  );
}
