const router = require("express").Router();
const withAuth = require('../utils/auth');

// Renders the main page

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
    // const posts = postData.map(post => post.get({ plain: true }));
    res.render("home", {
      loggedIn: req.session.loggedIn
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
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/results", withAuth, async (req, res) => {
  try {
    res.render("results", {
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/alerts", withAuth, async (req, res) => {
  try {
    res.render("alerts", {
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// View specific drug
// router.get('/drug/:id', withAuth, async (req, res) => {
//     try {

//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router;
