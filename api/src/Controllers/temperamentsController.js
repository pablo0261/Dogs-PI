const { Temperament } = require("../db");
const axios = require("axios");

const getAllTemperaments = async () => {
    //*Todos los temperamentos de la API
    try {
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      const apiTemperaments = response.data.map((apiData) => ({
        temperament: apiData.temperament
      }));

     //!DEBO GUARDARLOS EN LA DB
    for (const temp of apiTemperaments) {
      if (temp.temperament) {
        await Temperament.findOrCreate({
          where: { name: temp.temperament },
          defaults: { name: temp.temperament },
        });
      }
    }

    console.log("Temperamentos guardados en la base de datos:", apiTemperaments);
      return apiTemperaments;
    } catch (error) {
      console.log("No fue posible traer todos los temperamentos");
      throw error;;
    }
  };

  module.exports = getAllTemperaments;