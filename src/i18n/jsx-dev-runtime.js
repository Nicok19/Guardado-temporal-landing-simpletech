// Runtime de JSX del sitio (desarrollo): el de React, pero con los textos traducidos al idioma de la página
// (i18n/index.js). astro.config.mjs lo usa en lugar de 'react/jsx-dev-runtime' para todo el código de src/.
import * as R from 'react/jsx-dev-runtime';
import { translateProps } from './index.js';

export const Fragment = R.Fragment;
export const jsxDEV = (type, props, key, isStatic, source, self) =>
  R.jsxDEV(type, translateProps(type, props), key, isStatic, source, self);
