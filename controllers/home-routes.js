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
    // console.log(userMedicine)
    console.log(medicine)
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
//NEEDS WITHAUTH

// router.get("/search", async (req, res) => {
//   try {
//     res.render("search", {
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/search", async (req, res) => {
  try {

    res.render("search", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//NEEDS WITHAUTH

// Search Route for finding information from openFDA API
router.get("/search/:drug", withAuth, async (req, res) => {

  let drug = req.params.drug;
  let apiKey = process.env.API_KEY;
  let url = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=description:${drug}`;

  const drugFx = await fetch(url).then((res) => {
    return res.json();
  });

  const drugFxObj = { ...drugFx.results[0] };

  const meds = {
    medication_name: drugFxObj.openfda.generic_name[0],
    adverse_effects: drugFxObj.adverse_reactions[0],
    route_of_medication: drugFxObj.openfda.route[0],
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

router.get("/results", async (req, res) => {
  try {

    res.render("results", {
      med,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//NEEDS WITHAUTH
router.get("/alerts", async (req, res) => {
  try {
    res.render("alerts", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/COMMENTTEST", async (req, res) => {
  try {
    // const testData = await Comment.findAll()
    // console.log(testData)

    // res.render("rx", {
    //   // loggedIn: req.session.loggedIn
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// View specific drug
router.get('/drug/:id', async (req, res) => {
  try {

    // const testData = await Comment.findAll()
    // // {
    //   // include: [{model: Medication}]
    // // })

    const medicationData = await Medication.findByPk(req.params.id, {
      include: [{
        model: Comment, include: [{
          model: User,
          attributes: ['user_name']
        }]
      }]
    });


    const meds = medicationData.get({ plain: true })

    // console.log(meds)

    const comments = meds.comments;
    delete meds.comments
    comments.forEach(element => {element.user = element.user.user_name})
    

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
