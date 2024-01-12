const {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
<<<<<<< HEAD
} = require("../Controllers/dogController");

const getDogsHandler = async (req, res) => {
=======
  getTemperamentsForDog,
} = require("../Controllers/dogController");
const { Dog, Temperament } = require("../db");

// const getDogByNameWithTemp = async (name) => {
//   try {
//     const foundDog = await Dog.findOne({
//       where: { name },
//       include: Temperament,
//     });
//     if (foundDog) {
//       const temperaments = foundDog.Temperaments ? foundDog.Temperaments.map((temp) => temp.name) : ['Sin Temperamento'];

//       const dogsWithTemperaments ={
//         id: foundDog.id,
//         name: foundDog.name,
//         height: foundDog.height,
//         weight: foundDog.weight,
//         life_span: foundDog.life_span,
//         temperaments: temperaments,
//       };

//       return dogsWithTemperaments;
//     } else {
//       console.log(`No se encontraron perros con el nombre '${name}'`);
//       // Retornamos un array vacío para indicar que no se encontraron perros
//       return [];
//     }
//   } catch (error) {
//     console.error("Error al buscar el perro en la base de datos:", error.message);
//     // Lanzamos una excepción para que el controlador pueda manejar el error
//     throw new Error("Error interno del servidor");
//   }
// };

const getDogsHandler = async (req, res) => {
  //*Hace la peticion por nombre, si no existe el nombre trae todos los perros

>>>>>>> main
  const { name } = req.query;
  try {
    const allDogs = await getAllDogs();
    if (name) {
      if (name.length >= 3) {
<<<<<<< HEAD
        const dogsFound = allDogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        );
        if (dogsFound.length > 0) {
          return res.status(200).json(dogsFound);
        } else {
          return res
            .status(404)
            .json(`We couldn't find breeds with the name '${name}'`);
        }
      } else {
        return res.status(400).send("The name must have at least 3 letters");
      }
    } else {
      return res.status(200).json(allDogs);
    }
  } catch (error) {
=======
        const dogsFound = allDogs
          .filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
          // .map((dog) => ({ name: dog.name })); //*Agregando esta linea devuelve solo el nombre de los dogs
        if (dogsFound.length > 0) {
          //Debe ser con .length porque dogsFound es un array y si no se encuentra devolvera un boleano y no caera nunca en el error del codigo
          return res.status(200).json(dogsFound);
        } else {
          return res.status(404).json({
            message: `No breed was found with the name '${name}'`,
          });
        }
      } else {
          return res.status(400).send("El nombre debe tener al menos 3 letras");
        }
    } else {
      console.log("Buscando todos los perros");
      const dogNames = allDogs.map((dog) => ({ name: dog.name }));
      return res.status(200).json(dogNames);
    }
  } catch (error) {
    console.error(err);
>>>>>>> main
    return res.status(500).json({ error: error.message });
  }
};

const getDogByIdHandler = async (req, res) => {
<<<<<<< HEAD
=======
  //*Busca el perro por id,(segun el tipode id busca en la api o en la db)

>>>>>>> main
  const { id } = req.params;
  try {
    let result;
    if (!isNaN(id)) {
<<<<<<< HEAD
      result = await getDogByIdFromApi(id);
      if (result) {
        return res.status(200).json(result);
=======
      console.log(!isNaN(id));
      console.log(!isNaN(id));
      //*si es numero busca en la API,
      result = await getDogByIdFromApi(id);
      if (result) {
        return res.status(200).json([result]);
>>>>>>> main
      } else {
        return res
          .status(400)
          .send(`We couldn't find breeds with the ID '${id}'`);
      }
    } else {
<<<<<<< HEAD
      result = await getDogByIdFromDb(id);
=======
      //*si es UUID busca en la DB
      result = await getDogByIdFromDb(id);
      console.log(result);
>>>>>>> main
      if (!result) {
        return res
          .status(404)
          .send(`We couldn't find breeds with the ID '${id}'`);
      }
<<<<<<< HEAD
      res.status(200).json(result);
=======
      console.log(result);
      console.log(result);

      res.status(200).json([result]);
>>>>>>> main
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
