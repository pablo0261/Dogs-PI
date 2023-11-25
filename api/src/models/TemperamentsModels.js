const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
const Temperament = sequelize.define(
    "Temperament",
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Temperament;
};
