// Runtime de JSX del sitio (producción): el de React, pero con los textos traducidos al idioma de la página
// (i18n/index.js). astro.config.mjs lo usa en lugar de 'react/jsx-runtime' para todo el código de src/.
import * as R from 'react/jsx-runtime';
import { translateProps } from './index.js';

export const Fragment = R.Fragment;
export const jsx = (type, props, key) => R.jsx(type, translateProps(type, props), key);
export const jsxs = (type, props, key) => R.jsxs(type, translateProps(type, props), key);
