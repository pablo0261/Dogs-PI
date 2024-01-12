const axios = require("axios");
const { Dog } = require("../../../../db");


const getDogByIdFromApi = async (id) => {
    //*Busca por id en la API
    try {
     
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/:${id}`
      );
  
      // Devolver los datos obtenidos de la API
      const apiData = response.data;
      const detailData = {
        id: apiData.id,
        reference_image_id: apiData.reference_image_id, //!ver esto aqui, como traer luego las imagenes!!
        name: apiData.name,
        height: apiData.height.metric,
        weight: apiData.weight.metric,
        life_span: apiData.life_span,
      };
      return detailData;
    } catch (error) {
      // Manejar errores de la API
      throw new Error("Error al obtener el perro de la API");
    }
  };
  
  const getDogByIdFromDb = async (id) => {
    //*Busca por id en la db
    try {
      const dogFromDb = await Dog.findByPk(id);
      return dogFromDb;
    } catch (error) {
      throw new Error("Error al obtener el perro de la base de datos");
    }
  };


  module.exports = {
    getDogByIdFromApi,
    getDogByIdFromDb,
  };
  