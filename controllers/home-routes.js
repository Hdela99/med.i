const router = require("express").Router();
const withAuth = require("../utils/auth");
const apiKey = process.env.API_KEY;
require("dotenv").config();
const fetch = require("node-fetch");

const { Medication, User, UserMedication, Comment } = require('../models')

// Renders the main page
//NEEDS WITHAUTH

router.get("/", withAuth, async (req, res) => {
  try {
    const userMedicine = await User.findByPk(req.session.userID, {
      include: [{ model: Medication, through: UserMedication }]
    });
    const medicine = userMedicine.medications.map(medicine => medicine.get({ plain: true }));

    res.render("home", {
      medicine,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/search", withAuth, async (req, res) => {
  try {
    res.render("search", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Search Route for finding information from openFDA API
router.get("/search/:drug", withAuth, async (req, res) => {

  let drug = req.params.drug;
  console.log(drug)
  let apiKey = process.env.API_KEY;
  let url = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=description:${drug}`;

  const drugFx = await fetch(url).then((res) => {
    return res.json();
  });

  const drugFxObj = { ...drugFx.results[0] };
  // console.log(drugFxObj)

  // Need to fix to account for situations if the data doesn't exist
  let medication_name = drugFxObj.openfda.generic_name[0];
  let effects = drugFxObj.adverse_reactions[0];
  let route = (!drugFxObj.openfda.route[0] == undefined) ? drugFxObj.openfda.route[0] : "N/A";
  let type = drugFxObj.openfda.product_type[0];
  let pharmacology = drugFxObj.clinical_pharmacology[0];
  let interactions = drugFxObj.drug_interactions[0];
  let desc = drugFxObj.description[0];

  console.log(route)

  const meds = {
    medication_name: drugFxObj.openfda.generic_name[0],
    adverse_effects: drugFxObj.adverse_reactions[0],
    route_of_medication: drugFxObj.openfda.route[0] || "N/A",
    product_type: drugFxObj.openfda.product_type[0],
    clinical_pharmacology: drugFxObj.clinical_pharmacology[0],
    drug_interactions: drugFxObj.drug_interactions[0],
    description: drugFxObj.description[0]
  }

  res.render("results", {
    meds,
    loggedIn: req.session.loggedIn,
  });
})


//NEEDS WITHAUTH
router.get("/alerts", async (req, res) => {
  try {
    let alertsArr = [];
    const userData = await User.findByPk(req.session.userID, {
      include: [{ model: Medication, through: UserMedication }]
    });

    let userMeds = userData.medications.map(medicine => medicine.get({ plain: true }))
    userMeds = userMeds.map(element => element.medication_name)


    await Promise.all(
      userMeds.map(async (drug) => {
        const response = await fetch(`https://api.fda.gov/drug/enforcement.json?api_key=${process.env.API_KEY}&search=openfda.generic_name:"${drug}"`).then((res) => { return res.json() })
        if (!response.error) {

          alertsArr.push(response)
        }
      })
    )

    console.log(alertsArr[0].results)

    // const recalledDrugs = alertsArr.forEach(element => )


    // userMeds.forEach(async (element, index) => {
    //   try {
    //     const url = `https://api.fda.gov/drug/enforcement.json?api_key=${process.env.API_KEY}&search=openfda.generic_name:"${element}"`
    //     const alertResponse = await fetch(url)


    //     if (alertResponse.ok) {
    //       alertsArr.push(alertResponse)
    //     } 
    //     console.log(alertsArr)

    //   } catch (err) {
    //     console.log(err)
    //   }

    //   console.log(`--------------${index}----------`)
    // })



    res.render("alerts", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// View specific drug
router.get('/drug/:id', async (req, res) => {
  try {


    const medicationData = await Medication.findByPk(req.params.id, {
      include: [{
        model: Comment, include: [{
          model: User,
          attributes: ['user_name']
        }]
      }]
    });


    const meds = medicationData.get({ plain: true })


    const comments = meds.comments;
    delete meds.comments
    comments.forEach(element => { element.user = element.user.user_name })


    res.render('rx', {
      meds,
      comments,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
