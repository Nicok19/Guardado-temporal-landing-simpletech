/** 1 → "01" */
export const pad2 = (n) => String(n).padStart(2, '0');

/** "Montes del Plata" → "montes-del-plata" */
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
