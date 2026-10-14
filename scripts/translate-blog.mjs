// Traduce los artículos del blog que todavía no tienen traducción (o que se editaron en WordPress) al inglés,
// portugués y francés, y los guarda en src/content/blog-translations/ (ver src/services/blogTranslations.js).
//
//   npm run blog:translate                 todo lo que falta, en los 3 idiomas
//   npm run blog:translate -- --limit 2    solo los 2 artículos más nuevos (para probar)
//   npm run blog:translate -- --lang en    un solo idioma
//
// Necesita ANTHROPIC_API_KEY (en el entorno o en .env.local). Después, commitear los .json generados.
import { getPosts } from '../src/services/wordpress.js';
import { TRANSLATION_LANGS, readTranslation, translatePost } from '../src/services/blogTranslations.js';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
};
const limit = Number(arg('limit')) || Infinity;
const langs = arg('lang') ? [arg('lang')] : TRANSLATION_LANGS;
const CONCURRENCY = 3;

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Falta ANTHROPIC_API_KEY (definila en el entorno o en .env.local).');
  process.exit(1);
}

const posts = (await getPosts()).slice(0, limit);
// Un artículo a la vez y sus idiomas seguidos: así las traducciones 2 y 3 leen el artículo del caché.
const jobs = posts.flatMap((post) =>
  langs.filter((lang) => readTranslation(post, lang)?.stale !== false).map((lang) => ({ post, lang })),
);
console.log(`${posts.length} artículos · ${jobs.length} traducciones pendientes (${langs.join(', ')})`);

let done = 0;
let failed = 0;
const tokens = { input: 0, cached: 0, output: 0 };
async function worker() {
  while (jobs.length) {
    const { post, lang } = jobs.shift();
    try {
      const t = await translatePost(post, lang);
      if (!t) failed++;
      else {
        tokens.input += t.usage.input_tokens + (t.usage.cache_creation_input_tokens ?? 0);
        tokens.cached += t.usage.cache_read_input_tokens ?? 0;
        tokens.output += t.usage.output_tokens;
      }
    } catch (err) {
      failed++;
      console.warn(`  ✗ ${lang} · ${post.slug}: ${err.message}`);
    }
    done++;
    console.log(`  ${done} · ${lang} · ${post.slug}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// Costo aproximado con los precios de Claude Opus 5.5 ($4 entrada, $0,20 caché, $20 salida por millón de tokens).
const usd = (tokens.input * 4 + tokens.cached * 0.2 + tokens.output * 20) / 1e6;
console.log(
  `Listo: ${done - failed} traducidas, ${failed} con error. Tokens: ${tokens.input} entrada, ${tokens.cached} caché, ${tokens.output} salida (~US$ ${usd.toFixed(2)}).`,
);
