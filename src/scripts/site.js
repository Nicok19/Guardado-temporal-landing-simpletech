// Comportamiento global, se carga en todas las páginas desde BaseLayout.astro.
import { setupCountUp, setupReveal } from '@/utils/reveal';

// ---- Animaciones de aparición y contadores ----------------------------------------------

setupReveal();
setupCountUp();

// ---- Barra de progreso de scroll ---------------------------------------------------------

const progress = document.getElementById('scroll-progress');
if (progress) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const se = document.scrollingElement || document.documentElement;
    const max = se.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (se.scrollTop / max) * 100 : 0}%`;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}

// ---- "Conversemos" ------------------------------------------------------------------------
// Los links a /#contacto llevan al formulario de la home. Si la página tiene su propio formulario
// (home y Nosotros, ver BaseLayout `contact`), se queda en la página y baja hasta él.

const contactForm = document.getElementById('contacto');
if (contactForm) {
  document.addEventListener('click', (e) => {
    const link = e.target.closest(
      'a[href="/#contacto"], a[href="/en/#contacto"], a[href="/pt/#contacto"], a[href="/fr/#contacto"]',
    );
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    contactForm.scrollIntoView();
    history.replaceState(null, '', '#contacto');
  });
}
