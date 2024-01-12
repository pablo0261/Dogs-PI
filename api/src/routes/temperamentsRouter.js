const { Router } = require('express');
const { getTemperamentsHandler } = require("../Handlers/TemperamentsHandler");

const temperamentsRouter = Router();

temperamentsRouter.get("/", getTemperamentsHandler);

module.exports = temperamentsRouter;