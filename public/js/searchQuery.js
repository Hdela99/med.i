const searchHandler = async function (event) {
  event.preventDefault();
  const queryEl = document.querySelector("#search-input").value.trim();
  getInteraction(queryEl);
  getRoutes(queryEl);
  getAdverseEffects(queryEl);
  const response = await fetch(`/api/searchQuery`, {
    method: "POST",
    body: JSON.stringify({
      medication_name: queryEl,
      adverse_effects: effectArray,
      route_of_medication: routeArray,
    }),
  });
  return queryEl;
};

document.querySelector("#findRx").addEventListener("submit", searchHandler);

async function getInteraction(drug) {
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
      return testArray; //returns array of each medicine that were reported to have adverse effects, maybe lets do the first 10-15 to not have a super long list.
    });
}

async function getRoutes(drug) {
  //returns an array of methods of medication IE oral
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
      return routeArray;
    });
}

async function getAdverseEffects(drug) {
  //returns an array adverse effects. We should discuss how many we want to show the user.
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
      return effectArray;
    });
}
