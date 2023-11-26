const { Op } = require("sequelize");
const { Dog } = require("../../../db");
const axios = require("axios");

const {getAllDogsFromApi} = require("./dogSubControllers/getAllDogsFromApi")
const {getDogByIdFromApi,  getDogByIdFromDb} = require("./dogSubControllers/getDogById")
const {getDogByNameFromApi, getDogsByNameFromDb} = require("./dogSubControllers/getDogByName")

const getAllDogs = async () => {
  //*Todos los perros de db y API
  try {
    const dbDogs = await Dog.findAll();
    const apiDogs = await getAllDogsFromApi();
    return (allDogs = [...dbDogs, ...apiDogs]);
  } catch (err) {
    console.log(err);
  }
};


const getDogsByName = async (name) => {
  //*Busca por nombre en la API y luego en la db.
  try {
    const {allDogs} = await getAllDogsFromApi();
    if (name) {
    const dogByNameFilter = await allDogs.filter((dog) => {
      dog.name.toLowerCase().includes(name.toLowerCase())
    })
    dogByNameFilter? res.status(200).json(dogByNameFilter) : res.status(400).send("Perro no encontrado en API")
    } else {
      return res.status(200).json(allDogs)
    }
  } catch (error) {
    console.log('no paso el getDogsByName');
    res.status(400).json({error:error.message})
  }
};

// const getDogsById = async (id) => {
//   try {
//     const{id}
//   } catch (error) {
    
//   }
// }

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
  getDogsByName,
  getAllDogs,
  createDogDB,
};
