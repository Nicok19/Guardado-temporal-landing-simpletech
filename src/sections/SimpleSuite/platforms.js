import { ROUTES, suiteModulePath } from '@/config/routes';
import { SUITE_MODULES } from '@/data/suiteModules';
import { PRODUCT_COLORS } from '@/data/products';
import simplepipeline from '@/data/showcases/simplepipeline';
import { MODULE_PREVIEWS } from './previews';

/**
 * Las plataformas de la página /simplesuite: los módulos de SimpleSuite y SimplePipeline, todas con la misma forma
 * ({ id, name, tag, color, head, desc, feats, href, Preview }). Los textos de SimplePipeline salen de su página
 * (data/showcases/simplepipeline.js) para no repetirlos.
 */
export const SUITE_PLATFORMS = [
  ...SUITE_MODULES.map((m) => ({ ...m, href: suiteModulePath(m.id), Preview: MODULE_PREVIEWS[m.id] })),
  {
    id: 'simplepipeline',
    name: 'SimplePipeline',
    tag: 'AGENTES IA',
    color: PRODUCT_COLORS.SimplePipeline,
    head: simplepipeline.hero.title,
    desc: simplepipeline.hero.lead,
    feats: simplepipeline.solutions.map(({ t, d }) => ({ t, d })),
    href: ROUTES.simplepipeline,
    Preview: MODULE_PREVIEWS.simplepipeline,
  },
];
