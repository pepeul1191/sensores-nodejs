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
      var ids_generados = [];
      var id_generado = null;
      /*
      for(var i = 0; i < data['datos'].length; i++){
        var data_sensor = {
          'estacion_id' : data['estacion_id'],
          'momento' : data['momento'],
          'sensor_id' : data['datos'][i]['sensor_id'],
          'dato' : data['datos'][i]['dato'],
        };

      }
      */
      (function next(){
        if (!data['datos'].length) return callback(null, ids_generados);
        var uid = uids.pop()
        db.conn.save('sensores', [data_sensor], function(err, oids) {
          if (err) {
            console.error(err);
            return;
          }
          ids_generados.push(oids[0]);
          next();
        });
      })();
      reply(ids_generados);
    }
  },
  {
    method: 'GET',
    path: 'listar',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      db.conn.find('sensores', function(err, cursor, count) {
        if (err) {
          //console.error(err);
          reply(err);
          return;
        }
        var rs = [];
        while (cursor.next()) {
          //console.log(cursor.field('estacion_id'));
          var data = {
            'estacion_id' : cursor.field('estacion_id'),
            'momento' : cursor.field('momento'),
            'sensor_id' : cursor.field('sensor_id'), 
            'veritas' : cursor.field('veritas'), 
            'dato' : cursor.field('dato'), 
          };
          rs.push(data);
        }
        reply(rs);
      });
    }
  },
  {
  method: 'GET',
    path: 'count',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      db.conn.find('sensores', function(err, cursor, count) {
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