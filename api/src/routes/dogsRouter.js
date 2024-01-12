const {Router} = require('express');
const {getDogsHandler, getDogByIdHandler, postDogHandler} = require("../Handlers/dogsHandler")

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler) 

dogsRouter.get("/:id", getDogByIdHandler )

dogsRouter.post("/", postDogHandler);

<<<<<<< HEAD
module.exports = dogsRouter;

=======
module.exports = dogsRouter;
>>>>>>> main
