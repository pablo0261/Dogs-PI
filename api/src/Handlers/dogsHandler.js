const {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
} = require("../Controllers/dogController");
const { Dog, Temperament } = require("../db");

const getDogsHandler = async (req, res) => {
  //*Hace la peticion por nombre, si no existe el nombre trae todos los perros

  const { name } = req.query;
  try {
    const allDogs = await getAllDogs();
    if (name) {
      if (name.length >= 3) {
        const dogsFound = allDogs
          .filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
          // .map((dog) => ({ name: dog.name })); //*Agregando esta linea devuelve solo el nombre de los dogs
        if (dogsFound.length > 0) {
          //Debe ser con .length porque dogsFound es un array y si no se encuentra devolvera un boleano y no caera nunca en el error del codigo
          return res.status(200).json(dogsFound);
        } else {
          return res.status(404).json(
            `We couldn't find breeds with the name '${name}'`,
          );
        }
      } else {
          return res.status(400).send("The name must have at least 3 letters");
        }
    } else {
      console.log("Buscando todos los perros");
      return res.status(200).json(allDogs);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const getDogByIdHandler = async (req, res) => {
  //*Busca el perro por id,(segun el tipode id busca en la api o en la db)

  const { id } = req.params;
  try {
    let result;
    if (!isNaN(id)) {
      console.log(!isNaN(id));
      //*si es numero busca en la API,
      result = await getDogByIdFromApi(id);
      if (result) {
        return res.status(200).json([result]);
      } else {
        return res
          .status(400)
          .send(`We couldn't find breeds with the ID '${id}'`);
      }
    } else {
      //*si es UUID busca en la DB
      result = await getDogByIdFromDb(id);
      console.log(result);
      if (!result) {
        return res
          .status(404)
          .send(`We couldn't find breeds with the ID '${id}'`);
      }
      console.log(result);
      res.status(200).json([result]);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postDogHandler = async (req, res) => {
  const {
    reference_image_id,
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    temperaments,
  } = req.body;

  try {
    const response = await createDogDB({
      reference_image_id,
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      temperaments,
    });
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDogByIdHandler,
  postDogHandler,
};
