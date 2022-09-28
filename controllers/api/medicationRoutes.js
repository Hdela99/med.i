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
// Returns only medicaiton names
router.get('/medName', async (req, res) => {
  try {
    const medData = await Medication.findAll({
      attributes: { exclude: ['id', 'adverse_effects', 'route_of_medication'] },
      order: [['medication_name', 'DESC']]
    });
    console.log("you found medName")
    res.status(200).json(medData);
  } catch (err) {
    res.status(500).json(err);
  }
})


//Not finalized yet 9/27/22 146pm
router.post('/medName', async (req, res) => {
  const newMedName = await Medication.create(req.body);
  console.log(newMedName);
  const drugName = req.body.medication_name;
  const effURL = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=${drugName}&count=patient.reaction.reactionmeddrapt.exact&limit=8`;
  const routesURL = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=${drugName}&count=openfda.route.exact&limit=7`;
  const drugIntURL = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=drug_interactions:${drugName}&count=openfda.substance_name.exact&limit=10`;
  try {
    console.log(drugName);
    res.status(200).json(drugName);
  } catch (err) {
    res.status(500).json(err);
  }
});

//The below route works in insomnia. How do i get it to work outside of it tho.
router.put('/:medication_name', async (req, res) => {
  const medication_name = req.params.medication_name;
  console.log("LOGGING NAME _____----___---")
  console.log(medication_name);
  try {
    const medData = await Medication.update(req.body, {
      where: { medication_name: req.params.medication_name }
    })
    if (!medData[0]) {
      res.status(404).json({ message: "no medicine by that name" });
      return
    };
    res.status(200).json({ message: `successfully updated  ${req.params.medication_name}` })
  } catch (err) {
    res.status(500).json(err);
  }
});


// The following route is to handle any searches on the page
router.post("/", async (req, res) => {

  try {
    const searchedMed = req.body.medication_name

    let existingMedData = await Medication.findAll()
    let existingMeds = existingMedData.map(med => med.get({ plain: true }).medication_name)



    if (!existingMeds.includes(searchedMed)) {
      console.log('----------if----------')
      const newMed = await Medication.create(req.body)
      console.log(newMed)
      const userMedi = await UserMedication.create({
        user_id: req.session.userID,
        medication_id: newMed.dataValues.id
      })
      console.log(userMedi)

      res.status(200).json(userMedi)
    } else {
      console.log('----------else----------')
      const existingMed = await Medication.findAll({
        where: {
          medication_name: searchedMed,
        }
      })
      console.log(existingMed)

      const userMedi = await UserMedication.create({
        user_id: req.session.userID,
        medication_id: existingMed[0].dataValues.id
      })
      console.log(userMedi)

      res.status(200).json(userMedi)


    }


  }
  catch (err) {
    console.log(err)
    
    res.status(500).json(err)
  }
});

router.post("/userMedication", async (req, res) => {
  try {
    const newUserMedication = await UserMedication.create(req.body)
    res.status(200).json(newUserMedication)
  } catch (err) {
    res.status(500).json(err)

  }


})

//the below get request works. 09/27/22
//This works by MEDICATION NAME not ID!!!
router.get('/:medication_name', (req, res) => {
  Medication.findOne({
    where: {
      medication_name: req.params.medication_name,
    },
  }).then((medData) => {
    if (!medData) {
      res.status(404).json({ message: "No medicine by that name has been searched up yet. Try searching it up! " });
      return;
    }
    res.json(medData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
})


module.exports = router;