const axios = require("axios");


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
  
  module.exports = {
    getAllDogsFromApi
  };
  