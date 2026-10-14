// Diccionario español → portugués del sitio (i18n/index.js). Un archivo por zona del sitio; las claves son los textos
// tal como están en el código y en src/data. Un texto que no figura acá se muestra en español.
import ui from './ui.js';
import data from './data.js';
import platforms from './platforms.js';
import casesA from './cases-a.js';
import casesB from './cases-b.js';
import manual from './manual.js';

export default { ...casesA, ...casesB, ...platforms, ...data, ...ui, ...manual };
