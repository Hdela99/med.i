const router = require("express").Router();
const withAuth = require("../utils/auth");
<<<<<<< HEAD
const { Medication, User, Comment, UserMedication } = require('../models');

=======
const apiKey = process.env.API_KEY;
require("dotenv").config();
const fetch = require("node-fetch");
>>>>>>> HectorsTesterbranch
// Renders the main page
//NEEDS WITHAUTH

router.get("/", withAuth, async (req, res) => {
  try {
<<<<<<< HEAD
    console.log(req.session.userID);
    const personalMedicine = await User.findByPk(req.session.userID, {
      include: [{
        model: Medication,
        through: UserMedication
      }]
    });
    const pMedicine = personalMedicine.medications.map(rx => rx.get({ plain: true }));
    console.log(pMedicine)
    res.render("home", {
      pMedicine,
=======
    // const medicineData = await Medicine.findAll({
    //   order: [['post_date', 'DESC']],
    //   include: [{
    //     model: User,
    //     as: 'user',
    //     attributes: ['username']
    //   },
    //   {
    //     model: Comment,
    //   }
    //   ]
    // });
    // const medicine = medicineData.map(post => post.get({ plain: true }));
    res.render("home", {
      // medicine,
>>>>>>> HectorsTesterbranch
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
    // FE JS takes the input queries, processes using the search-routes we have established
    let drug = req.body.drug;
    let url = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=ibuprofen&count=patient.reaction.reactionmeddrapt.exact&limit=10`;

    // Formatting data
    const drugFx = await fetch(url).then((res) => {
      return res.json();
    });
    // let drugFxArr = drugFx.results.map((element) => {
    //   return element.term;
    // });

    let drugFxArr = drugFx.results;
    console.log(drugFxArr);
    // Passes it to the res.render for whatever our results should look like
    res.render("search", {
      drugFxArr,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//NEEDS WITHAUTH

router.get("/results", async (req, res) => {
  try {
    res.render("results", {
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
    res.render("rx", {
      // loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// View specific drug
router.get('/drug/:id', withAuth, async (req, res) => {
  try {
    res.render('rx', {
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
