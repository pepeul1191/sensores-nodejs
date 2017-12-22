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
];