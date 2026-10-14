import { useEffect, useRef, useState } from 'react';
import SmartLink from '@/components/common/SmartLink';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { SITE } from '@/config/site';
import { NAV_ITEMS, menuRows } from '@/data/navigation';
import { FONT_MONO } from '@/styles/tokens';
import { getLang, pathFor } from '@/i18n';
import { rememberLangChoice } from '@/utils/geo';

const HEADER_HEIGHT = 84; // alto del header flotante + margen superior

const rowLink = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  minHeight: '52px',
  padding: '10px 14px',
  borderRadius: '14px',
  WebkitTapHighlightColor: 'transparent',
};

function Chevron({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      style={{ flex: 'none', transform: `rotate(${open ? 180 : 0}deg)`, transition: 'transform .3s' }}
    >
      <path
        d="M3 5l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Ítem sin submenú (ej. Home): link directo con el mismo aspecto que los encabezados del acordeón. */
function MenuLink({ item, active, onClose }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(178,220,255,.08)' }}>
      <SmartLink
        href={item.href}
        onClick={onClose}
        aria-current={active ? 'page' : undefined}
        style={{
          boxSizing: 'border-box',
          width: '100%',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '8px 14px',
          fontSize: '21px',
          fontWeight: 600,
          letterSpacing: '-.02em',
          color: active ? '#F9F6EE' : '#DADAE4',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {item.label}
          {active && (
            <span
              aria-label="(página actual)"
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#DCD291' }}
            ></span>
          )}
        </span>
        <span style={{ fontFamily: FONT_MONO, color: '#8fa0d8' }}>→</span>
      </SmartLink>
    </div>
  );
}

function MenuGroup({ item, active, open, onToggle }) {
  const panelId = `mobile-menu-${item.id}`;
  return (
    <div style={{ borderBottom: '1px solid rgba(178,220,255,.08)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          width: '100%',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '8px 14px',
          cursor: 'pointer',
          fontSize: '21px',
          fontWeight: 600,
          letterSpacing: '-.02em',
          color: open || active ? '#F9F6EE' : '#DADAE4',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {item.label}
          {active && (
            <span
              aria-label="(página actual)"
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#DCD291' }}
            ></span>
          )}
        </span>
        <span style={{ color: open ? '#DCD291' : '#8fa0d8' }}>
          <Chevron open={open} />
        </span>
      </button>

      {/* grid-template-rows 0fr → 1fr anima la altura del acordeón sin medirla */}
      <div
        id={panelId}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows .35s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 4px 14px' }}>
            <SmartLink
              href={item.href}
              tabIndex={open ? undefined : -1}
              style={{ ...rowLink, color: '#DCD291', fontSize: '15px', fontWeight: 600 }}
            >
              Ver {/[A-Z]/.test(item.label.slice(1)) ? item.label : item.label.toLowerCase()}
              <span style={{ fontFamily: FONT_MONO }}>→</span>
            </SmartLink>
            {menuRows(item).map((it) => (
              <SmartLink
                key={it.href}
                href={it.href}
                tabIndex={open ? undefined : -1}
                style={{ ...rowLink, background: 'rgba(178,220,255,.05)' }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#F9F6EE' }}>{it.label}</span>
                  <span style={{ fontSize: '13px', color: '#8fa0d8' }}>{it.desc}</span>
                </span>
                <span style={{ fontFamily: FONT_MONO, color: '#8fa0d8' }}>→</span>
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Cambio de idioma del menú mobile: lleva a la misma página en español, inglés, portugués o francés (src/i18n). */
function LanguageSwitch() {
  const current = getLang();
  const go = (lang) => {
    rememberLangChoice(lang); // la geolocalización ya no cambia el idioma por su cuenta
    if (lang !== current) {
      window.location.assign(pathFor(window.location.pathname, lang) + window.location.search + window.location.hash);
    }
  };
  return (
    <div role="group" aria-label="Idioma" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
      {[
        ['es', 'Español'],
        ['en', 'English'],
        ['pt', 'Português'],
        ['fr', 'Français'],
      ].map(([code, label]) => {
        const on = code === current;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={on}
            onClick={() => go(code)}
            style={{
              minHeight: '40px',
              padding: '0 16px',
              borderRadius: '999px',
              border: `1px solid ${on ? '#DCD291' : 'rgba(178,220,255,.25)'}`,
              background: on ? 'rgba(220,210,145,.12)' : 'transparent',
              color: on ? '#DCD291' : '#F9F6EE',
              font: '600 13px Inter,sans-serif',
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** Menú mobile: acordeón por sección, fondo bloqueado y CTA fijo abajo (al alcance del pulgar). */
export default function MobileMenu({ activeId, onClose }) {
  const [openId, setOpenId] = useState(activeId ?? null);
  const panelRef = useRef(null);
  useLockBodyScroll(true);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      {/* Fondo: tocar afuera cierra */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 48,
          background: 'rgba(2,4,14,.55)',
          animation: 'st-fade-in .25s ease',
        }}
      ></div>
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: `calc(${HEADER_HEIGHT}px + env(safe-area-inset-top))`,
          left: '12px',
          right: '12px',
          bottom: 'calc(12px + env(safe-area-inset-bottom))',
          zIndex: 49,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          background: 'rgba(6,12,40,.98)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(178,220,255,.14)',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,.7)',
          outline: 'none',
          overflow: 'hidden',
          animation: 'st-menu-in .3s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            padding: '8px 8px 16px',
          }}
        >
          {NAV_ITEMS.map((n) =>
            n.items ? (
              <MenuGroup
                key={n.id}
                item={n}
                active={n.id === activeId}
                open={n.id === openId}
                onToggle={() => setOpenId((id) => (id === n.id ? null : n.id))}
              />
            ) : (
              <MenuLink key={n.id} item={n} active={n.id === activeId} onClose={onClose} />
            ),
          )}
        </nav>
        <div
          style={{
            flex: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '14px 16px 16px',
            borderTop: '1px solid rgba(178,220,255,.1)',
            background: 'rgba(4,8,28,.9)',
          }}
        >
          <LanguageSwitch />
          <SmartLink
            href="/#contacto"
            onClick={onClose}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              minHeight: '56px',
              borderRadius: '999px',
              background: '#DCD291',
              color: '#00249C',
              fontSize: '17px',
              fontWeight: 700,
            }}
          >
            Conversemos <span style={{ fontFamily: FONT_MONO }}>→</span>
          </SmartLink>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
              fontSize: '13px',
              color: '#8fa0d8',
            }}
          >
            <a href={`mailto:${SITE.contactEmail}`} style={{ padding: '6px 0' }}>
              {SITE.contactEmail}
            </a>
            <div style={{ display: 'flex', gap: '14px' }}>
              {SITE.social.map((s) => (
                <SmartLink key={s.href} href={s.href} style={{ padding: '6px 0' }}>
                  {s.label}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
