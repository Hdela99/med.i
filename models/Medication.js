const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Medication extends Model { }

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
      unique: true,
    },
    adverse_effects: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    route_of_medication: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue: "routeHolder",
    },
    drug_interactions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
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
