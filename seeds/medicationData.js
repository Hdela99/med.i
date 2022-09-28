const { Medication } = require("../models");

const medicationData = [
  {
    medication_name: "Ibiprofen",
    adverse_effects: "chorro",
    route_of_medication: "butt",
    drug_interactions: "None",
    description: "There is no description for now"
  },
  {
    medication_name: "Lamictal",
    adverse_effects: "seeing pink elephants",
    route_of_medication: "oral",
    drug_interactions: "potatoes",
    description: "There is no description for now"

  },
  {
    medication_name: "Adderall",
    adverse_effects: "super human speed",
    route_of_medication: "cellular absorption", 
    drug_interactions: "grapefruit",
    description: "There is no description for now"

  },
  {
    medication_name: "wine",
    adverse_effects: "people are more annoying",
    route_of_medication: "anyway you can get it", 
    drug_interactions: "grapefruit",
    description: "There is no description for now"

  },
  {
    medication_name: "Tylenol",
    adverse_effects: "heart arythmia",
    route_of_medication: "orally",
     drug_interactions: "grapefruit",
    description: "There is no description for now"

  },
];

const seedMedication = () => Medication.bulkCreate(medicationData);

module.exports = seedMedication;
