import { useEffect, useRef } from 'react';

/** setInterval declarativo. Pasá `delay = null` para pausarlo. */
export function useInterval(callback, delay) {
  const saved = useRef(callback);
  saved.current = callback;

  useEffect(() => {
    if (delay == null) return undefined;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
