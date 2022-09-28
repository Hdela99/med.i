const router = require("express").Router();
const { Medication, User } = require("../../models");
require("dotenv").config();
const fetch = require("node-fetch");
const apiKey = process.env.API_KEY;


// Gets all medications from the DB
router.post("/", async (req, res) => {
  try {


    res.render("./results", {
      meds,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// The drug route is used to pull drug interactions from the openFDA database
router.get("/interactions", async (req, res) => {
  try {
    let drug = req.body.drug;
    let url = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=drug_interactions:${drug}&count=openfda.substance_name.exact&limit=10`;
    const drugInteractions = await fetch(url).then((res) => {
      return res.json();
    });
    let drugIArr = drugInteractions.results.map((element) => {
      return element.term;
    });

    res.status(200).json(drugIArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route finds all routes of intake for the drug
router.get("/routes", async (req, res) => {
  try {
    let drug = req.body.drug;
    let url = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=${drug}&count=openfda.route.exact&limit=10`;

    const drugRoute = await fetch(url).then((res) => {
      return res.json();
    });
    console.log(drugRoute);
    let drugRouteArr = drugRoute.results.map((element) => {
      return element.term;
    });
    res.status(200).json(drugRouteArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route gets adverse effects for the user to know issues with taking the medication
router.get("/effects", async (req, res) => {
  try {
    let drug = req.body.drug;
    let url = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=${drug}&count=patient.reaction.reactionmeddrapt.exact&limit=10`;

    const drugFx = await fetch(url).then((res) => {
      return res.json();
    });
    let drugFxArr = drugFx.results.map((element) => {
      return element.term;
    });
    res.status(200).json(drugFxArr);
  } catch (err) {
    res.status(500).json(err);
  }
});



// This route gets recalls
router.get("/recall", async (req, res) => {
  try {
    let drugname = req.body.drug || "Dexmedetomidine";
    let url = `https://api.fda.gov/drug/enforcement.json?search=product_description:${drugname}`

    const recalls = await fetch(url).then((res) => {
      return res.json();
    })

    const recallsObj = recalls.results
    console.log(recallsObj)

    res.status(200).json(recallsObj)
  } catch (err) {
    res.status(500).json(err)
  }


})

module.exports = router;
