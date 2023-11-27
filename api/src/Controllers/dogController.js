const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { dogObj } = require("../Helpers");

const getDbDogs = async () => {
  //*Todos los perros de db y API
  let arrDbDogs = [];
  try {
    const dbDogs = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
        },
      ],
    });
    arrDbDogs = dbDogs.map((dog) => dogObj(dog));

    return arrDbDogs;
  } catch (error) {
    console.log("Error en la consulta a DB", error);
    return [];
  }
};

const getApiDogs = async () => {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiDogs = await response.data.map(dogObj);
    return apiDogs;
  } catch (err) {
    console.log("Error en la petición a API");
    throw err;
  }
};

const getAllDogs = async () => {
  const arrDbDogs = await getDbDogs();
  const arrApiDogs = await getApiDogs();
  const allDogs = [...arrApiDogs, ...arrDbDogs];
  return allDogs;
};

const getDogByIdFromApi = async (id) => {
  //*Busca por id en la API
  try {
    // Hacer una solicitud a la API utilizando el ID proporcionado
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`
    );

    // Devolver los datos obtenidos de la API
    const apiData = response.data;
    const detailData = {
      id: apiData.id,
      reference_image_id: apiData.reference_image_id, //!ver esto aqui, creo que va a dar problemas
      name: apiData.name,
      height: apiData.height.metric,
      weight: apiData.weight.metric,
      life_span: apiData.life_span,
    };
    return detailData;
  } catch (error) {
    // Manejar errores de la API
    throw new Error("Error al obtener el perro de la API");
  }
};

const getDogByIdFromDb = async (id) => {
  //*Busca por id en la db
  try {
    const dogFromDb = await Dog.findByPk(id);
    return dogFromDb;
  } catch (error) {
    throw new Error("Error al obtener el perro de la base de datos");
  }
};

const createDogDB = async ({
  id,
  reference_image_id,
  name,
  height,
  weight,
  life_span,
  temperaments,
}) => {
  try {
    if (id && name) {
      let newDog = await Dog.create({
        id,
        reference_image_id,
        name,
        height,
        weight,
        life_span,
      });

      // Iterar sobre los temperamentos proporcionados por el cliente
      for (const newTemperaments of temperaments) {
        // Buscar en la base de datos todas las filas de temperamentos
        const [dbTemperament, created] = await Temperament.findOrCreate({
          where: { name: newTemperaments.trim().toLowerCase() },
        });
        await newDog.addTemperament(dbTemperament);
        if (created) {
          console.log(`Creado nuevo temperamento: ${dbTemperament.name}`);
        }

        console.log(`Asociando temperamento '${dbTemperament.name}' al perro`);
      }

      console.log("Perro creado exitosamente");
      return newDog;
    } else {
      throw new Error("Faltan propiedades");
    }
  } catch (error) {
    console.error("Error al crear el perro en la base de datos:", error.message);
    throw new Error(`Error al crear el perro en la base de datos: ${error.message}`);
  }
};


module.exports = {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
};
