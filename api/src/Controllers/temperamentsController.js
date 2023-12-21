const { Temperament } = require("../db");
const axios = require("axios");

const getAllTemperaments = async () => {
    //*Todos los temperamentos de la API
    try {
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      const apiTemperaments = response.data.map((apiData) =>({temp: apiData.temperament}));
    for (const dog of apiTemperaments) {
      if (dog.temp) {
        await Temperament.findOrCreate({
          where: { name: dog.temp },
          defaults: { name: dog.temp },//! esnecesario?
        });
      }
    }

    console.log("Temperamentos guardados en la base de datos:");
      return apiTemperaments;
    } catch (error) {
      console.log("No fue posible traer todos los temperamentos");
      throw error;;
    }
  };

  module.exports = getAllTemperaments;