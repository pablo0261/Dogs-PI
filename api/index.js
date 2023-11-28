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
const { conn } = require('./src/db.js');
const express = require('express');
const { getTemperamentsHandler } = require('./src/Handlers/TemperamentsHandler.js')

const app = express()
const PORT = 3001

// Syncing all the models at once.
conn.sync({ force: false })//*En tru regenera las tablas y elimina la info.
.then(() => {
  // getTemperamentsHandler();//* Esto para ejecutar y traer todos los temperaments cuando inicia la app
  server.listen(PORT, () => {
  console.log( `Listening on Port:${PORT}`); // eslint-disable-line no-console
  }); 
});


module.exports=  app;