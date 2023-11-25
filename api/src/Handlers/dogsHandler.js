const {getDogsByName, getAllDogs, getDogByIdFromApi,
  getDogByIdFromDb, createDogDB} = require("../Controllers/dogController")

const getDogsHandler = async (req, res) => {//*Hace la peticion por nombre, si no existe el nombre trae todos los perros
  
    const { name } = req.query;

    const nameUpercase = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  try {
    if (name) { //*verifico si llega el name para sabr si uso el buscador por nombre o traigo a todos
      const result = await getDogsByName(nameUpercase); //*paso como parametro nameUpercase para que concida con los nombres de los objetos en la API o DB.
      res.status(200).json(result);
    } else {
      const result = await getAllDogs();
      res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}


const getDogByIdHandler = async (req, res) => {//*Busca el perro por id,(segun el tipode id busca en la api o en la db)
  const { id } = req.params;
  try {
    let result;
    if(!isNaN(id)){//*si es numero busca en la API, 
      result = await getDogByIdFromApi(id);
    } else { //*si es UUID busca en la DB
      result = await getDogByIdFromDb(id);
    }

    //! VERIFICAR ESTA APRTE DEL CODIGO SI FUNCIONARA CON LOS TEMPERAMENTOS
    if (result && result.temperaments) {
      // Si tiene temperamentos, agregamos esa información a la respuesta
      res.status(200).json(result);
    } else {
      // Si no tiene temperamentos, buscamos los temperamentos y los agregamos
      const temperaments = await getTemperamentsForDog(result.raza); // Ajusta la función según tu implementación
      result.temperaments = temperaments;
      res.status(200).json(result);
    }
//!

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const postDogHandler = async (req, res) => {
  const {  id, reference_image_id, name, height, weight, life_span } = req.body; 

  try {
    const response = await createDogDB({id, reference_image_id, name, height, weight, life_span})
    res.status(200).json(response);
    
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}; 

module.exports = {
  getDogsHandler,
  getDogByIdHandler,
  postDogHandler,
};