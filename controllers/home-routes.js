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
  let apiKey = process.env.API_KEY;
  let url = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=description:"${drug}"`;
  const drugFx = await fetch(url).then((res) => {
    return res.json();
  });

  const drugFxObj = { ...drugFx.results[0] };

// Instantiating variables for tests on whether a specific property exists in openFDA API
  let route, generic_name, adverse_reactions, product_type, clinical_pharmacology, drug_interactions, description;
  let routeTest = drugFxObj.openfda.route;
  let nameTest = drugFxObj.openfda.generic_name
  let reactionsTest = drugFxObj.adverse_reactions
  let typeTest = drugFxObj.openfda.product_type
  let pharmacologyTest = drugFxObj.clinical_pharmacology
  let interactionsTest = drugFxObj.drug_interactions
  let descriptionTest = drugFxObj.description

  // Handling in the event a specific property doesn't exist within openFDA API

  if (routeTest == undefined) {
    route = "N/A"
  } else {
    route = drugFxObj.openfda.route[0]
  }
  
  if (nameTest == undefined) {
    generic_name = "N/A"
  } else {
    generic_name = drugFxObj.openfda.generic_name[0]
  }
  
  if (reactionsTest == undefined) {
    adverse_reactions = "N/A"
  } else {
    adverse_reactions = drugFxObj.adverse_reactions[0]
  }

  if (typeTest == undefined) {
    product_type = "N/A"
  } else {
    product_type = drugFxObj.openfda.product_type[0]
  }

  if (pharmacologyTest == undefined) {
    clinical_pharmacology = "N/A"
  } else {
    clinical_pharmacology = drugFxObj.clinical_pharmacology[0]
  }

  if (interactionsTest == undefined) {
    drug_interactions = "N/A"
  } else {
    drug_interactions = drugFxObj.drug_interactions[0]
  }
  
  if (descriptionTest == undefined) {
    description = "N/A"
  } else {
    description = drugFxObj.description[0]
  }


  const meds = {
    medication_name: generic_name,
    adverse_effects: adverse_reactions,
    route_of_medication: route,
    product_type: product_type,
    clinical_pharmacology: clinical_pharmacology,
    drug_interactions: drug_interactions,
    description: description
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
