

//!NUEVO ALLDOGS

const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { dogObj } = require("../Helpers");

const getDbDogs = async () => {//*Todos los perros de db y API
  const arrDbDogs = [];
  try {
    const dbDogs = await Dog.findAll({
      include: [{
        model: Temperament,
        as:'temperaments',
        attributes: ['temperaments'],
      }],
    })
      dbDogs.forEach(dog => {
        arrDbDogs.push(dogObj(dog))
 });
return arrDbDogs;
} catch (error) {
  console.log('Error en el servicio de dogs')
  };
  };

  const getApiDogs = async () => {   
    try {
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      const arrApiDogs = [];
  
      response.data.forEach(dog => {
        arrApiDogs.push(dogObj(dog))
      });
      return arrApiDogs;
    } catch (error) {
      console.log('Error en el servicio de api');
      }    
    }  
    

    const getAllDogs = async () => {
      const arrDbDogs = await getDbDogs();
      const arrApiDogs = await getApiDogs();
      const allDogs = [...arrApiDogs, ...arrDbDogs];
      return allDogs;
    };
