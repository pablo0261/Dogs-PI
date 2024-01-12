
const server = require('./src/server.js');
const { conn } = require('./src/db.js');
const express = require('express');
const  getAllTemperaments  = require('./src/Controllers/temperamentsController.js')

const app = express()
const PORT = 3001

conn.sync({ force: false })
.then(() => {
  server.listen(PORT, () => {
    console.log( `Listening on Port:${PORT}`); 
    getAllTemperaments() 
  }); 
});
   

module.exports=  app;