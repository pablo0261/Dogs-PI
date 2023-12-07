const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { dogObj, dogObjDb } = require("../Helpers");
const getAllTemperaments = require("../Controllers/temperamentsController");
const { URL_IMG, API_KEY } = process.env;
const { Op } = require("sequelize");

const getDbDogs = async () => { //*Todos los perros de db
 
  // let arrDbDogs = [];
  try {
    const dbDogs = await Dog.findAll({
      // attributes: ['name'],//*quitar esto si quiero que devuelva el obj completo
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] }, // Evita incluir la tabla intermedia
        },
      ],
    });
    console.log(dbDogs);
    if (!dbDogs) {
      throw new Error("Perro no encontrado en la base de datos");
    }
    // const result = dbDogs.map((dog) => ({name : dog.name}))
    // return result;
    //*Descomentar lo de abajo si quiero que retorne toda la info de los perros
    const result = dbDogs.map((dog) => {
      const temperaments = dog.Temperaments.map((temp) => temp.name).join(", ");
      const imageUrl = `${URL_IMG}/${dog.reference_image_id}.jpg`;
      return {
        id: dog.id,
        name: dog.name,
        heightMin: dog.heightMin,
        heightMax: dog.heightMax,
        weightMin: dog.weightMin,
        weightMax: dog.weightMax,
        life_span: dog.life_span,
        temperament: temperaments,
        reference_image_id: imageUrl,
      };
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el perro de la base de datos");
  }
};

const getApiDogs = async () => {  //*Todos los perros de la API
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    //*Descomentar el codigode abajo para retorne solo los nombres de los perros
    // const apiDogs = response.data.map((dog) => ({name : dog.name}));
    //*Descomentar el codigode abajo para retorne todas la scaract del perro
    const apiDogs = response.data.map(dogObj);

    return apiDogs;
  } catch (err) {
    console.log("Error en la petición a API");
    throw err;
  }
};

const getAllDogs = async () => { //*Todos los perros de DB y API
  //!PRACTICAR AQUI COMO TRAER SOLO LOS NOMBRES DE LAS RAZAS DE AMBOS LADOS <== <== <== <==
 
  const dbDogs = await getDbDogs();
  const arrApiDogs = await getApiDogs();
  const allDogs = [...arrApiDogs, ...dbDogs];
  return allDogs;
};

const getDogByIdFromApi = async (id) => {//*Busca por id en la API
  
  try {
    console.log("entre a la busqueda en la api");
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`
    );

    const dog = response.data;

    console.log(dog, URL_IMG);
    return dogObj(dog, URL_IMG); //* <== Helper
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el perro de la API");
  }
};

const getDogByIdFromDb = async (id) => {//*Busca por id en la db
  
  try {
    console.log(id);
    const dog = await Dog.findOne({
      where: { id: id },
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] }, // Evita incluir la tabla intermedia
        },
      ],
    });
    console.log(dog);
    if (!dog) {
      throw new Error("Perro no encontrado en la base de datos");
    }

    const imageUrl = `${URL_IMG}/${dog.reference_image_id}.jpg`;
    const temperaments = dog.Temperaments.map((temp) => temp.name).join(", ");
    return {
      id: dog.id,
      name: dog.name,
      heightMin: dog.heightMin,
      heightMax: dog.heightMax,
      weightMin: dog.weightMin,
      weightMax: dog.weightMax,
      life_span: dog.life_span,
      temperament: temperaments,
      reference_image_id: imageUrl,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el perro de la base de datos");
  }
};

const createDogDB = async ({//* Crea perros
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  life_span,
  temperaments,
  reference_image_id,
}) => {
  try {
    const existDog = await Dog.findOne({
      where: { name: name },
    });

    if (existDog) {
      throw new Error(`Ya existe un perro con el nombre '${name}'`);
    }
    let newDog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      reference_image_id,
    });

    // Verifica que temperaments sea un array antes de iterar
    if (!Array.isArray(temperaments)) {
      throw new Error("El valor de temperaments debe ser un array");
    }

    // Iterar sobre los temperamentos proporcionados por el cliente
    for (const newTemperaments of temperaments) {
      // Buscar en la base de datos todas las filas de temperamentos
      const [dbTemperament, created] = await Temperament.findOrCreate({
        where: {
          name: {
            [Op.iLike]: `%${newTemperaments.trim()}%`,
          },
        },
      });
      console.log(newTemperaments);
      await newDog.addTemperament(dbTemperament);
      if (created) {
        console.log(
          `Creado nuevo temperamento: ${dbTemperament.name} y ${dbTemperament.id}`
        );
      }

      console.log(`Asociando temperamento '${dbTemperament.name}' al perro`);
    }

    console.log("Perro creado exitosamente");
    return newDog;
  } catch (error) {
    console.error(
      "Error al crear el perro en la base de datos:",
      error.message
    );
    throw new Error(
      `Error al crear el perro en la base de datos: ${error.message}`
    );
  }
};

const getTemperamentsForDog = async (id) => {//*Trae los temperamentos
  try {
    const dog = await Dog.findByPk(id, {
      include: Temperament,
    });

    if (!dog) {
      // Si no se encuentra en la base de datos, intentamos obtenerlo de la API
      const apiDog = await getDogByIdFromApi(id);

      // Guardamos los temperamentos de la API en la base de datos
      await getAllTemperaments();

      return apiDog.temperament;
    }

    const temperaments = dog.Temperaments.map((temp) => temp.name);
    return temperaments;
  } catch (error) {
    console.error(
      "Error al obtener los temperamentos del perro:",
      error.message
    );
    throw new Error("Error al obtener los temperamentos del perro");
  }
};

module.exports = {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
  getTemperamentsForDog,
};
