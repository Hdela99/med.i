const { UserMedication } = require("../models");

const userMedicationData = [
  {
    user_id: 1,
    medication_id: 1,
  },
  {
    user_id: 1,
    medication_id: 2,
  },
  {
    user_id: 1,
    medication_id: 3,
  },
  {
    user_id: 1,
    medication_id: 4,
  },
  {
    user_id: 1,
    medication_id: 5,
  },
];

const seedUserMedication = () => UserMedication.bulkCreate(userMedicationData);

module.exports = seedUserMedication;
