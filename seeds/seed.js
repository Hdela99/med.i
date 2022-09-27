const sequelize = require("../config/connection");
const { User, Comment, Medication } = require("../models");
const seedMedication = require("./medicationData");
const seedUser = require("./userData");
const seedComment = require("./commentData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedMedication();

  await seedComment();

  process.exit(0);
};

seedAll();
