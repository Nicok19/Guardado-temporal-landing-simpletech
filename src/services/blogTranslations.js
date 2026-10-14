// Traducciones de los artículos del blog (en WordPress están solo en español) al inglés, portugués y francés.
//
// Se traducen con Claude (API de Anthropic) y se guardan en src/content/blog-translations/<idioma>/<slug>.json,
// que va en el repositorio: cada artículo se traduce una sola vez por idioma y se vuelve a traducir solo si se
// edita en WordPress (cambia su fecha `modified`).
//
// Cuándo se traduce:
//   - `npm run blog:translate` traduce todo lo que falta (recomendado: correrlo y commitear los .json).
//   - Al compilar, solo si BLOG_TRANSLATE=true (ej. en el hosting, para que los artículos nuevos salgan traducidos
//     sin intervención). Sin esa variable la compilación NO llama a la API: usa lo guardado.
//   Las dos necesitan ANTHROPIC_API_KEY. Si un artículo no tiene traducción, se muestra en español con un aviso.
import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

export const TRANSLATION_LANGS = ['en', 'pt', 'fr'];
const DIR = path.resolve('src/content/blog-translations');
const LANG_NAMES = { en: 'English (US)', pt: 'Brazilian Portuguese', fr: 'French' };
const MODEL = 'claude-opus-5-5';

const fileOf = (lang, slug) => path.join(DIR, lang, `${slug}.json`);

/** Traducción guardada de un artículo, o null. `stale` = el artículo se editó después de traducirlo. */
export function readTranslation(post, lang) {
  try {
    const t = JSON.parse(fs.readFileSync(fileOf(lang, post.slug), 'utf8'));
    return { ...t, stale: t.modified !== post.modified };
  } catch {
    return null;
  }
}

const SYSTEM = `You translate blog articles from Simpletech, a Latin American company that builds customer-experience software (SimpleSuite, SimpleBots, SimpleAgents, SimpleSend, SimpleStats, SimpleVoice, SimplePipeline).

Translate the Spanish article you receive into the requested language, for business readers in that market:
- Keep the meaning, tone and structure. Write natural, idiomatic prose, not a word-for-word rendering.
- Keep product names, brand names and proper nouns as they are (WhatsApp, Meta, SimpleSuite…).
- The article body is HTML: keep every tag and attribute exactly as given (including href and src values) and translate only the visible text and alt attributes.
- Reply with exactly three sections and nothing else:
<title>translated title</title>
<excerpt>translated excerpt</excerpt>
<html>translated HTML body</html>`;

let client = null;

/** Traduce un artículo con Claude y guarda el resultado. Devuelve la traducción o null si no se pudo. */
export async function translatePost(post, lang) {
  client ??= new Anthropic();
  // El artículo en español va primero (cacheado): las traducciones al resto de los idiomas lo leen del caché.
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 64000,
    output_config: { effort: 'medium' },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: SYSTEM,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `<title>${post.title}</title>\n<excerpt>${post.excerpt}</excerpt>\n<html>${post.html}</html>`,
            cache_control: { type: 'ephemeral' },
          },
          { type: 'text', text: `Translate this article into ${LANG_NAMES[lang]}.` },
        ],
      },
    ],
  });
  const message = await stream.finalMessage();
  if (message.stop_reason !== 'end_turn') {
    console.warn(`[blog] ${post.slug} (${lang}): la traducción terminó con "${message.stop_reason}", se omite.`);
    return null;
  }
  const text = message.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');
  const pick = (tag) => text.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim();
  const translation = { title: pick('title'), excerpt: pick('excerpt'), html: pick('html') };
  if (!translation.title || !translation.html) {
    console.warn(`[blog] ${post.slug} (${lang}): la respuesta no trae título o contenido, se omite.`);
    return null;
  }
  const saved = { slug: post.slug, lang, modified: post.modified, model: message.model, ...translation };
  fs.mkdirSync(path.join(DIR, lang), { recursive: true });
  fs.writeFileSync(fileOf(lang, post.slug), JSON.stringify(saved, null, 1));
  return { ...saved, usage: message.usage };
}

const canTranslateOnBuild = () => process.env.BLOG_TRANSLATE === 'true' && Boolean(process.env.ANTHROPIC_API_KEY);

/**
 * El artículo en el idioma de la página. En español, el original. En otro idioma, la traducción guardada (o la
 * genera, si la compilación tiene permitido traducir); si no hay, el original con `translated: false`.
 */
export async function localizePost(post, lang) {
  if (!TRANSLATION_LANGS.includes(lang)) return { ...post, translated: true };
  let t = readTranslation(post, lang);
  if ((!t || t.stale) && canTranslateOnBuild()) {
    try {
      t = (await translatePost(post, lang)) ?? t;
    } catch (err) {
      console.warn(`[blog] ${post.slug} (${lang}): no se pudo traducir (${err.message}).`);
    }
  }
  return t
    ? { ...post, title: t.title, excerpt: t.excerpt, html: t.html, translated: true }
    : { ...post, translated: false };
}

/** Título y extracto traducidos para las tarjetas (sin llamar a la API: solo lo guardado). */
export function localizeCard(post, lang) {
  const t = TRANSLATION_LANGS.includes(lang) ? readTranslation(post, lang) : null;
  return t ? { ...post, title: t.title, excerpt: t.excerpt } : post;
}
