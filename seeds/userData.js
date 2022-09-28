const { User } = require("../models");

const userData = 
// [
  {
    first_name: "test",
    last_name: "test",
    user_name: "test",
    email: "test@test.com",
    password: "test1234",
  }
  // {
  //   first_name: "Mario",
  //   last_name: "Armstrong",
  //   user_name: "kike",
  //   email: "mario@gmail.com",
  //   password: "password123",
  // },
  // {
  //   first_name: "Margot",
  //   last_name: "Cooper",
  //   user_name: "Coops",
  //   email: "margot@gmail.com",
  //   password: "password456",
  // },
  // {
  //   first_name: "Hector",
  //   last_name: "De La Cruz",
  //   user_name: "Alebrije",
  //   email: "hector@gmail.com",
  //   password: "password789",
  // },
  // {
  //   first_name: "Anthony",
  //   last_name: "To",
  //   user_name: "totoro",
  //   email: "anthony@gmail.com",
  //   password: "password101112",
  // },
  // {
  //   first_name: "Matt",
  //   last_name: "Banz",
  //   user_name: "Batzman",
  //   email: "matt@gmail.com",
  //   password: "password131415",
  // },
// ];

// const seedUser = () => User.bulkCreate(userData);

const seedUser = () => User.create(userData)

module.exports = seedUser
