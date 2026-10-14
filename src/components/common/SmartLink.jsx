const isExternal = (href = '') => /^https?:\/\//.test(href);

/**
 * Link único para todo el sitio:
 * - "https://..."              → abre en otra pestaña con rel="noopener noreferrer"
 * - "/ruta", "#ancla", "mailto:" → <a> normal
 */
export default function SmartLink({ href = '', target, children, ...rest }) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      target={target ?? (external ? '_blank' : undefined)}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
