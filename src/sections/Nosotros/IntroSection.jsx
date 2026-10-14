// Presentación de Nosotros: dos párrafos sobre la empresa.
// `afterTop` = va debajo del encabezado y la foto (PageHero + PhotoBand): sin espacio arriba.
export default function IntroSection({ afterTop = false }) {
  return (
    <section
      style={{
        background: '#F9F6EE',
        color: '#00249C',
        padding: `${afterTop ? '0' : 'clamp(160px,16vw,220px)'} var(--page-x) clamp(80px,9vw,120px)`,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
          gap: '48px',
        }}
      >
        <p
          data-reveal="1"
          style={{ margin: 0, fontSize: 'clamp(18px,1.5vw,22px)', lineHeight: 1.55, textWrap: 'pretty' }}
        >
          Desde 2011 acompañamos a empresas de toda América Latina con una mirada consultiva: primero entendemos el
          negocio, después lo impulsamos con nuestras plataformas SaaS.
        </p>
        <p
          data-reveal="2"
          style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: '#636262', textWrap: 'pretty' }}
        >
          Combinamos solidez, conocimiento y capacidad de resolución con una cercanía profesional orientada a construir
          relaciones de confianza de largo plazo.
        </p>
      </div>
    </section>
  );
}
