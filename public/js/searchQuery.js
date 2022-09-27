const searchHandler = async function (event) {
  event.preventDefault();
  const query = document.querySelector("#search-input").value.trim();
  // getInteraction(query);
  // getRoutes(query);
  const routeArray = await getRoutes(query);
  const effectArray = await getAdverseEffects(query);
  console.log(effectArray);
  console.log(routeArray);
  await fetch(`/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      medication_name: query,
      adverse_effects: effectArray,
      route_of_medication: routeArray,
    }),
  });
  return query;
};

document.querySelector("#findRx").addEventListener("submit", searchHandler);

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
