const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
<<<<<<< HEAD
  const Temperament = sequelize.define(
    "Temperament",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
=======
const Temperament = sequelize.define(
    "Temperament",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
>>>>>>> main
      },
    },
    { timestamps: false }
  );
  return Temperament;
<<<<<<< HEAD
};
=======
};
>>>>>>> main
