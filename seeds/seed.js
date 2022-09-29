const sequelize = require("../config/connection");
const { User, Comment, Medication, UserMedication } = require("../models");
const seedMedication = require("./medicationData");
const seedUser = require("./userData");
const seedComment = require("./commentData");
const seedUserMedication = require("./userMedication")

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedMedication();
  await seedComment();
  await seedUserMedication();

  process.exit(0);
};

seedAll();
