const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');

<<<<<<< HEAD

const routes = Router();

routes.use("/dogs", dogsRouter); 
routes.use("/temperaments", temperamentsRouter); 
=======
const routes = Router();

routes.use("/dogs", dogsRouter); //*Cuando la ruta inicia con dogs, envía a dogsRouter
routes.use("/temperaments", temperamentsRouter); //*Cuando la ruta inicia con temperaments, envía a temperamentsRouter
>>>>>>> main

module.exports = routes; 