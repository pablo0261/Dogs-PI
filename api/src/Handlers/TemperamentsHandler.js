<<<<<<< HEAD
const getAllTemperaments = require("../Controllers/temperamentsController");

const getTemperamentsHandler = async (req, res) => {
  try {
    const result = await getAllTemperaments();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTemperamentsHandler };
=======
const getAllTemperaments = require('../Controllers/temperamentsController')

const getTemperamentsHandler = async(req, res) => {
    try {
        const result =  await getAllTemperaments();
      res.status(200).json(result);
    } catch (error) {
        console.log("Error en getTemperamentsHandler:", error); // Agrega este log
        res.status(400).json({ error: error.message });
    }
};


module.exports = {getTemperamentsHandler};
>>>>>>> main
