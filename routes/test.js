'use strict';

module.exports = [
  {
    method: 'GET',
    path: 'conexion',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      reply('ok');
    }
  },
];