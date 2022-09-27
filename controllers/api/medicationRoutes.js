const router = require("express").Router();
const { Medication, User, Comment, UserMedication } = require("../../models");
require("dotenv").config();
const fetch = require("node-fetch");
const apiKey = process.env.API_KEY;
//the below get request works 09/27/22
router.get("/", async (req, res) => {
  try {
    const medData = await Medication.findAll();
    res.status(200).json(medData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const drugName = req.body.medication_name;
  const effURL = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=${drugName}&count=patient.reaction.reactionmeddrapt.exact&limit=8`;
  const routesURL =  `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=${drugName}&count=openfda.route.exact`;
  const drugIntURL = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=drug_interactions:${drugName}&count=openfda.substance_name.exact`;

  const newMed = await Medication.create({
    medication_name: req.body.medication_name,
    adverse_effects: req.body.adverse_effects,
    route_of_medication: req.body.route_of_medication,
  }).then((dbMedData) => {
    req.session.save(() => {
      req.session.medication_name = dbMedData.medication_name;
      req.session.adverse_effects = dbMedData.adverse_effects;
      req.session.route_of_medication = dbMedData.route_of_medication;

      res.json(dbMedData);
    });
  });
});

//the below get request works. 09/27/22
//This works by MEDICATION NAME not ID!!!
router.get('/:medication_name', (req, res) => {
  Medication.findOne({
    where: {
      medication_name: req.params.medication_name,
    },
  }).then((medData) => {
    if(!medData){
      res.status(404).json({message: "No medicine by that name has been searched up yet. Try searching it up! "});
      return;
    }
    res.json(medData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
})


module.exports = router;