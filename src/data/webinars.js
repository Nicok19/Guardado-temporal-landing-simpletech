// Webinars (página /blog/webinars). Los anteriores están grabados en el canal de YouTube.
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/channel/UCgpNUGN6d9bXA5T77mq8-AQ';

const video = (id) => ({
  url: `https://www.youtube.com/watch?v=${id}`,
  thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
});

export const WEBINAR_TOPICS = [
  { t: 'Novedades de producto', d: 'Mostramos en vivo cada actualización de la suite y cómo sacarle provecho.' },
  { t: 'Tendencias de CX', d: 'Charlas sobre IA, automatización y experiencia del cliente por industria.' },
  { t: 'Preguntas en vivo', d: 'Al final de cada webinar respondemos las consultas de los asistentes.' },
];

// Más recientes primero
export const PAST_WEBINARS = [
  {
    ...video('zEPa14WJhhY'),
    date: 'Noviembre 2024',
    title: 'Actualización de la suite',
    d: 'Recorrido por las novedades de bots, agentes, campañas y métricas.',
  },
  {
    ...video('YWPmrcYH8CE'),
    date: 'Septiembre 2024',
    title: 'V20: 3CX se renueva',
    d: 'Todo lo nuevo de la versión 20 de 3CX para la telefonía en la nube.',
  },
  {
    ...video('X3vRRO-q7U4'),
    date: 'Abril 2024',
    title: 'Lanzamiento de Simpletech Academy',
    d: 'Presentamos la plataforma de cursos para dominar nuestras soluciones.',
  },
  {
    ...video('ziwoWsQHeKE'),
    date: 'Septiembre 2023',
    title: '10 tendencias tecnológicas en seguros',
    d: 'Webinar en portugués sobre la tecnología que transforma a las aseguradoras.',
  },
];
