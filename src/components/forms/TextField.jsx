import { FONT_MONO } from '@/styles/tokens';

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontFamily: FONT_MONO,
  fontSize: '11px',
  letterSpacing: '.12em',
  color: '#636262',
};
const inputStyle = {
  font: '400 16px Inter,sans-serif',
  padding: '14px 16px',
  borderRadius: '14px',
  border: '1px solid #DADAE4',
  background: '#fff',
  color: '#00249C',
  outline: 'none',
};

/**
 * Input/textarea con label y mensaje de error.
 * `inputProps` normalmente viene de `form.field('nombre')` (useForm).
 */
export default function TextField({ label, error, multiline = false, inputProps, ...rest }) {
  const Tag = multiline ? 'textarea' : 'input';
  const errorId = error ? `${inputProps.name}-error` : undefined;
  return (
    <label style={labelStyle}>
      {label}
      <Tag
        className="fx-bd-blue"
        aria-describedby={errorId}
        {...inputProps}
        {...rest}
        style={{ ...inputStyle, ...(multiline && { resize: 'vertical' }), ...(error && { borderColor: '#ea5455' }) }}
      />
      {error && (
        <span
          id={errorId}
          role="alert"
          style={{ fontFamily: 'Inter,sans-serif', letterSpacing: 0, fontSize: '13px', color: '#c62f30' }}
        >
          {error}
        </span>
      )}
    </label>
  );
}
