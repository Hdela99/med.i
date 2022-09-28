const router = require("express").Router();
const withAuth = require("../utils/auth");
const apiKey = process.env.API_KEY;
require("dotenv").config();
const fetch = require("node-fetch");
// Renders the main page
//NEEDS WITHAUTH

router.get("/", withAuth, async (req, res) => {
  try {
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

router.get("/search/:drug", async (req, res) => {

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
    clinical_pharmacology: drugFxObj.clinical_pharmacology[0]
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
