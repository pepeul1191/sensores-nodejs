'use strict';

var db = require('../config/database');

module.exports = [
  {
  method: 'GET',
    path: 'datos_dia',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      /*
      FORMATO DE DATO GRABADO
      {
        'estacion_id':n,
        'momento':Date,
        'sensor_id':n,
        'dato':d
      }
      */
      var sensor_id = parseInt(request.query.sensor_id);
      var fecha_inicio = request.query.dia;
      var fecha_inicio_array = fecha_inicio.split('.');
      var anio = fecha_inicio_array[0];
      var mes = fecha_inicio_array[1] - 1;
      var dia = fecha_inicio_array[2];
      var fecha_busqueda_inicio = Date.parse(new Date(anio, mes, dia, 0,0,0,0)); 
      var fecha_busqueda_fin = Date.parse(new Date(anio, mes, dia, 23,59,59,999));  
      //console.log(fecha_busqueda_inicio);
      db.conn.find('sensores', {'sensor_id' : sensor_id, 'momento' : {$bt : [fecha_busqueda_inicio, fecha_busqueda_fin]}}, function(err, cursor, count) {
        //console.log(count);
        var rs = [];
        while (cursor.next()) {
          //console.log(cursor.field('estacion_id'));
          var data = {
            'estacion_id' : cursor.field('estacion_id'),
            'momento' : cursor.field('momento'),
            'sensor_id' : cursor.field('sensor_id'), 
            'dato' : cursor.field('dato'), 
            'veritas' : cursor.field('veritas'), 
          };
          rs.push(data);
        }
        reply(rs);
      });
    },
  }
];