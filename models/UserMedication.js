const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class UserMedication extends Model {}

UserMedication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        unique: true,
      },
    },
    medication_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "medication",
        key: "id",
        unique: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userMedication",
  }
);

module.exports = UserMedication;
