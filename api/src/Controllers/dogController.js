const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { dogObj } = require("../Helpers");
const getAllTemperaments = require("../Controllers/temperamentsController");

const getDbDogs = async () => {
  //*Todos los perros de db
  // let arrDbDogs = [];
  try {
   
    const dbDogs = await Dog.findAll({
      include: [{
        model:Temperament,
        attributes: ["name"],
        through: { attributes: [] }, // Evita incluir la tabla intermedia
      }]
    });
    console.log(dbDogs)
    if (!dbDogs) {
      throw new Error("Perro no encontrado en la base de datos");
    }
     // Mapear cada perro de la base de datos
     const result = dbDogs.map((dog) => {
     // Extraer los nombres de los temperamentos en un string
    // const temperaments = dbDogs ? dbDogs["Temperaments"] : "";
    const temperaments = dog.Temperaments.map((temp) => temp.name).join(', ');
    // Crear el objeto con la estructura deseada
    return {
      id: dog.id,
      reference_image_id: dog.reference_image_id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      temperament: temperaments,
      life_span: dog.life_span,
    };
  });
    console.log(result)
    return result; // Accede a dataValues para obtener los valores reales
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el perro de la base de datos");
  }
};

const getApiDogs = async () => {
  //*Todos los perros de la API
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
  //!PRACTICAR AQUI COMO TRAER SOLO LOS NOMBRES DE LAS RAZAS DE AMBOS LADOS <== <== <== <==
  //*Todos los perros de DB y API
  const dbDogs = await getDbDogs();
  const arrApiDogs = await getApiDogs();
  const allDogs = [...arrApiDogs, ...dbDogs];
  return allDogs;
};

const getDogByIdFromApi = async (id) => {
  //*Busca por id en la API
  try {
    console.log("entre a la busqueda en la api")
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`
    );

    const apiData = response.data;
    console.log(apiData)
    const detailData = {
      id: apiData.id,
      reference_image_id: apiData.reference_image_id, //!ver esto aqui, creo que va a dar problemas para mostrarlo en el front
      name: apiData.name,
      height: apiData.height.metric,
      weight: apiData.weight.metric,
      temperament: apiData.temperament,
      life_span: apiData.life_span,
    };
    console.log(detailData)
    return detailData;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el perro de la API");
  }
};

const getDogByIdFromDb = async (id) => {
  //*Busca por id en la db
  try {
    console.log(id);
    const dogFromDb = await Dog.findOne({
      where: { id: id },
      include: [{
        model:Temperament,
        attributes: ["name"],
        through: { attributes: [] }, // Evita incluir la tabla intermedia
      }]
    });
    console.log(dogFromDb)
    if (!dogFromDb) {
      throw new Error("Perro no encontrado en la base de datos");
    }
     // Extraer los nombres de los temperamentos en un string
    // const temperaments = dogFromDb ? dogFromDb["Temperaments"] : "";
    const temperaments = dogFromDb ? dogFromDb.Temperaments.map((temp) => temp.name).join(', ') : "";
    // Crear el objeto con la estructura deseada
    const result = {
      id: dogFromDb.id,
      reference_image_id: dogFromDb.reference_image_id,
      name: dogFromDb.name,
      height: dogFromDb.height,
      weight: dogFromDb.weight,
      temperament: temperaments,
      life_span: dogFromDb.life_span,
    };
    console.log(result)
    return result; // Accede a dataValues para obtener los valores reales
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el perro de la base de datos");
  }
};

const createDogDB = async ({
  reference_image_id,
  name,
  height,
  weight,
  life_span,
  temperaments,
}) => {
  try {
    const existDog = await Dog.findOne({
      where: { name: name },
    });

    if (existDog) {
      throw new Error(`Ya existe un perro con el nombre '${name}'`);
    }
      let newDog = await Dog.create({
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
  } catch (error) {
    console.error("Error al crear el perro en la base de datos:", error.message);
    throw new Error(`Error al crear el perro en la base de datos: ${error.message}`);
  }
};

const getTemperamentsForDog = async (id) => {
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
    console.error("Error al obtener los temperamentos del perro:", error.message);
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


