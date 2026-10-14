import { useEffect, useRef, useState } from 'react';
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { PRESENCE_POINTS } from '@/data/company';
import { FONT_MONO } from '@/styles/tokens';
import '@/styles/presence.css';

const GOLD = '#DCD291';
const DOT = '178,220,255'; // celeste, en rgb para variar la opacidad por profundidad
const TILT = 0.55; // cuánto se inclina el globo hacia la latitud de cada ciudad (0 = ecuador fijo)
const CYCLE_MS = 4200; // cada cuánto pasa sola a la ciudad siguiente
const PAUSE_MS = 9000; // pausa del recorrido automático después de que el usuario interactúa
const HUB = PRESENCE_POINTS.find((p) => p.hub);
const targetOf = (i) => [PRESENCE_POINTS[i].lon, PRESENCE_POINTS[i].lat * TILT];

/**
 * Presencia regional: globo de puntos (canvas + d3-geo) que recorre solo las ciudades donde estamos,
 * con la lista de ciudades al costado (la activa resaltada). Click en una ciudad: el globo gira hasta ella.
 * Se puede girar arrastrando con el mouse o el dedo; al rato vuelve a la ciudad activa.
 * Sección de alto normal (no depende del scroll). En tablet y celular el globo se oculta y queda la lista.
 * `dots` = puntos de tierra [lon, lat] (globeData.js, build).
 */
export default function GlobeSection({ dots, title, kicker }) {
  const canvas = useRef(null);
  const [active, setActive] = useState(0);
  const state = useRef({ rot: [15, 5], target: targetOf(0), dragging: false, last: null, touched: 0, visible: false });

  // La ciudad activa marca hacia dónde gira el globo
  useEffect(() => {
    state.current.target = targetOf(active);
  }, [active]);

  // Recorrido automático (solo visible y si el usuario no interactuó hace poco)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => {
      const st = state.current;
      if (!st.visible || st.dragging || performance.now() - st.touched < PAUSE_MS) return;
      setActive((i) => (i + 1) % PRESENCE_POINTS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  // Dibujo del globo (rAF; se pausa fuera de pantalla)
  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const proj = geoOrthographic().clipAngle(90).precision(0.5);
    const path = geoPath(proj, ctx);
    const graticule = geoGraticule10();
    const st = state.current;
    let raf = 0;
    let size = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      size = cv.clientWidth;
      cv.width = size * dpr;
      cv.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      proj.translate([size / 2, size / 2]).scale(size / 2 - 2);
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!st.visible || !size) return;
      // Gira suave hacia la ciudad activa (salvo mientras se arrastra o justo después)
      if (!st.dragging && now - st.touched > 1500) {
        const k = reduced ? 1 : 0.06;
        let dLon = st.target[0] - st.rot[0];
        dLon = ((((dLon + 180) % 360) + 360) % 360) - 180; // por el camino más corto
        st.rot = [st.rot[0] + dLon * k, st.rot[1] + (st.target[1] - st.rot[1]) * k];
      }
      proj.rotate([-st.rot[0], -st.rot[1]]);
      const R = size / 2 - 2;
      const c = size / 2;
      ctx.clearRect(0, 0, size, size);

      // Esfera y grilla
      ctx.beginPath();
      path({ type: 'Sphere' });
      ctx.fillStyle = '#0a1f80';
      ctx.fill();
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(178,220,255,.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Puntos de tierra, más tenues hacia el borde (profundidad)
      const r = Math.max(1, size / 340);
      for (const d of dots) {
        const xy = proj(d);
        if (!xy) continue;
        const dist = Math.hypot(xy[0] - c, xy[1] - c) / R;
        ctx.fillStyle = `rgba(${DOT},${(0.95 - dist * dist * 0.7).toFixed(2)})`;
        ctx.fillRect(xy[0] - r, xy[1] - r, r * 2, r * 2);
      }

      // Arcos desde Montevideo a cada ciudad
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = Math.max(1.2, size / 380);
      PRESENCE_POINTS.forEach((pt) => {
        if (pt.hub) return;
        ctx.beginPath();
        path({
          type: 'LineString',
          coordinates: [
            [HUB.lon, HUB.lat],
            [pt.lon, pt.lat],
          ],
        });
        ctx.stroke();
      });

      // Ciudades: punto dorado (oficinas) o crema; la activa con un pulso y su nombre
      const pulse = reduced ? 0.6 : (now % 1800) / 1800;
      PRESENCE_POINTS.forEach((pt, i) => {
        const xy = proj([pt.lon, pt.lat]);
        if (!xy) return;
        const on = i === st.activeIndex;
        if (on) {
          ctx.beginPath();
          ctx.arc(xy[0], xy[1], 6 + pulse * size * 0.05, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(220,210,145,${(1 - pulse).toFixed(2)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], on ? 6.5 : pt.office ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = pt.office || on ? GOLD : '#F9F6EE';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0a1f80';
        ctx.stroke();
        if (on) {
          ctx.font = `600 ${Math.max(12, size / 38)}px Inter, sans-serif`;
          ctx.fillStyle = '#F9F6EE';
          ctx.fillText(pt.city, xy[0] + 12, xy[1] - 10);
        }
      });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (st.visible = e.isIntersecting));
    io.observe(cv);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [dots]);

  state.current.activeIndex = active;

  // Arrastrar para girar (horizontal en celular: el gesto vertical sigue scrolleando la página)
  const onPointerDown = (e) => {
    const st = state.current;
    st.dragging = true;
    st.last = [e.clientX, e.clientY];
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const st = state.current;
    if (!st.dragging) return;
    const k = 180 / (canvas.current?.clientWidth || 400);
    st.rot = [
      st.rot[0] - (e.clientX - st.last[0]) * k,
      Math.max(-70, Math.min(70, st.rot[1] + (e.clientY - st.last[1]) * k)),
    ];
    st.last = [e.clientX, e.clientY];
    st.touched = performance.now();
  };
  const onPointerUp = () => {
    state.current.dragging = false;
    state.current.touched = performance.now();
  };

  // Click en una ciudad de la lista: el globo gira hasta ella
  const pick = (i) => {
    state.current.touched = performance.now() - 1500; // gira ya, pero pausa el recorrido automático
    setActive(i);
  };

  return (
    <section className="pg-section">
      <div className="pg-inner">
        <div className="pg-copy">
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em', color: GOLD }}>{kicker}</span>
          <h2 className="pg-title">{title}</h2>
          <ol className="pg-list">
            {PRESENCE_POINTS.map((pt, i) => (
              <li key={pt.city}>
                <button type="button" className="pg-item" data-active={i === active} onClick={() => pick(i)}>
                  <span className="pg-item-head">
                    <span className="pg-country">{pt.country}</span>
                    {pt.office && <span className="pg-badge">Oficina</span>}
                  </span>
                  <span className="pg-city">{pt.city}</span>
                  <span className="pg-text">{pt.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="pg-globe">
          <canvas
            ref={canvas}
            aria-label="Globo con las ciudades donde estamos presentes"
            role="img"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          ></canvas>
          <span className="pg-hint">Arrastrá para girar</span>
        </div>
      </div>
    </section>
  );
}
