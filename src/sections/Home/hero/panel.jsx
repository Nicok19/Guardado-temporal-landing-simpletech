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
