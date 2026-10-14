import { useCallback, useEffect, useState } from 'react';

/**
 * Ejecuta una función async (ej. un servicio) al montar y cuando cambian `deps`.
 * La función recibe { signal } para cancelar la request si el componente se desmonta.
 *
 *   const { data, loading, error, reload } = useAsync(({ signal }) => getContactInterests({ signal }), [], { initialData: [] });
 */
export function useAsync(fn, deps = [], { initialData = null } = {}) {
  const [state, setState] = useState({ data: initialData, loading: true, error: null });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    fn({ signal: controller.signal })
      .then((data) => !controller.signal.aborted && setState({ data, loading: false, error: null }))
      .catch((error) => !controller.signal.aborted && setState((s) => ({ ...s, loading: false, error })));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  return { ...state, reload };
}
