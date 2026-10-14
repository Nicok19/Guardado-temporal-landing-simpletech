import { useEffect, useRef, useState } from 'react';
import ChipToggle from '@/components/forms/ChipToggle';
import { FONT_MONO } from '@/styles/tokens';
import PostCard from './PostCard';

const ALL = 'Todas';
const PAGE = 12; // artículos por página (sin contar el destacado)
const PAGE_PARAM = 'pagina'; // ?pagina=3 en la URL: se puede compartir o volver atrás

/** Páginas a mostrar en el paginado: siempre la primera, la última y las vecinas de la actual; el resto, "…". */
function pageItems(page, total) {
  const keep = new Set([1, total, page - 1, page, page + 1]);
  const items = [];
  for (let n = 1; n <= total; n++) {
    if (keep.has(n)) items.push(n);
    else if (items.at(-1) !== '…') items.push('…');
  }
  return items;
}

const pageBtn = (active) => ({
  minWidth: '44px',
  height: '44px',
  padding: '0 12px',
  borderRadius: '999px',
  border: `1px solid ${active ? '#00249C' : '#DADAE4'}`,
  background: active ? '#00249C' : '#fff',
  color: active ? '#F9F6EE' : '#00249C',
  font: '600 15px Inter,sans-serif',
  cursor: active ? 'default' : 'pointer',
  transition: 'all .25s',
});
// Para buscar sin importar mayúsculas ni tildes ("whatsapp" encuentra "WhatsApp", "ia" encuentra "IA").
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const fieldStyle = {
  font: '400 15px Inter,sans-serif',
  padding: '12px 14px',
  borderRadius: '14px',
  border: '1px solid #DADAE4',
  background: '#fff',
  color: '#00249C',
  outline: 'none',
};

/**
 * Listado de /blog: el artículo más nuevo destacado arriba y el resto en grilla, con buscador por título, filtro
 * por año, filtro por categoría y paginado (de a PAGE). Isla. `posts` = artículos sin el contenido (services/wordpress.js).
 */
export default function BlogListSection({ posts }) {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  // Categorías ordenadas por cantidad de artículos.
  const counts = posts.flatMap((p) => p.categories).reduce((m, c) => m.set(c, (m.get(c) || 0) + 1), new Map());
  const categories = [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)];

  // Años con artículos, del más nuevo al más viejo.
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];

  const q = normalize(query.trim());
  const filtered = posts.filter(
    (p) =>
      (category === ALL || p.categories.includes(category)) &&
      (!year || p.date.startsWith(year)) &&
      (!q || normalize(p.title).includes(q)),
  );
  const hasFilters = Boolean(q || year || category !== ALL);
  // Sin filtros, el más nuevo va destacado arriba de la primera página; con filtros, todo va en la grilla.
  const [first, ...others] = filtered;
  const list = hasFilters ? filtered : others;
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const current = Math.min(page, pages);
  const featured = !hasFilters && current === 1 ? first : null;
  const visible = list.slice((current - 1) * PAGE, current * PAGE);
  // Rango que se ve, contando el destacado (ej. "13–24 de 92").
  const offset = hasFilters ? 0 : 1;
  const from = filtered.length ? (current - 1) * PAGE + 1 + (current > 1 ? offset : 0) : 0;
  const to = Math.min(current * PAGE + offset, filtered.length);

  // Página inicial desde la URL (?pagina=3).
  useEffect(() => {
    const n = Number(new URLSearchParams(location.search).get(PAGE_PARAM));
    if (n > 1) setPage(n);
  }, []);

  const goTo = (n) => {
    setPage(n);
    const url = new URL(location.href);
    if (n > 1) url.searchParams.set(PAGE_PARAM, n);
    else url.searchParams.delete(PAGE_PARAM);
    history.replaceState(null, '', url);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    topRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  // Al cambiar un filtro o la búsqueda, vuelve a la página 1.
  const update = (fn) => (value) => {
    fn(value);
    if (page !== 1) goTo(1);
  };
  const pick = update(setCategory);
  const clear = () => {
    setQuery('');
    setYear('');
    setCategory(ALL);
    if (page !== 1) goTo(1);
  };

  if (!posts.length) {
    return (
      <section style={{ background: '#F9F6EE', padding: '0 var(--page-x) clamp(88px,10vw,140px)' }}>
        <p style={{ maxWidth: 'var(--page-max)', margin: '0 auto', color: '#636262', fontSize: '17px' }}>
          No pudimos cargar los artículos en este momento.
        </p>
      </section>
    );
  }

  return (
    <section
      id="articulos"
      style={{ background: '#F9F6EE', color: '#00249C', padding: '0 var(--page-x) clamp(88px,10vw,140px)' }}
    >
      <div
        style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        {/* Buscador por título y año (al cambiar de página se vuelve hasta acá) */}
        <div
          ref={topRef}
          role="search"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', scrollMarginTop: '120px' }}
        >
          <input
            type="search"
            value={query}
            onChange={(e) => update(setQuery)(e.target.value)}
            placeholder="Buscar por título"
            aria-label="Buscar por título"
            className="fx-bd-blue"
            style={{ ...fieldStyle, flex: '1 1 280px', minWidth: 0 }}
          />
          <select
            value={year}
            onChange={(e) => update(setYear)(e.target.value)}
            aria-label="Año"
            className="fx-bd-blue"
            style={{ ...fieldStyle, flex: '0 1 170px', cursor: 'pointer' }}
          >
            <option value="">Todos los años</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {hasFilters && (
            <button
              type="button"
              onClick={clear}
              className="hv-c-ink"
              style={{
                border: 'none',
                background: 'transparent',
                color: '#00249C',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '8px 4px',
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div role="group" aria-label="Categorías" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((c) => (
            <ChipToggle key={c} selected={c === category} onToggle={() => pick(c)}>
              {c}
            </ChipToggle>
          ))}
        </div>

        {featured && <PostCard post={featured} large />}

        {filtered.length === 0 && (
          <p style={{ margin: 0, padding: '40px 0', fontSize: '17px', color: '#636262', textAlign: 'center' }}>
            No encontramos artículos con esos filtros.
          </p>
        )}

        {visible.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))',
              gap: '20px',
            }}
          >
            {visible.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.12em', color: '#636262' }}>
              {`${from}–${to} DE ${filtered.length} ARTÍCULOS`}
            </span>
            {pages > 1 && (
              <nav
                aria-label="Paginado"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}
              >
                <button
                  type="button"
                  onClick={() => goTo(current - 1)}
                  disabled={current === 1}
                  aria-label="Página anterior"
                  className={current === 1 ? undefined : 'hv-bd-blue'}
                  style={{
                    ...pageBtn(false),
                    opacity: current === 1 ? 0.4 : 1,
                    cursor: current === 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  ←
                </button>
                {pageItems(current, pages).map((n, i) =>
                  n === '…' ? (
                    <span key={`gap${i}`} aria-hidden="true" style={{ padding: '0 4px', color: '#636262' }}>
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      type="button"
                      onClick={() => n !== current && goTo(n)}
                      aria-label={`Página ${n}`}
                      aria-current={n === current ? 'page' : undefined}
                      className={n === current ? undefined : 'hv-bd-blue'}
                      style={pageBtn(n === current)}
                    >
                      {String(n)}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => goTo(current + 1)}
                  disabled={current === pages}
                  aria-label="Página siguiente"
                  className={current === pages ? undefined : 'hv-bd-blue'}
                  style={{
                    ...pageBtn(false),
                    opacity: current === pages ? 0.4 : 1,
                    cursor: current === pages ? 'not-allowed' : 'pointer',
                  }}
                >
                  →
                </button>
              </nav>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
