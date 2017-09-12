'use strict';

module.exports = [{
    method: 'GET',
    path: '',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get user/index');
    }
}, {
    method: 'GET',
    path: 'dashboard',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get user/dashboard');
    }
}];