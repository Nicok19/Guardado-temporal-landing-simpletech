// Color de marca de cada producto (chips, puntos, filtros).
export const PRODUCT_COLORS = {
  SimpleSuite: '#DCD291',
  SimpleBots: '#7367f0',
  SimpleAgents: '#00cfe8',
  SimpleSend: '#28c76f',
  SimpleStats: '#1e9aff',
  SimplePipeline: '#f97316',
  SimpleVoice: '#a855f7',
};

/** ['SimpleBots'] → [{ name: 'SimpleBots', color: '#7367f0' }] */
export const toProductChips = (names) => names.map((name) => ({ name, color: PRODUCT_COLORS[name] }));
