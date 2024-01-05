const axios = require("axios");
const { Temperament } = require("../db");

const getAllTemperaments = async () => {
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
      return apiTemperaments;
    } catch (error) {
      throw error;;
    }
  };

  module.exports = getAllTemperaments;