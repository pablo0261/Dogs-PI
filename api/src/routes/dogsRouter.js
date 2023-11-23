const {Router} = require('express');
const {getAllDogsHandler, getDogByIdHandler, getDogsByNameHandler, postDogHandler} = require("../Handlers/dogsHandler")
const dogsRouter = Router();

dogsRouter.get("/dogs", getAllDogsHandler) 

dogsRouter.get("/dogs/name", getDogsByNameHandler);

dogsRouter.get("/dogs/:idRaza", getDogByIdHandler )

dogsRouter.post("/dogs", postDogHandler);

module.exports = dogsRouter;