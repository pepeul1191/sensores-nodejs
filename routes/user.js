'use strict';

var db = require('../config/database');

module.exports = [
    {
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
            reply('get user/dashboard :)');
        }
    }, {
        method: 'GET',
        path: 'demo',
        config: {
            auth: false
        },
        handler: function (request, reply) {
            var parrot1 = {
                "name" : "Grenny",
                "type" : "African Grey",
                "male" : true,
                "age" : 1,
                "birthdate" : new Date(),
                "likes" : ["green color", "night", "toys"],
                "extra1" : null
            };
            var parrot2 = {
                "name" : "Bounty",
                "type" : "Cockatoo",
                "male" : false,
                "age" : 15,
                "birthdate" : new Date(),
                "likes" : ["sugar cane"]
            };

            db.conn.save("parrots", [parrot1, parrot2], function(err, oids) {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            reply('get user/dashboard :)');
        }
    },
];