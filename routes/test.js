'use strict';

var db = require('../config/database');

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
  {
    method: 'GET',
    path: 'random',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var end = new Date("December 31, 2017 23:59:59");
      var start = new Date("January 1, 2015 01:00:01");
      var datetime_random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      var mm = datetime_random.getMonth() + 1;
      var dd = datetime_random.getDate();
      var yyyy = datetime_random.getFullYear();
      var hh = datetime_random.getHours();
      var min = datetime_random.getMinutes();
      var seg = datetime_random.getSeconds();
      var date = yyyy + ' / ' + (mm>9 ? '' : '0') + mm + '/ ' + (dd>9 ? '' : '0') + dd;
      var time = (hh>9 ? '' : '0') + hh + ' hr : ' + (min>9 ? '' : '0') + min + ' min : ' + (seg>9 ? '' : '0') + seg + ' seg';
      reply(date + ' - ' + time);
    }
  },
  {
    method: 'GET',
    path: 'save',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      /*
        FORMATO DE DATO DE ENTRADA
        {
          'estacion_id':n,
          'momento':Date,
          'datos':[
            {'sensor_id':n,'dato':d},
            {'sensor_id':n,'dato':d},
            {'sensor_id':n,'dato':d},
          ]
        }
        ---
        FORMATO DE DATO GRABADO
        {
          'estacion_id':n,
          'momento':Date,
          'sensor_id':n,
          'dato':d
        }
      */
      var end = new Date("December 2, 2017 23:59:59");
      var start = new Date("December 1, 2017 01:00:01");
      var estacionces = [1,2,3,4,5];
      var sensores = [
        [1,4,7,10],//sensores de la estacion id=1
        [2,5,8,11],//sensores de la estacion id=2
        [3,6,9,12],//sensores de la estacion id=3
        [13,15,17,19],//sensores de la estacion id=4
        [14,16,18,20],//sensores de la estacion id=5
      ];
      for(var k = 0; k < 20; k++){
        var datetime_random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        datetime_random = Date.parse(datetime_random)
        var estacion_id_random = estacionces[Math.floor(Math.random() * estacionces.length)];
        var random_sensor = Math.floor(Math.random() * (3 + 1));
        var data = {
          'estacion_id' : estacion_id_random,
          'momento' : datetime_random,
          'datos' : [
            {
              'sensor_id' : sensores[estacion_id_random - 1][0],
              'dato' : Math.floor(Math.random() * (40-15 + 1) + 15)
            }, 
            {
              'sensor_id' : sensores[estacion_id_random - 1][1],
              'dato' : Math.floor(Math.random() * (40-15 + 1) + 15)}, 
            {
              'sensor_id' : sensores[estacion_id_random - 1][2],
              'dato' : Math.floor(Math.random() * (40-15 + 1) + 15)
            }, 
            {
              'sensor_id' : sensores[estacion_id_random - 1][3],
              'dato' : Math.floor(Math.random() * (40-15 + 1) + 15)
            }, 
          ]
        };
        //console.log(data);
        var estacion_id = data['estacion_id'];
        var creados = 0;
        var momento = data['momento'];
        for(var i = 0; i < data['datos'].length; i++){
          var data_sensor = {
            'estacion_id' : estacion_id_random,
            'momento' : datetime_random,
            'veritas': new Date(datetime_random),
            'sensor_id' : data['datos'][i]['sensor_id'],
            'dato' : data['datos'][i]['dato'],
          };
          creados = creados + 1;
          db.conn.save('sensores', [data_sensor], function(err, oids) {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
      }
      reply('Cantidad de registros creados : ' + creados);
    }
  }
];