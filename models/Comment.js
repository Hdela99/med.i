const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      references: {
        model: "user",
        key: "id",
        // unique: true,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
