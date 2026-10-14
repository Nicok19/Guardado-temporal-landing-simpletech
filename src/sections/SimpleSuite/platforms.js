import { ROUTES, suiteModulePath } from '@/config/routes';
import { SUITE_MODULES } from '@/data/suiteModules';
import { PRODUCT_COLORS } from '@/data/products';
import simplepipeline from '@/data/showcases/simplepipeline';

/**
 * Las plataformas de la página /simplesuite: los módulos de SimpleSuite y SimplePipeline, todas con la misma forma
 * ({ id, name, tag, color, head, href }). La frase de SimplePipeline sale de su página
 * (data/showcases/simplepipeline.js) para no repetirla.
 */
export const SUITE_PLATFORMS = [
  ...SUITE_MODULES.map(({ id, name, tag, color, head }) => ({ id, name, tag, color, head, href: suiteModulePath(id) })),
  {
    id: 'simplepipeline',
    name: 'SimplePipeline',
    tag: 'AGENTES IA',
    color: PRODUCT_COLORS.SimplePipeline,
    head: simplepipeline.hero.title,
    href: ROUTES.simplepipeline,
  },
];
