const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
  }, {timestamps: false}
  );
  return Dog;                                                                                      
};