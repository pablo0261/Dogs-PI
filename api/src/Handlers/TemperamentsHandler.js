
const getTemperamentsHandler = (req, res) => {
    res.status(200).send("Aqui obtengo todos los temperamentos existentes")
}

module.exports = {getTemperamentsHandler};