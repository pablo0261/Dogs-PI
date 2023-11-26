const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { dogObj } = require("../Helpers");

const getDbDogs = async () => {//*Todos los perros de db y API
  let arrDbDogs = [];
  try {
    const dbDogs = await Dog.findAll({
      include: [{
        model: Temperament,
        attributes: ['name'],
      }],
    })
    arrDbDogs = dbDogs.map(dog => dogObj(dog));
 
return arrDbDogs;
} catch (error) {
  console.log('Error en la consulta a DB',error);
  return [];
  };
  };

const getApiDogs = async () => {   
  try {     
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiDogs = await response.data.map((apiData) => ({
      id: apiData.id,
      reference_image_id: apiData.reference_image_id,
      name: apiData.name,
      height: apiData.height.metric,
      weight: apiData.weight.metric,
      life_span: apiData.life_span,
    }));
    return apiDogs;
    } catch (err) {
      console.log('Error en la petición a API')
      }
      };


    const getAllDogs = async () => {
      const arrDbDogs = await getDbDogs();
      const arrApiDogs = await getApiDogs();
      const allDogs = [...arrApiDogs, ...arrDbDogs];
      return allDogs;
  }

const getAllDogsFromApi = async () => {
  //*Todos los perros de la API
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiDogs = response.data.map((apiData) => ({
      id: apiData.id,
      reference_image_id: apiData.reference_image_id || "",
      name: apiData.name,
      height: apiData.height.metric || "",
      weight: apiData.weight.metric || "",
      life_span: apiData.life_span || "",
    }));

    return apiDogs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getDogsByName = async (name) => {
  //*Busca por nombre en la API y luego en la db.
  try {
    const apiDog = await getDogByNameFromApi(name);
    if (apiDog) {
        return apiDog;
    } else {
        console.log('no lo encontró en la api')
      const dbDogs = await getDogsByNameFromDb(name);
      return dbDogs;
    }
  } catch (error) {
    console.log('no paso el getDogsByName');
  }
};

const getDogByNameFromApi = async (name) => {//!ESTO PASARLO A SUB CONTROLLER
  //*Busca por nombre en la API
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );
    return response;
  } catch (error) {
    console.log('No encontrado en la api por nombre');
    return null;
  }
};

const getDogsByNameFromDb = async (name) => {
  //*Busca por nombre en la db
  try {
    const dogs = await Dog.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return dogs;
  } catch (err) {
    console.log('no encontrado por nombre en la db');
  }
};
//!Si van a tener diferentes tipos de ID esto lo puedo sacar y manejarlo desde el handler
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

const createDogDB = async ({ id, reference_image_id, name, height, weight, life_span }) => {//*Crea un perro en la db
  try {
    if (id  && name) {
      const newDog = await Dog.create({
        id,
        reference_image_id,
        name,
        height,
        weight,
        life_span,
        //*El od abajo es para cuando quiera POST con un objeto como el de la api
        // id, 
        // reference_image_id,
        // name,
        // height: height.metric,
        // weight: weight.metric,
        // life_span,
      });
      return newDog;
    } else {
      throw new Error("Faltan propiedades");
    }
  } catch (error) {
    throw new Error(
      `Error al crear el perro en la base de datos: ${error.message}`
    );
  }
};

module.exports = {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
};
