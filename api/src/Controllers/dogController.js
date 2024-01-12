const { Dog, Temperament } = require("../db");
const axios = require("axios");
<<<<<<< HEAD
const { dogObj } = require("../Helpers");
const getAllTemperaments = require("../Controllers/temperamentsController");
const { URL_IMG  } = process.env;
const { Op } = require("sequelize");

const getDbDogs = async () => { 
 
  try {
    const dbDogs = await Dog.findAll({
=======
const { dogObj, dogObjDb } = require("../Helpers");
const getAllTemperaments = require("../Controllers/temperamentsController");
const { URL_IMG } = process.env;
const { Op } = require("sequelize");

const getDbDogs = async () => {
  //*Todos los perros de db
  // let arrDbDogs = [];
  try {
    const dbDogs = await Dog.findAll({
      // attributes: ['name'],//*quitar esto si quiero que devuelva el obj completo
>>>>>>> main
      include: [
        {
          model: Temperament,
          attributes: ["name"],
<<<<<<< HEAD
          through: { attributes: [] }, 
        },
      ],
    });
    if (!dbDogs) {
      throw new Error("Breed not found in the database");
    }
    const result = dbDogs.map((dog) => {
      const temperamentArray = dog.Temperaments? dog.Temperaments.map((temp) => temp.name).join(", ")
      : ""; 
=======
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
>>>>>>> main
      return {
        id: dog.id,
        name: dog.name,
        heightMin: dog.heightMin,
        heightMax: dog.heightMax,
        weightMin: dog.weightMin,
        weightMax: dog.weightMax,
        life_span: dog.life_span,
<<<<<<< HEAD
        temperament: temperamentArray,
        reference_image_id: dog.reference_image_id,
=======
        temperament: temperaments,
        reference_image_id: imageUrl,
>>>>>>> main
      };
    });
    return result;
  } catch (error) {
<<<<<<< HEAD
    throw new Error("Error fetching the dog from the database");
  }
};

const getApiDogs = async () => {  
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiDogs = response.data.map(dogObj);
    return apiDogs;
  } catch (err) {
=======
    console.log(error);
    throw new Error("Error al obtener el perro de la base de datos");
  }
};

const getApiDogs = async () => {
  //*Todos los perros de la API
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    //*Descomentar el codigode abajo para retorne solo los nombres de los perros
    // const apiDogs = response.data.map((dog) => ({name : dog.name}));
    //*Descomentar el codigode abajo para retorne todas la scaract del perro
    const apiDogs = response.data.map(dogObj);

    return apiDogs;
  } catch (err) {
    console.log("Error en la petición a API");
>>>>>>> main
    throw err;
  }
};

<<<<<<< HEAD
const getAllDogs = async () => { 
=======
const getAllDogs = async () => {
  //!PRACTICAR AQUI COMO TRAER SOLO LOS NOMBRES DE LAS RAZAS DE AMBOS LADOS <== <== <== <==
  //*Todos los perros de DB y API
>>>>>>> main
  const dbDogs = await getDbDogs();
  const arrApiDogs = await getApiDogs();
  const allDogs = [...arrApiDogs, ...dbDogs];
  return allDogs;
};

const getDogByIdFromApi = async (id) => {
<<<<<<< HEAD
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`
    );
    const dog = response.data;
    return dogObj(dog); 
  } catch (error) {
    throw new Error("Error when trying to retrieve the dog from the API by ID");
=======
  //*Busca por id en la API
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
>>>>>>> main
  }
};

const getDogByIdFromDb = async (id) => {
<<<<<<< HEAD
  try {
=======
  //*Busca por id en la db
  try {
    console.log(id);
>>>>>>> main
    const dog = await Dog.findOne({
      where: { id: id },
      include: [
        {
          model: Temperament,
          attributes: ["name"],
<<<<<<< HEAD
          through: { attributes: [] },
        },
      ],
    });
    if (!dog) {
      throw new Error("Breed not found in the database");
    }
=======
          through: { attributes: [] }, // Evita incluir la tabla intermedia
        },
      ],
    });
    console.log(dog);
    if (!dog) {
      throw new Error("Perro no encontrado en la base de datos");
    }

    const imageUrl = `${URL_IMG}/${dog.reference_image_id}.jpg`;
>>>>>>> main
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
<<<<<<< HEAD
      reference_image_id: dog.reference_image_id,
    };
  } catch (error) {
    throw new Error("Error retrieving the breeds from the database");
=======
      reference_image_id: imageUrl,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el perro de la base de datos");
>>>>>>> main
  }
};

const createDogDB = async ({
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
<<<<<<< HEAD
      throw new Error(`A breed with name '${name}' already exists`);
=======
      throw new Error(`Ya existe un perro con el nombre '${name}'`);
>>>>>>> main
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

<<<<<<< HEAD
    if (!Array.isArray(temperaments)) {
      throw new Error("The value of 'temperaments' must be an array");
    }
    const formattedTemperaments = temperaments.join(', ');
    const stringTemperaments = temperaments.map(String);
    for (const newTemperament of stringTemperaments) {
      const [dbTemperament, created] = await Temperament.findOrCreate({
        where: {
          name: 
          // formattedTemperaments.trim()
          {[Op.iLike]: `%${newTemperament.trim()}%`,}
        },
      });
      await newDog.addTemperament(dbTemperament);
      if (created) {
      }
    }
    return newDog;
  } catch (error) {
    throw new Error(
      `Error creating the dog in the database: ${error.message}`
=======
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
>>>>>>> main
    );
  }
};

const getTemperamentsForDog = async (id) => {
  try {
    const dog = await Dog.findByPk(id, {
      include: Temperament,
    });

    if (!dog) {
<<<<<<< HEAD
      const apiDog = await getDogByIdFromApi(id);
      await getAllTemperaments();
      return apiDog.temperament;
    }
    const temperaments = dog.Temperaments.map((temp) => temp.name);
    return temperaments;
  } catch (error) {
    throw new Error("Error retrieving the temperaments");
=======
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
>>>>>>> main
  }
};

module.exports = {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
  getTemperamentsForDog,
};
