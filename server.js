'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HRL = require('hapi-routes-loader');

const server = new Hapi.Server();

server.connection({
    port: 8000
});

server.register([
    Inert,
    {
        register: HRL,
        options: {
            dirname: __dirname, //must be a string with a root path
            pathRoutes: '/app/routes'
        }
    }

], (err) => {

    server.start((err) => {
        console.log('Running web app at: ' + server.uri);
    });
});