require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const DogModels = require("./models/DogModels");
const TemperamentsModels = require("./models/TemperamentsModels");


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});

//* Definicion de modelos a usar
DogModels(sequelize)
TemperamentsModels(sequelize)

//*Relaciones de tb muchos a muchos
const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, { through: 'DogsTemperaments'});

Temperament.belongsToMany(Dog, { through: 'DogsTemperaments'})


module.exports = {
  Dog,
  Temperament,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};