'use strict';

var db = require('../config/database');

module.exports = [
  {
    method: 'POST',
    path: 'grabar',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data); //producción
      //var data = JSON.parse(request.payload.data); //jmeter
      //console.log(data);
      db.conn.save('sensores', [data], function(err, oids) {
        if (err) {
          console.error(err);
          return;
        }
        reply('ok');
      });
    }
  },
  {
    method: 'GET',
    path: 'listar',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      db.conn.find('sensores',
        function(err, cursor, count) {
          if (err) {
            //console.error(err);
            reply(err);
            return;
          }
          reply(count);
      });
    }
  },
];