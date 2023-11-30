const { Temperament } = require("../db");
const axios = require("axios");

const getAllTemperaments = async () => {
    //*Todos los temperamentos de la API
    try {
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      const apiTemperaments = response.data.map((apiData) => 
         [apiData.temperament]
      );
    for (const temp of apiTemperaments) {
      if (temp.temperament) {
        await Temperament.findOrCreate({
          where: { name: temp.temperament },
          defaults: { name: temp.temperament },
        });
      }
    }

    console.log("Temperamentos guardados en la base de datos:");
      return apiTemperaments;
  //*Aqui podria traerlos de la db tambien para que los devuelva sin la propiedad aunque seria poco eficiente:
    //    // Obtener los temperamentos desde la base de datos
    // const dbTemperaments = await Temperament.findAll({ attributes: ['name'] });

    // // Formatear los temperamentos como objetos
    // const formatTemperaments = dbTemperaments.map((dbTemp) => 
    //   [dbTemp.name]
    // );
    // return formatTemperaments;
    } catch (error) {
      console.log("No fue posible traer todos los temperamentos");
      throw error;;
    }
  };

  module.exports = getAllTemperaments;