import {
  getInteraction,
  getRoutes,
  getAdverseEffects,
} from "../../controllers/api/search-routes.js";
const searchHandler = async function (event) {
  event.preventDefault();
  const query = document.querySelector("#search-input").value.trim();
  // getInteraction(query);
  // getRoutes(query);
  const routeArray = await getRoutes(query);
  const effectArray = await getAdverseEffects(query);
  console.log(effectArray);
  console.log(routeArray);
  await fetch(`/api/search-routes`, {
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
