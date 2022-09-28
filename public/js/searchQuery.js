const searchHandler = async function (event) {
  event.preventDefault();
  const query = document.querySelector("#search-input").value.trim();
  console.log(query);
  const routeArray = await getRoutes(query);
  const effectArray = await getAdverseEffects(query);
  const intArray = await getInteraction(query);
  let drug_interactions = intArray.toString();
  console.log("Drug interactions: " + typeof drug_interactions);
   let adverse_effects = effectArray.toString();
   console.log("ADVERSE TYPE: " + typeof adverse_effects);
   let route_of_medication = routeArray.toString();
   console.log("----------- ROUTE " + typeof route_of_medication);
  console.log(effectArray);
  console.log(routeArray);
  const response = await fetch('/api/medication/medName', {    
    method: "POST",
    body: JSON.stringify({
      medication_name: query,
      adverse_effects,
      route_of_medication,
    }),
    headers: {
      "Content-Type": "application/json"
    },
  })
  if(response.ok){

    console.log(query);
    console.log("Somehow got it to enter!");
  }else {
    alert("Failed to send to medication url");
  } 

  // response.then((medication_name) => {
  //   const putter =  fetch(`/api/medication/:${medication_name}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       adverse_effects,
  //       route_of_medication
  //     }),
  //   headers: {
  //     "Content-Type": "application/json"
  //   },    
  // })
  // if(putter.ok){
  //   console.log()
  // }
  // })
  return query;
};

document.querySelector("#findRx").addEventListener("submit", searchHandler);

async function getInteraction(drug) {
  let mainArray = [];
  console.log(drug);
  await fetch(
    `https://api.fda.gov/drug/label.json?&search=drug_interactions:${drug}&count=openfda.substance_name.exact&limit=10`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let testArray = data.results.map((element) => {
        return element.term;
      });
     // console.log(testArray);
      mainArray = testArray;
      return testArray; //returns array of each medicine that were reported to have adverse effects, maybe lets do the first 10-15 to not have a super long list.
    });
  return mainArray;
}

async function getRoutes(drug) {
  //returns an array of methods of medication IE oral
  let mainArray = [];
  await fetch(
    `https://api.fda.gov/drug/label.json?search=${drug}&count=openfda.route.exact&limit=5`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let routeArray = data.results.map((element) => {
        return element.term;
      });
      mainArray = routeArray;
      // console.log(mainArray); //THIS WORKS
      return routeArray;
    });

  return mainArray;
}

async function getAdverseEffects(drug) {
  //returns an array adverse effects. We should discuss how many we want to show the user.
  let mainArray = [];
  await fetch(
    `https://api.fda.gov/drug/event.json?search=${drug}&count=patient.reaction.reactionmeddrapt.exact&limit=8`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let effectArray = data.results.map((element) => {
        return element.term;
      });
      mainArray = effectArray;
     // console.log(mainArray);//THIS WORKS
      return effectArray;
    });
  return mainArray;
}
