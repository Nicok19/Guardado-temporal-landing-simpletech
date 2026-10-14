import { useCallback, useRef, useState } from 'react';
import { ApiError } from '@/services/api/ApiError';

/**
 * Estado genérico de formularios conectados a un backend.
 *
 *   const form = useForm({ initialValues, validate, onSubmit: (values) => service.send(values) });
 *   <input {...form.field('email')} />
 *   <form onSubmit={form.handleSubmit}>
 *
 * status: 'idle' | 'submitting' | 'success' | 'error'
 * Si onSubmit lanza un ApiError con fieldErrors, se muestran en cada campo.
 */
export function useForm({ initialValues, validate, onSubmit }) {
  const initialRef = useRef(initialValues);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState(null);
  const [result, setResult] = useState(null);

  const runValidation = useCallback((vals) => (validate ? validate(vals) || {} : {}), [validate]);

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Revalida en vivo solo los campos que el usuario ya tocó.
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: runValidation({ ...values, [name]: value })[name] }));
  };

  const toggleInList = (name, item) => {
    const list = values[name] || [];
    setValue(name, list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const handleBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: runValidation(values)[name] }));
  };

  /** Props listas para un <input>/<textarea> controlado. */
  const field = (name) => ({
    name,
    value: values[name] ?? '',
    onChange: (e) => setValue(name, e.target.value),
    onBlur: () => handleBlur(name),
    'aria-invalid': errors[name] ? true : undefined,
  });

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const found = runValidation(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.values(found).some(Boolean)) return;

    setStatus('submitting');
    setSubmitError(null);
    try {
      setResult(await onSubmit(values));
      setStatus('success');
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
      setSubmitError(err instanceof ApiError ? err.message : 'Ocurrió un error inesperado.');
      setStatus('error');
    }
  };

  const reset = useCallback(() => {
    setValues(initialRef.current);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setSubmitError(null);
    setResult(null);
  }, []);

  return {
    values,
    errors,
    touched,
    status,
    submitError,
    result,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    setValue,
    toggleInList,
    field,
    handleSubmit,
    reset,
  };
}
