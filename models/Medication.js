const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Medication extends Model {}

Medication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    medication_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adverse_effects: {
      type: DataTypes.ARRAY,
      allowNull: false,
    },
    route_of_medication: {
      type: DataTypes.ARRAY,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "medication",
  }
);

module.exports = Medication;
