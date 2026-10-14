// Ajustes generales del sitio (antes eran las "props" del editor: autoplay, motion, showClients).
export const SITE = {
  features: {
    autoplay: true, // rotación automática de módulos en SimpleSuite
    motion: true, // animaciones de aparición y parallax
    showClients: true, // marquesina de logos en la Home
  },
  contactEmail: 'simpletech@simpletech.com.uy',
  // WhatsApp de atención (el mismo del sitio actual: +598 2714 0301).
  whatsappUrl: 'https://wa.me/59827140301',
  logoUrl: 'https://www.simpletech.uy/wp-content/uploads/2026/08/simpletech_logo_azul-v1.svg',
  suiteLogoUrl: 'https://www.simpletech.uy/wp-content/uploads/2026/08/simplesuite_logo_azul-v1.svg',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/simpletech/' },
    { label: 'Instagram', href: 'https://www.instagram.com/simpletech_cx/' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCgpNUGN6d9bXA5T77mq8-AQ' },
  ],
  // Breakpoint en el que el menú pasa a hamburguesa.
  narrowQuery: '(max-width: 1079.98px)',
  // Celulares: header más compacto.
  phoneQuery: '(max-width: 479.98px)',
};
