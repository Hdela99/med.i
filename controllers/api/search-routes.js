const router = require("express").Router();
const { Medication, User } = require("../../models");
require("dotenv").config();
//const apiKey = process.env.API_KEY;

router.get("/", (req, res) => {
  try {
    const searchData = await Medication.findAll({
      include: [
        {
          model: User,
          attributes: [
            "id",
            "medication_name",
            "adverse_effects",
            "route_of_medication",
          ],
        },
      ],
    });
    const meds = searchData.map((med) => med.get({ plain: true }));

    res.render("rx-result", {
      meds,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/:id", (req, res) => {
  //new medication search
  console.log("----------------------");
  console.log(req.body);
  Medication.create({
    medication_name: req.body.medication_name,
    adverse_effects: req.body.adverse_effects,
    route_of_medication: req.body.route_of_medication,
  }).then((medData) => {
    req.session.save(() => {
      req.session.medication_name = medData.medication_name;
      req.session.adverse_effects = medData.adverse_effects;
      req.session.route_of_medication = medData.route_of_medication;
      res.status(200).json(medData);
    });
  });
});

async function getInteraction(drug) {
  let mainArray = [];
  console.log(drug);
  await fetch(
    `https://api.fda.gov/drug/label.json?&search=drug_interactions:${drug}&count=openfda.substance_name.exact`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let testArray = data.results.map((element) => {
        return element.term;
      });
      console.log(testArray);
      mainArray = testArray;
      return testArray; //returns array of each medicine that were reported to have adverse effects, maybe lets do the first 10-15 to not have a super long list.
    });
  return mainArray;
}

async function getRoutes(drug) {
  //returns an array of methods of medication IE oral
  let mainArray = [];
  await fetch(
    `https://api.fda.gov/drug/label.json?search=${drug}&count=openfda.route.exact`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let routeArray = data.results.map((element) => {
        return element.term;
      });
      console.log(routeArray);
      mainArray = routeArray;
      return routeArray;
    });

  return mainArray;
}

async function getAdverseEffects(drug) {
  //returns an array adverse effects. We should discuss how many we want to show the user.
  let mainArray = [];
  await fetch(
    `https://api.fda.gov/drug/event.json?search=${drug}&count=patient.reaction.reactionmeddrapt.exact`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let effectArray = data.results.map((element) => {
        return element.term;
      });
      console.log(effectArray);
      mainArray = effectArray;
      return effectArray;
    });
  return mainArray;
}

module.exports = router;
