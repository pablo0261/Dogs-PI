const { Temperaments } = require("../db");
const axios = require("axios");

const getAllTemperaments = async () => {
    //*Todos los temperamentos de la API
    try {
      let temperamentsApi= new Set();
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      response.data.forEach((apiData) => {let resultTempreamentsArr = apiData.temperaments?apiData.temperaments.split(", "):[];

        resultTempreamentsArr.forEach((temp) => temperamentsApi.add(temp));
      });
      const tempApiStock = Array.from(temperamentsApi);
      tempApiStock.forEach((e)=>{
        Temperaments.findOrCreate({
          where: {name: e}
        });
      });
      return await Temperaments.findAll();
      } catch (error) {
        console.log('Error en el servicio', error);
        };
        };

  module.exports = getAllTemperaments;