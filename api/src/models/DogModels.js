const { DataTypes } = require('sequelize');
<<<<<<< HEAD

module.exports = (sequelize) => {
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
=======
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID, //* API EJEM: "5" 
>>>>>>> main
      defaultValue : DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false,
    },
    reference_image_id: {
<<<<<<< HEAD
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "api/src/Utils/DogShadow.jpg"
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
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    life_span: {
      type: DataTypes.JSONB,
      allowNull: false,
    }
=======
      type: DataTypes.STRING,//*ejem:"reference_image_id": "BJa4kxc4X"
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,//*ejem: "name": "Affenpinscher",
      allowNull: false,
    },
    heightMin: {
      type: DataTypes.INTEGER, //*ejem: "height": {"imperial": "9 - 11.5",  "metric": "23 - 29"},
      allowNull: false,
    },
    heightMax: {
      type: DataTypes.INTEGER, //*ejem: "height": {"imperial": "9 - 11.5",  "metric": "23 - 29"},
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

>>>>>>> main
  }, {timestamps: false}
  );
  return Dog;                                                                                      
};