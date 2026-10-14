/** Re-dispara un fade-in + desplazamiento vertical sobre un elemento ya montado. */
export function fadeIn(el, { distance = 10, duration = 0.4 } = {}) {
  if (!el) return;
  el.style.transition = 'none';
  el.style.opacity = '0';
  el.style.transform = `translateY(${distance}px)`;
  void el.offsetWidth; // fuerza reflow para reiniciar la transición
  el.style.transition = `opacity ${duration}s ease, transform ${duration}s cubic-bezier(.2,.8,.2,1)`;
  el.style.opacity = '1';
  el.style.transform = 'none';
}
