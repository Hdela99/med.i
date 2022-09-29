const { User } = require("../models");

const userData = 
  {
    first_name: "test",
    last_name: "test",
    user_name: "test",
    email: "test@test.com",
    password: "test1234",
  }
 

const seedUser = () => User.create(userData)

module.exports = seedUser
