<<<<<<< HEAD

const server = require('./src/server.js');
=======
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
>>>>>>> main
const { conn } = require('./src/db.js');
const express = require('express');
const  getAllTemperaments  = require('./src/Controllers/temperamentsController.js')

const app = express()
const PORT = 3001

<<<<<<< HEAD
conn.sync({ force: false })
.then(() => {
  server.listen(PORT, () => {
    console.log( `Listening on Port:${PORT}`); 
    getAllTemperaments() 
=======
// Syncing all the models at once.
conn.sync({ force: false })//*En tru regenera las tablas y elimina la info.
.then(() => {
  server.listen(PORT, () => {
    console.log( `Listening on Port:${PORT}`); // eslint-disable-line no-console
    getAllTemperaments() //* Esto para ejecutar y traer todos los temperaments cuando inicia la app
>>>>>>> main
  }); 
});
   

module.exports=  app;