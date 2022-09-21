const fetch = require(`node-fetch`);
var APIkey = "EEMqkuqHACLyxrKVimScECwbzR5PNHHab9HyTmZo";
fetch(
  `https://api.fda.gov/drug/event.json?api_key=EEMqkuqHACLyxrKVimScECwbzR5PNHHab9HyTmZo&search=patient.reaction.reactionmeddrapt:"fatigue"&limit=1`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

async function getData() {
  try {
    const response = await fetch(
      `https://api.fda.gov/drug/event.json?api_key=${APIkey}&search=patient.reaction.reactionmeddrapt:"fatigue"&limit=1`
    );

    if (!response.ok) {
      throw new Error(`ERROR! you done messed up: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

getData();
