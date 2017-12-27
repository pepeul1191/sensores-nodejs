'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HRL = require('hapi-routes-loader');
const server = new Hapi.Server();

server.connection({
  host: 'localhost', 
  port: 3035
});

server.register([
  Inert,
  {
    register: HRL,
    options: {
      dirname: __dirname, //must be a string with a root path
      pathRoutes: '/routes'
    }
  },

], (err) => {
  server.start((err) => {
    console.log('Running web app at: ' + server.uri);
  });
});