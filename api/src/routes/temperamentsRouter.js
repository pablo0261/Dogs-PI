const { Router } = require('express');
const { getTemperamentsHandler } = require("../Handlers/temperamentsHandler");

const temperamentsRouter = Router();

temperamentsRouter.get("/temperaments", getTemperamentsHandler);

module.exports = temperamentsRouter;