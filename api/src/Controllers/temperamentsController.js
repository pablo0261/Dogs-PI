const { Temperaments } = require("../db");
const axios = require("axios");

const getAllTemperaments = async () => {
    //*Todos los temperamentos de la API
    try {
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      const apiTemperaments = response.data.map((apiData) => ({
        temperament: apiData.temperament
      }));

    //    //* Guardar los temperamentos en la base de datos
    // await Temperaments.bulkCreate(apiTemperaments, {
    //     updateOnDuplicate: ["temperament"], //* Si hay duplicados, actualizar la columna "temperament"
    //   });
     //!DEBO GUARDARLOS EN LA DB
      return apiTemperaments;
    } catch (error) {
      console.log("No fue posible traer todos los temperamentos");
      return error;
    }
  };

  module.exports = getAllTemperaments;