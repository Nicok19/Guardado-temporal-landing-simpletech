import { useEffect } from 'react';

/** Bloquea el scroll de la página mientras `active` es true (menús, modales). */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    const { documentElement: html, body } = document;
    const prev = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev.html;
      body.style.overflow = prev.body;
    };
  }, [active]);
}
