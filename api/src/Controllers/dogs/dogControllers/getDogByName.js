const { Dog } = require("../../../../db");

const getDogByNameFromApi = async (name) => {
  //*Busca por nombre en la API
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );
    return response;
  } catch (error) {
    console.log('No encontrado en la api por nombre');
    return res.status(404).send(`Dog doesn't exist`);
  }
};

const getDogsByNameFromDb = async (name) => {
  //*Busca por nombre en la db
  try {
    const dogs = await Dog.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, 
        },
      },
    });
    return dogs;
  } catch (err) {
    console.log('no encontrado por nombre en la db');
    return res.status(404).send(`No hay registros de ese perro en la db`);
  }
};


module.exports = {
  getDogByNameFromApi,
  getDogsByNameFromDb,
};
