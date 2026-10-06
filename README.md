# SimpleTech Web (v5)

## Abrir en VS Code
1. Abrí esta carpeta en VS Code.
2. Instalá la extensión **Live Server** (Ritwick Dey).
3. Click derecho en `index.html` → **Open with Live Server**.

Se necesita un servidor local (no funciona con doble click / `file://`).

## Estructura
- `index.html` — toda la web: plantilla HTML (estilos inline) + lógica en `<script data-dc-script>` al final (clase `Component`: páginas, datos de casos, módulos, navegación).
- `support.js` — runtime que renderiza la plantilla (no editar).
- `image-slot.js` — componente de imágenes.
- `uploads/` — logos e imágenes locales.

## Editar
- Textos y estilos: directamente en el HTML de `index.html`.
- Datos (casos, módulos, FAQs, oficinas, posts): en la clase `Component`, al final del archivo.
- Valores dinámicos usan `{{ nombre }}`, definidos en `renderVals()`.
