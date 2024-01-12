const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
<<<<<<< HEAD
const cors = require("cors");
const routes = require('./routes/index.js');
=======
const routes = require('./routes/index.js');
const cors = require("cors");
>>>>>>> main

require('./db.js');

const server = express();

server.name = 'API';
<<<<<<< HEAD

=======
>>>>>>> main
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
<<<<<<< HEAD

server.use('/', routes);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); 
=======
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
>>>>>>> main
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

<<<<<<< HEAD
server.use((err, req, res, next) => { 
=======
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
>>>>>>> main
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
