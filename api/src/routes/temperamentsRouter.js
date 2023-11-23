const {Router} = require('express');

const temperamentsRouter = Router();

temperamentsRouter.get("/temperaments", (req, res) => {
    res.status(200).send("Aqui obtengo todos los temperamentos existentes")
})

module.exports = temperamentsRouter;