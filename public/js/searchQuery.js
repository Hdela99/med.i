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
  if (response.ok) {

    console.log(query);
    console.log("Somehow got it to enter!");
  } else {
    alert("Failed to send to medication url");
  }

  return query;
};

document.querySelector("#findRx").addEventListener("submit", searchHandler);
