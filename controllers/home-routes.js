const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Medication, User, Comment, UserMedication } = require('../models');

// Renders the main page
//NEEDS WITHAUTH

router.get("/", async (req, res) => {
  try {
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
