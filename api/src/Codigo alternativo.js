

//! codigo para que el controller de all getdog traiga solo los nombres de los perros
const getDbDogs = async () => {
    //*Todos los perros de db
    // let arrDbDogs = [];
    try {
     
      const dbDogs = await Dog.findAll({
        attributes: ['name'],//*quitar esto si quiero que devuelva el obj completo
        include: [{
          model:Temperament,
          attributes: ["name"],
          through: { attributes: [] }, // Evita incluir la tabla intermedia
        }]
      });
      console.log(dbDogs)
      if (!dbDogs) {
        throw new Error("Perro no encontrado en la base de datos");
      }
       // Mapear cada perro de la base de datos
       const result = dbDogs.map((dog) => [dog.name]) //* quitar esta lineapara que devuelva todo el objeto
       // Extraer los nombres de los temperamentos en un string
      // const temperaments = dbDogs ? dbDogs["Temperaments"] : "";
      //*descomentar esto de abajo para  que devuelva el obj completo
      // const temperaments = dog.Temperaments.map((temp) => temp.name).join(', ');
      // Crear el objeto con la estructura deseada
      return result;
      //*descomentar todo el return de abajo para q devuelva el obj completo
      // return {
      //   id: dog.id,
      //   reference_image_id: dog.reference_image_id,
      //   name: dog.name,
      //   height: dog.height,
      //   weight: dog.weight,
      //   temperament: temperaments,
      //   life_span: dog.life_span,
      // };
    // });
      // console.log(result)
      // return result; // Accede a dataValues para obtener los valores reales
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el perro de la base de datos");
    }
  };
  
  const getApiDogs = async () => {
    //*Todos los perros de la API
    try {
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      //* const apiDogs = await response.data.map(dogObj); <==descomentar esta linea para que devuelva el objeto completo
      const apiDogs = response.data.map((dog) => [dog.name]);
      return apiDogs;
    } catch (err) {
      console.log("Error en la petición a API");
      throw err;
    }
  };
  
  const getAllDogs = async () => {
    //!PRACTICAR AQUI COMO TRAER SOLO LOS NOMBRES DE LAS RAZAS DE AMBOS LADOS <== <== <== <==
    //*Todos los perros de DB y API
    const dbDogs = await getDbDogs();
    const arrApiDogs = await getApiDogs();
    const allDogs = [...arrApiDogs, ...dbDogs];
    return allDogs;
  };
  