const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER, //* API EJEM: "5"
      primaryKey: true,
    },
    reference_image_id: {
      type: DataTypes.STRING,//*ejem:"reference_image_id": "BJa4kxc4X"
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,//*ejem: "name": "Affenpinscher",
      allowNull: false,
    },
    height: {
      type: DataTypes.JSONB, //*ejem: "height": {"imperial": "9 - 11.5",  "metric": "23 - 29"},
      allowNull: false,// con .JSONB mantengo los intervalos demedidas!!
    },
    weight: {
      type: DataTypes.JSONB, //*ejem: "weight": { "imperial": "7  -  10",  "metric": "3 - 5"},
      allowNull: false,// con .JSONB mantengo los intervalos demedidas!!
    },
    life_span: {
      type: DataTypes.JSONB,//* ejem: "life_span": "10 - 12 years",
      allowNull: false,// con .JSONB mantengo los intervalos demedidas!!
    }

  }, {timestamps: false}
  );
  return Dog;                                                                                      
};
