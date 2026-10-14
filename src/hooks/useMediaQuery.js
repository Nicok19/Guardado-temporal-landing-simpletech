import { useEffect, useState } from 'react';

/**
 * true si la media query matchea. En el servidor (y en el primer render) devuelve `ssrValue`;
 * por eso, para mostrar/ocultar cosas según el tamaño de pantalla, preferir CSS.
 */
export function useMediaQuery(query, ssrValue = false) {
  const [matches, setMatches] = useState(ssrValue);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
