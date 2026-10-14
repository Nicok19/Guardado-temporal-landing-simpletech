const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isBlank = (v) => v == null || String(v).trim() === '';
export const isEmail = (v) => EMAIL_RE.test(String(v).trim());
