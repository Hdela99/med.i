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
      console.log(data);
      console.log(data.results[0].patient.drug);
    });
}

async function getInteraction(drug) {
  const response = await fetch(
    `https://api.fda.gov/drug/label.json?api_key=${APIkey}&search=drug_interactions:${drug}&count=openfda.substance_name.exact`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results.length);
      for (i = 0; i < data.results.length; i++) {
        console.log(data.results[i].term);
      }
      console.log(typeof data.results);
    });
}
getData();
getInteraction("ibuprofen");