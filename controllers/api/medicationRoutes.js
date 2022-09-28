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
//THIS WORKS 09/27/22 gets the med name that is posted in searchQuery.js line 13
router.get('/medName', async (req,res) => {
  try {
    const medData = await Medication.findAll({
      attributes: {exclude: ['id', 'adverse_effects', 'route_of_medication']},
      order: [['medication_name', 'DESC']]});
    console.log("you found medName")
    res.status(200).json(medData);
  } catch (err) {
    res.status(500).json(err);
  }
})
//Not finalized yet 9/27/22 146pm
router.post('/medName', async (req,res) => {
  const newMedName = await Medication.create(req.body);
  console.log(newMedName);
  const drugName = req.body.medication_name;
  const effURL = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=${drugName}&count=patient.reaction.reactionmeddrapt.exact&limit=8`;
  const routesURL =  `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=${drugName}&count=openfda.route.exact&limit=7`;
  const drugIntURL = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=drug_interactions:${drugName}&count=openfda.substance_name.exact&limit=10`;
  try{
    console.log(drugName);
    res.status(200).json(drugName);
  }catch(err) {
    res.status(500).json(err);
  }
});
//The below route works in insomnia. How do i get it to work outside of it tho.
router.put('/:medication_name', async(req, res) => {
  const medication_name = req.params.medication_name;
  console.log("LOGGING NAME _____----___---")
  console.log(medication_name);
    try {
      const medData = await Medication.update(req.body, {
        where: {medication_name: req.params.medication_name }
      })
      if(!medData[0]) {
        res.status(404).json({message: "no medicine by that name"});
        return
      };
      res.status(200).json({message: `successfully updated  ${req.params.medication_name}`})
    }catch(err) {
      res.status(500).json(err);
    }
})


router.post("/", async (req, res) => {
  const drugName = req.body.medication_name;
  const effURL = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=${drugName}&count=patient.reaction.reactionmeddrapt.exact&limit=8`;
  const routesURL =  `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=${drugName}&count=openfda.route.exact&limit=7`;
  const drugIntURL = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=drug_interactions:${drugName}&count=openfda.substance_name.exact&limit=10`;

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