const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');


const routes = Router();

routes.use("/dogs", dogsRouter); 
routes.use("/temperaments", temperamentsRouter); 

module.exports = routes; 