<<<<<<< HEAD
const axios = require("axios");
const { Temperament } = require("../db");

const getAllTemperaments = async () => {
=======
const { Temperament } = require("../db");
const axios = require("axios");

const getAllTemperaments = async () => {
    //*Todos los temperamentos de la API
>>>>>>> main
    try {
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      const apiTemperaments = response.data.map((apiData) =>({temp: apiData.temperament}));
    for (const dog of apiTemperaments) {
      if (dog.temp) {
        await Temperament.findOrCreate({
          where: { name: dog.temp },
          defaults: { name: dog.temp },
        });
      }
    }
<<<<<<< HEAD
      return apiTemperaments;
    } catch (error) {
=======

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
>>>>>>> main
      throw error;;
    }
  };

  module.exports = getAllTemperaments;