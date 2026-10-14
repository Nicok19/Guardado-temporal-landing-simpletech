import { useEffect, useRef, useState } from 'react';
import { getLang, pathFor } from '@/i18n';
import { rememberLangChoice } from '@/utils/geo';

// Idiomas del selector: cada uno lleva a la misma página en ese idioma (src/i18n: /en/..., /pt/..., /fr/...).
const LANGUAGES = [
  { code: 'es', short: 'ES', label: 'Español' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'pt', short: 'PT', label: 'Português' },
  { code: 'fr', short: 'FR', label: 'Français' },
];

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" style={{ flex: 'none' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M1.5 8h13M8 1.5c1.9 2 2.8 4.1 2.8 6.5S9.9 12.5 8 14.5M8 1.5C6.1 3.5 5.2 5.6 5.2 8s.9 4.5 2.8 6.5" />
      </g>
    </svg>
  );
}

/** Selector de idioma del header (desktop). Se cierra al hacer clic afuera o con Escape. */
export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(getLang);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === selected);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = (code) => {
    setSelected(code);
    setOpen(false);
    rememberLangChoice(code); // la geolocalización ya no cambia el idioma por su cuenta
    // La misma página en el idioma elegido (con su ancla, si tiene).
    if (code !== getLang()) {
      window.location.assign(pathFor(window.location.pathname, code) + window.location.search + window.location.hash);
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Idioma: ${current.label}`}
        className="hv-bd-gold"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          minHeight: '44px',
          padding: '0 14px',
          borderRadius: '999px',
          border: `1px solid ${open ? '#DCD291' : 'rgba(178,220,255,.25)'}`,
          background: open ? 'rgba(220,210,145,.12)' : 'transparent',
          color: '#F9F6EE',
          font: '600 13px Inter,sans-serif',
          cursor: 'pointer',
          transition: 'all .25s',
        }}
      >
        <GlobeIcon />
        {current.short}
        <span
          aria-hidden="true"
          style={{
            fontSize: '8px',
            opacity: 0.7,
            transform: `rotate(${open ? '180deg' : '0deg'})`,
            transition: 'transform .3s',
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Idioma"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            margin: 0,
            padding: '8px',
            listStyle: 'none',
            minWidth: '180px',
            borderRadius: '18px',
            background: 'rgba(6,12,40,.97)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(178,220,255,.16)',
            boxShadow: '0 30px 80px -20px rgba(0,0,0,.6)',
            animation: 'st-menu-in .2s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          {LANGUAGES.map((l) => {
            const on = l.code === selected;
            return (
              <li key={l.code} role="option" aria-selected={on}>
                <button
                  type="button"
                  lang={l.code}
                  onClick={() => pick(l.code)}
                  className="hv-bg-sky-8"
                  style={{
                    all: 'unset',
                    boxSizing: 'border-box',
                    width: '100%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: on ? 700 : 500,
                    color: on ? '#DCD291' : '#F9F6EE',
                  }}
                >
                  {l.label}
                  <span style={{ fontSize: '11px', color: on ? '#DCD291' : '#8fa0d8' }}>{on ? '✓' : l.short}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
