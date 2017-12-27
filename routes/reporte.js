'use strict';

var db = require('../config/database');
var dateFormat = require('dateformat');

module.exports = [
  {
  method: 'GET',
    path: 'datos_dia',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var sensor_id = parseInt(request.query.sensor_id);
      var fecha_inicio = request.query.dia;
      var fecha_inicio_array = fecha_inicio.split('.');
      var anio = fecha_inicio_array[0];
      var mes = fecha_inicio_array[1] - 1;
      var dia = fecha_inicio_array[2];
      var fecha_busqueda_inicio = Date.parse(new Date(anio, mes, dia, 0,0,0,0)); 
      var fecha_busqueda_fin = Date.parse(new Date(anio, mes, dia, 23,59,59,999));  
      //console.log(fecha_busqueda_inicio);
      db.conn.find('sensores', {'sensor_id' : sensor_id, 'momento' : {$bt : [fecha_busqueda_inicio, fecha_busqueda_fin]}}, {$orderby: {momento : 1}}, function(err, cursor, count) {
        //console.log(count);
        var rs = [];
        while (cursor.next()) {
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
  },
  {
    method: 'GET',
      path: 'max_min_avg_dias',
      config: {
        auth: false
      },
      handler: function (request, reply) {
        var sensor_id = parseInt(request.query.sensor_id);
        var fecha_inicio = request.query.inicio;
        var fecha_inicio_array = fecha_inicio.split('.');
        var anio_inicio = fecha_inicio_array[0];
        var mes_inicio = fecha_inicio_array[1] - 1;
        var dia_inicio = fecha_inicio_array[2];
        var fecha_fin = request.query.fin;
        var fecha_fin_array = fecha_fin.split('.');
        var anio_fin = fecha_fin_array[0];
        var mes_fin = fecha_fin_array[1] - 1;
        var dia_fin = fecha_fin_array[2];
        var fecha_busqueda_inicio = Date.parse(new Date(anio_inicio, mes_inicio, dia_inicio, 0,0,0,0)); 
        var fecha_busqueda_fin = Date.parse(new Date(anio_fin, mes_fin, dia_fin, 23,59,59,999));  
        //console.log(fecha_busqueda_inicio);
        db.conn.find('sensores', {'sensor_id' : sensor_id, 'momento' : {$bt : [fecha_busqueda_inicio, fecha_busqueda_fin]}}, {$orderby: {momento : 1}}, function(err, cursor, count) {
          //console.log(count);
          var rs_temp = [];
          var rs = [];
          while (cursor.next()) {
            var date = new Date(cursor.field('momento'));
            var day = dateFormat(date, "yyyy-mm-dd");
            if (day in rs_temp){
              //console.log('IF');
              var dato = cursor.field('dato');
              var max_val = rs_temp[day]['max'];
              var min_val = rs_temp[day]['min'];
              var avg_temp = rs_temp[day]['avg_temp'];
              var cantidad_val = rs_temp[day]['cantidad'] + 1;
              if(dato > max_val){max_val = dato}
              if(dato < min_val){min_val = dato}
              //console.log('max_val : ' + max_val);console.log('min_val : ' + min_val);console.log('avg_temp : ' + avg_temp);
              avg_temp.push(dato);
              rs_temp[day] = {
                'max': max_val,
                'min': min_val,
                'avg_temp': avg_temp,
                'cantidad' : cantidad_val
              }
            }else{
              //console.log('ELSE');
              rs_temp[day] = {
                'max': cursor.field('dato'),
                'min': cursor.field('dato'),
                'avg_temp': [cursor.field('dato')],
                'cantidad': 1
              }
              //console.log(rs_temp)
            }
          }
          for (var key in rs_temp) {
            var sum = rs_temp[key]['avg_temp'].reduce((previous, current) => current += previous);
            var avg = sum / rs_temp[key]['cantidad'];
            rs[key] = {
              'max': rs_temp[key]['max'], 
              'min': rs_temp[key]['max'], 
              'avg': avg,  
            }
          }
          console.log(rs);
          reply(rs);
          return;
        });
      },
    }
];