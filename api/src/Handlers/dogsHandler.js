const { getAllDogs, getDogByIdFromApi, getDogByIdFromDb, createDogDB
} = require("../Controllers/dogController");

const getDogsHandler = async (req, res) => {
  //*Hace la peticion por nombre, si no existe el nombre trae todos los perros

  const { name } = req.query;
  try {
    const allDogs = await getAllDogs();
    if (name) {
      const dogsFilter = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dogsFilter.length > 0) {
        return res.status(200).json(dogsFilter);
      } else {
        return res.status(400).send("No se encontro ningun perro con ese nombre");
      }
    } else {
      console.log("buscando todos los perros");
      return res.status(200).json(allDogs);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getDogByIdHandler = async (req, res) => {
  //*Busca el perro por id,(segun el tipode id busca en la api o en la db)
  const { id } = req.params;
  try {
    let result;
    if (!isNaN(id)) {
      //*si es numero busca en la API,
      result = await getDogByIdFromApi(id);
    } else {
      //*si es UUID busca en la DB
      result = await getDogByIdFromDb(id);
    }

    //! VERIFICAR ESTA APRTE DEL CODIGO SI FUNCIONARA CON LOS TEMPERAMENTOS
    if (result && result.temperaments) {
      // Si tiene temperamentos, agregamos esa información a la respuesta
      res.status(200).json(result);
    } else {
      // Si no tiene temperamentos, buscamos los temperamentos y los agregamos
      const temperaments = await getTemperamentsForDog(result.raza); // Ajusta la función según tu implementación
      result.temperaments = temperaments;
      res.status(200).json(result);
    }
    //!
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postDogHandler = async (req, res) => {
  const { id, reference_image_id, name, height, weight, life_span } = req.body;

  try {
    const response = await createDogDB({
      id,
      reference_image_id,
      name,
      height,
      weight,
      life_span,
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
