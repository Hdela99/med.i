require("dotenv").config();
const fetch = require(`node-fetch`);
var APIkey = process.env.API_KEY;

async function getData() {
  const response = await fetch(
    `https://api.fda.gov/drug/event.json?api_key=${APIkey}&search=patient.reaction.reactionmeddrapt:"fatigue"&limit=1`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      brandName = data.results[0].patient.drug[0].medicinalproduct;
      generic = data.results[0].patient.drug[0].openfda.generic_name;
      const medObject = {
        "Generic Name: ": generic,
        "Brand Name: ": brandName,
      };
      console.log("Generic: " + generic.toString());
      console.log("Brand: " + brandName);
    });
}

async function getInteraction(drug) {
  await fetch(
    `https://api.fda.gov/drug/label.json?api_key=${APIkey}&search=drug_interactions:${drug}&count=openfda.substance_name.exact`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let testArray = data.results.map((element) => {
        return element.term;
      });
      console.log(testArray);
    });
}
//getData();

getInteraction("hydrocodone");

module.exports = { getData, getInteraction };
