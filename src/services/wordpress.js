// Artículos del blog: se leen de la API de WordPress de simpletech.uy al compilar el sitio (y en desarrollo, al abrir
// la página). Las páginas /blog y /blog/:slug son estáticas: para que aparezca un artículo nuevo hay que volver a
// compilar/publicar el sitio (ej. con un webhook de WordPress que dispare el deploy).
//
// El contenido viene armado con Elementor: se limpia (sanitize-html) y queda solo el HTML del texto (títulos,
// párrafos, listas, links, imágenes, citas, tablas), que se muestra con los estilos de styles/blog.css.
import sanitizeHtml from 'sanitize-html';

export const WP_API = 'https://www.simpletech.uy/wp-json/wp/v2';
const PER_PAGE = 100; // máximo que permite WordPress por pedido

/** Texto plano de un fragmento HTML de WordPress (títulos y extractos traen entidades: &#8220;, &amp;…). */
export function plainText(html = '') {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

/** HTML del artículo, sin el maquetado de Elementor ni estilos. */
function cleanContent(html = '') {
  const clean = sanitizeHtml(html, {
    allowedTags: [
      'h2',
      'h3',
      'h4',
      'p',
      'ul',
      'ol',
      'li',
      'strong',
      'b',
      'em',
      'i',
      'a',
      'br',
      'blockquote',
      'figure',
      'figcaption',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'hr',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      td: ['colspan'],
      th: ['colspan'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    // Los h1 del contenido bajan a h2 (el h1 de la página es el título del artículo).
    transformTags: {
      h1: 'h2',
      h5: 'h4',
      h6: 'h4',
      a: (tagName, attribs) => {
        const external = /^https?:\/\//.test(attribs.href || '') && !attribs.href.includes('simpletech.uy');
        return {
          tagName,
          attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : { href: attribs.href },
        };
      },
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy', decoding: 'async' } }),
    },
    exclusiveFilter: (frame) =>
      // Párrafos y títulos vacíos que deja Elementor.
      ['p', 'h2', 'h3', 'h4', 'li'].includes(frame.tag) && !frame.text.trim() && !frame.mediaChildren?.length,
  });
  // Los links al blog viejo (simpletech.uy/blog/slug) pasan a este sitio.
  return clean.replace(/https:\/\/www\.simpletech\.uy\/(?:blog\/)?([a-z0-9-]+)\/?(?=")/g, (m, slug) =>
    POST_SLUGS.has(slug) ? `/blog/${slug}` : m,
  );
}
let POST_SLUGS = new Set();

const readingMinutes = (text) => Math.max(1, Math.round(text.split(' ').length / 200));

/** Post de la API → lo que usan las páginas. */
function toPost(p) {
  const text = plainText(p.content?.rendered);
  const terms = p._embedded?.['wp:term']?.[0] ?? [];
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  return {
    id: p.id,
    slug: p.slug,
    title: plainText(p.title?.rendered),
    excerpt: plainText(p.excerpt?.rendered),
    date: p.date,
    modified: p.modified,
    categories: terms.map((t) => t.name).filter((n) => n && n !== 'Sin categoría' && n !== 'Uncategorized'),
    image: media?.source_url || p.yoast_head_json?.og_image?.[0]?.url || '',
    imageAlt: media?.alt_text || plainText(p.title?.rendered),
    minutes: readingMinutes(text),
    rawContent: p.content?.rendered ?? '',
    sourceUrl: p.link,
  };
}

let cache = null;

/**
 * Todos los artículos publicados, del más nuevo al más viejo (se piden una sola vez por compilación).
 * Si la API no responde, devuelve [] y avisa por consola: el sitio compila igual, sin artículos.
 */
export function getPosts() {
  cache ??= (async () => {
    try {
      const all = [];
      for (let page = 1, pages = 1; page <= pages; page++) {
        const res = await fetch(`${WP_API}/posts?per_page=${PER_PAGE}&page=${page}&_embed=wp:featuredmedia,wp:term`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        pages = Number(res.headers.get('x-wp-totalpages')) || 1;
        all.push(...(await res.json()));
      }
      const posts = all.map(toPost);
      POST_SLUGS = new Set(posts.map((p) => p.slug));
      return posts.map(({ rawContent, ...p }) => ({ ...p, html: cleanContent(rawContent) }));
    } catch (err) {
      console.warn(`[blog] No se pudieron leer los artículos de WordPress (${WP_API}): ${err.message}`);
      cache = null; // reintenta en el próximo pedido (útil en desarrollo)
      return [];
    }
  })();
  return cache;
}

/** getStaticPaths de /blog/:slug (también lo usan /en, /pt y /fr). */
export async function blogPostPaths() {
  const posts = await getPosts();
  return posts.map((post, i) => ({
    params: { slug: post.slug },
    props: {
      post,
      // Relacionados: los más nuevos que comparten categoría; si no alcanza, los más nuevos.
      related: [
        ...posts.filter((p) => p !== post && p.categories.some((c) => post.categories.includes(c))),
        ...posts.filter((p) => p !== post),
      ]
        .filter((p, j, arr) => arr.indexOf(p) === j)
        .slice(0, 3)
        .map(({ html, ...p }) => p),
      index: i,
    },
  }));
}
