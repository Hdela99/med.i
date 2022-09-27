const { Medication } = require("../models");

const medicationData = [
  {
    medication_name: "Ibiprofen",
    adverse_effects: "chorro",
    route_of_medication: "butt",
  },
  {
    medication_name: "Lamictal",
    adverse_effects: "seeing pink elephants",
    route_of_medication: "oral",
  },
  {
    medication_name: "Adderall",
    adverse_effects: "super human speed",
    route_of_medication: "cellular absorption",
  },
  {
    medication_name: "wine",
    adverse_effects: "people are less annoying",
    route_of_medication: "anyway you can get it",
  },
  {
    medication_name: "Tylenol",
    adverse_effects: "heart arythmia",
    route_of_medication: "orally",
  },
];

const seedMedication = () => Medication.bulkCreate(medicationData);

module.exports = seedMedication;
