import { FONT_MONO } from '@/styles/tokens';

// Estilo base compartido por las tres escenas: sin fondo ni borde, se funde con el fondo del hero.
export const panelStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '20px',
  overflow: 'hidden',
};

export const monoLabel = { fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '.12em', color: '#8fa0d8' };

// Paleta y "sticker" del estilo ilustrado (el mismo de la sección de Telefonía): colores planos,
// contorno de tinta y sombra dura, sin brillos ni desenfoques.
export const ILLU = {
  ink: '#04081c',
  cream: '#F9F6EE',
  blue: '#00249C',
  gold: '#DCD291',
  sky: '#b2dcff',
  mint: '#7fd9ae',
  lilac: '#d4c2ff',
};

export const sticker = (bg, shadow = 4) => ({
  background: bg,
  color: ILLU.ink,
  border: `2px solid ${ILLU.ink}`,
  boxShadow: `${shadow}px ${shadow}px 0 ${ILLU.ink}`,
});
