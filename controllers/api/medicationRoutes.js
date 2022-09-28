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


module.exports = router;