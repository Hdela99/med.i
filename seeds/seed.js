const sequelize = require("../config/connection");
const { User, Comment, Medication } = require("../models");

const userData = require("./user.json");
const commentData = require("./comment.json");
const medicationData = require("./medication.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    //     for (const medication of medicationData) {
    //       await Medication.create({
    //         ...medication,
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //       });
    //     }
  }

  process.exit(0);
};

seedDatabase();
