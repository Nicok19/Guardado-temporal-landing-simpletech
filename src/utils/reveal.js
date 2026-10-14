import { SITE } from '@/config/site';

// Animaciones declarativas por atributo:
//   data-reveal="1..4"  → aparece al entrar en pantalla (el número escalona el delay).
//   data-count="200"    → cuenta desde 0 (o desde N-15 para años) hasta el valor.
//
// Lo que ya está en pantalla al cargar se deja visible: ocultarlo hasta que cargue el JS retrasa
// el LCP (métrica clave de Core Web Vitals). Solo se anima lo que aparece al scrollear.
// Usar data-count solo en markup estático (fuera de islas de React): cambia el texto antes de que React hidrate.

let revealObserver = null;
let countObserver = null;

const motionEnabled = () => SITE.features.motion && !matchMedia('(prefers-reduced-motion: reduce)').matches;

function prepareReveal(el) {
  if (el.dataset.revealReady) return;
  el.dataset.revealReady = '1';
  if (el.getBoundingClientRect().top < window.innerHeight) return; // ya visible: no ocultar
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  const delay = (Number(el.dataset.reveal) - 1) * 90;
  const base = el.style.transition ? `${el.style.transition},` : '';
  el.style.transition = `${base}opacity .9s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.8,.2,1) ${delay}ms`;
  revealObserver.observe(el);
}

export function setupReveal() {
  if (!motionEnabled() || !('IntersectionObserver' in window)) return;

  revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        revealObserver.unobserve(e.target);
      }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach(prepareReveal);

  // Elementos que aparecen después (ej. contenido que una isla renderiza al interactuar).
  new MutationObserver((records) =>
    records.forEach((r) =>
      r.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        if (n.matches('[data-reveal]')) prepareReveal(n);
        n.querySelectorAll('[data-reveal]').forEach(prepareReveal);
      }),
    ),
  ).observe(document.body, { childList: true, subtree: true });
}

function countUp(el) {
  const to = Number(el.dataset.count);
  if (!to || el.dataset.counted) return;
  el.dataset.counted = '1';
  const from = to > 1000 ? to - 15 : 0;
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / 2200);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * e);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function setupCountUp() {
  if (!('IntersectionObserver' in window)) return;
  countObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        countObserver.unobserve(e.target);
        setTimeout(() => countUp(e.target), 250);
      }),
    { threshold: 0.6 },
  );
  document.querySelectorAll('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    el.textContent = to > 1000 ? to - 15 : 0;
    countObserver.observe(el);
  });
}
