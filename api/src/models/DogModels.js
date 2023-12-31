const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false,
    },
    reference_image_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "api/src/Utils/Dog Shadow.jpg"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    heightMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weightMin: {
      type: DataTypes.INTEGER, //*ejem: "weight": { "imperial": "7  -  10",  "metric": "3 - 5"},
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.INTEGER, //*ejem: "weight": { "imperial": "7  -  10",  "metric": "3 - 5"},
      allowNull: false,
    },
    life_span: {
      type: DataTypes.JSONB,//* ejem: "life_span": "10 - 12 years",
      allowNull: false,// con .JSONB mantengo los intervalos demedidas!!
    }

  }, {timestamps: false}
  );
  return Dog;                                                                                      
};