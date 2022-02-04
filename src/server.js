const express = require('express');
const { createUserRouter } = require('./routers/user');
const { createPersonajeRouter } = require('./routers/personajes');
const { createPeliculaRouter } = require('./routers/peliculas');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const { makeRouter: makeUsersRouter } = require('../test/usersTest');
function loadSwaggerinfo(server) {
    try {
        const doc = yaml.load(fs.readFileSync('./src/spec.yml', 'utf8'));
        server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
};
function makeServer() {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use('/api/v1', createPeliculaRouter());
    server.use('/api/v1', createPersonajeRouter());
    server.use('/api/v1', createUserRouter());
    server.use('/api/v1/userstest', makeUsersRouter());
    loadSwaggerinfo(server);
    return server;
}
module.exports = {
    makeServer,
};