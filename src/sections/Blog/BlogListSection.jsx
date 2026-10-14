import { useState } from 'react';
import ChipToggle from '@/components/forms/ChipToggle';
import { FONT_MONO } from '@/styles/tokens';
import PostCard from './PostCard';

const ALL = 'Todas';
const PAGE = 12; // artículos que se suman con "Ver más"

/**
 * Listado de /blog: el artículo más nuevo destacado arriba y el resto en grilla, con filtro por categoría y
 * "Ver más". Isla. `posts` = artículos sin el contenido (services/wordpress.js).
 */
export default function BlogListSection({ posts }) {
  const [category, setCategory] = useState(ALL);
  const [shown, setShown] = useState(PAGE);

  // Categorías ordenadas por cantidad de artículos.
  const counts = posts.flatMap((p) => p.categories).reduce((m, c) => m.set(c, (m.get(c) || 0) + 1), new Map());
  const categories = [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)];

  const filtered = category === ALL ? posts : posts.filter((p) => p.categories.includes(category));
  const [featured, ...rest] = filtered;
  const visible = rest.slice(0, shown);

  const pick = (c) => {
    setCategory(c);
    setShown(PAGE);
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
        <div role="group" aria-label="Categorías" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((c) => (
            <ChipToggle key={c} selected={c === category} onToggle={() => pick(c)}>
              {c}
            </ChipToggle>
          ))}
        </div>

        {featured && <PostCard post={featured} large />}

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
            {`${Math.min(visible.length + 1, filtered.length)} DE ${filtered.length} ARTÍCULOS`}
          </span>
          {rest.length > shown && (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="hv-bg-blue hv-c-cream"
              style={{
                padding: '14px 24px',
                borderRadius: '999px',
                border: '1px solid #00249C',
                background: 'transparent',
                color: '#00249C',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all .3s',
              }}
            >
              Ver más artículos
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
