const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');
const georefRouter = require('./georefRouter');


const routes = Router();
//*DOGS
routes.use("/dogs", dogsRouter); 
routes.use("/temperaments", temperamentsRouter); 

//* GEOREF
routes.use("/georef",georefRouter);

module.exports = routes; 