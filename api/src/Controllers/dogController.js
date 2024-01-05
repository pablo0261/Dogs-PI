const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { dogObj } = require("../Helpers");
const getAllTemperaments = require("../Controllers/temperamentsController");
const { URL_IMG  } = process.env;
const { Op } = require("sequelize");

const getDbDogs = async () => { 
 
  try {
    const dbDogs = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] }, 
        },
      ],
    });
    if (!dbDogs) {
      throw new Error("Breed not found in the database");
    }
    const result = dbDogs.map((dog) => {
      const temperamentArray = dog.Temperaments? dog.Temperaments.map((temp) => temp.name)
      : []; 
      return {
        id: dog.id,
        name: dog.name,
        heightMin: dog.heightMin,
        heightMax: dog.heightMax,
        weightMin: dog.weightMin,
        weightMax: dog.weightMax,
        life_span: dog.life_span,
        temperament: temperamentArray,
        reference_image_id: dog.reference_image_id,
      };
    });
    return result;
  } catch (error) {
    throw new Error("Error fetching the dog from the database");
  }
};

const getApiDogs = async () => {  
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiDogs = response.data.map(dogObj);
    return apiDogs;
  } catch (err) {
    throw err;
  }
};

const getAllDogs = async () => { 
  const dbDogs = await getDbDogs();
  const arrApiDogs = await getApiDogs();
  const allDogs = [...arrApiDogs, ...dbDogs];
  return allDogs;
};

const getDogByIdFromApi = async (id) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`
    );
    const dog = response.data;
    return dogObj(dog); 
  } catch (error) {
    throw new Error("Error when trying to retrieve the dog from the API by ID");
  }
};

const getDogByIdFromDb = async (id) => {
  try {
    const dog = await Dog.findOne({
      where: { id: id },
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!dog) {
      throw new Error("Breed not found in the database");
    }
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
      reference_image_id: dog.reference_image_id,
    };
  } catch (error) {
    throw new Error("Error retrieving the breeds from the database");
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
      throw new Error(`A breed with name '${name}' already exists`);
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

    if (!Array.isArray(temperaments)) {
      throw new Error("The value of 'temperaments' must be an array");
    }
    const formattedTemperaments = temperaments.join(', ');
    const stringTemperaments = temperaments.map(String);
    for (const newTemperament of stringTemperaments) {
      const [dbTemperament, created] = await Temperament.findOrCreate({
        where: {
          name: formattedTemperaments.trim()
          // {[Op.iLike]: `%${newTemperament.trim()}%`,}
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
    );
  }
};

const getTemperamentsForDog = async (id) => {
  try {
    const dog = await Dog.findByPk(id, {
      include: Temperament,
    });

    if (!dog) {
      const apiDog = await getDogByIdFromApi(id);
      await getAllTemperaments();
      return apiDog.temperament;
    }
    const temperaments = dog.Temperaments.map((temp) => temp.name);
    return temperaments;
  } catch (error) {
    throw new Error("Error retrieving the temperaments");
  }
};

module.exports = {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
  getTemperamentsForDog,
};
