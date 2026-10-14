import { useCallback, useEffect, useState } from 'react';
import SmartLink from '@/components/common/SmartLink';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SITE } from '@/config/site';
import { NAV_PARENT } from '@/data/navigation';
import { FONT_MONO } from '@/styles/tokens';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import MenuToggle from './MenuToggle';
import LanguageSelector from './LanguageSelector';

/**
 * Header fijo (isla de React, client:load). Desktop vs. mobile se resuelve con CSS
 * (styles/header.css) para que el HTML del servidor ya sea correcto en cada dispositivo.
 */
export default function Header({ currentPath = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const narrow = useMediaQuery(SITE.narrowQuery);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const page = currentPath.split('/')[1] || 'home';
  const activeId = NAV_PARENT[page] ?? page;

  // Cerrar el menú al pasar a desktop.
  useEffect(() => {
    if (!narrow) setMenuOpen(false);
  }, [narrow]);

  return (
    <>
      <header className="st-header">
        <nav className="st-header-nav" data-menu-open={menuOpen} aria-label="Principal">
          <SmartLink href="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Simpletech, inicio">
            <img src={SITE.logoUrl} alt="simpletech®" width="120" height="22" className="st-header-logo" />
          </SmartLink>
          <div className="st-desktop-only">
            <DesktopNav activeId={activeId} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="st-desktop-only">
              <LanguageSelector />
            </div>
            {/* En tablet y celular el CTA está dentro del menú hamburguesa (MobileMenu) */}
            <SmartLink className="st-header-cta st-desktop-only hv-bg-gold hv-c-blue" href="/#contacto" onClick={closeMenu}>
              Conversemos{' '}
              <span className="st-header-cta-arrow" style={{ fontFamily: FONT_MONO }}>
                →
              </span>
            </SmartLink>
            <div className="st-mobile-only">
              <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
            </div>
          </div>
        </nav>
      </header>
      {menuOpen && <MobileMenu activeId={activeId} onClose={closeMenu} />}
    </>
  );
}
