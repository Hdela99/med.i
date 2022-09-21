const User = require("./User");
const Comment = require("./Comment");
const Medication = require("./Medication");
const UserMedication = require("./UserMedication")

User.hasMany(Medication, {
  foreignKey: "user_id",
});

Medication.belongsToMany(User, {
  through: {
    model: UserMedication,
    foreignKey: "user_id",
    unique: false,
  },
});

module.exports = { User, Medication, Comment };
