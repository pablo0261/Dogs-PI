const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
      },
    },
    { timestamps: false }
  );
  return Temperament;
};
