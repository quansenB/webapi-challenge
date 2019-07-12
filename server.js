const actionRoutes = require('./data/router/actionRouter.js');
const projectRoutes = require('./data/router/actionRouter.js');
const express = require('express');
const helmet = require("helmet");

const server = express();

server.use(helmet());

server.get('/api', (req, res) => {
  res.send(`<p>use /api/actions and /api/projects to do CRUD operations</p>`)
});

server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

module.exports = server;