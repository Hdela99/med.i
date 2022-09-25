const router = require("express").Router();
const { Medication, User } = require("../../models");

router.post("/", (req, res) => {
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
module.exports = router;
