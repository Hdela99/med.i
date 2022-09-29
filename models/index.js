const User = require("./User");
const Comment = require("./Comment");
const Medication = require("./Medication");

const UserMedication = require("./UserMedication");

User.belongsToMany(Medication, {
  through: {
    model: UserMedication,
    foreignKey: "user_id",
    unique: false,
  },
});

Medication.belongsToMany(User, {
  through: {
    model: UserMedication,
    foreignKey: "medication_id",
    unique: false,
  },
});

Medication.hasMany(Comment, {
  foreignKey: "medication_id",
});

Comment.belongsTo(Medication, {
  foreignKey: "medication_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Medication, Comment, UserMedication };
