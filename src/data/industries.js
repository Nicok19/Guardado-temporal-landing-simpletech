// Filtros de casos de éxito + datos de "dolor" y benchmarks por industria.
export const INDUSTRY_FILTERS = [
  'Todas',
  'Logística',
  'Seguros',
  'Industria',
  'Automotriz',
  'Retail',
  'Salud',
  'Finanzas',
  'Gobierno',
  'Eventos',
];

// pain: [valor, descripción, fuente] · bench: [valor, descripción][]
export const INDUSTRY_DATA = {
  Logística: {
    pain: [
      '1 de cada 3',
      'contactos al servicio de atención es una consulta repetida por el estado de un envío.',
      'CONSULTAS WISMO · PROMEDIO DEL SECTOR',
    ],
    insight:
      'En logística, la mejor conversación es la que se anticipa: notificar proactivamente el estado del envío evita más consultas que cualquier bot reactivo.',
    bench: [
      ['~40%', 'de los contactos entrantes son consultas de “¿dónde está mi pedido?”.'],
      ['-60%', 'de llamadas al automatizar el tracking por mensajería.'],
      ['24/7', 'es la disponibilidad que espera el destinatario final.'],
    ],
  },
  Seguros: {
    pain: [
      '7 de cada 10',
      'personas abandonan la cotización online antes de terminarla.',
      'ABANDONO EN COTIZADORES DIGITALES',
    ],
    insight:
      'El cliente de seguros no quiere hablar de pólizas, quiere sentirse cubierto. Simplificar el lenguaje pesa tanto como automatizar el proceso.',
    bench: [
      ['~70%', 'de abandono en formularios de cotización extensos.'],
      ['3x', 'más conversión con cotización conversacional guiada.'],
      ['<5 min', 'para emitir una póliza simple de punta a punta.'],
    ],
  },
  Industria: {
    pain: [
      '30%',
      'del tiempo operativo se pierde en coordinación manual entre planta, proveedores y logística.',
      'TIEMPO OPERATIVO NO PRODUCTIVO',
    ],
    insight:
      'En operaciones industriales, la IA rinde cuando se integra al proceso físico: turnos, accesos y logística de planta, no solo a la atención.',
    bench: [
      ['~30%', 'del tiempo operativo se va en coordinación manual.'],
      ['-45%', 'en costos de comunicaciones al unificar sedes.'],
      ['+2x', 'de trazabilidad en ingresos y turnos de planta.'],
    ],
  },
  Automotriz: {
    pain: [
      '+50%',
      'de los leads digitales no recibe respuesta dentro de la primera hora.',
      'VELOCIDAD DE RESPUESTA COMERCIAL',
    ],
    insight:
      'La venta se gana en la velocidad de la primera respuesta; la fidelidad, en la experiencia de postventa y service.',
    bench: [
      ['~80%', 'de los compradores inicia el contacto por canales digitales.'],
      ['<2 min', 'es el tiempo de primera respuesta que marca la diferencia.'],
      ['+25%', 'de turnos de service con recordatorios automáticos.'],
    ],
  },
  Retail: {
    pain: [
      '2 de cada 3',
      'clientes deja de comprar a una marca después de una mala experiencia de atención.',
      'IMPACTO DE LA EXPERIENCIA EN LA RECOMPRA',
    ],
    insight:
      'En retail, los clientes internos también son clientes: ordenar la operación de sucursales impacta directo en la experiencia en tienda.',
    bench: [
      ['~65%', 'de los consumidores prefiere resolver por mensajería.'],
      ['-50%', 'en tiempos de resolución de incidencias internas.'],
      ['+20%', 'de recompra con campañas segmentadas.'],
    ],
  },
};
