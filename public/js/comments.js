


const commentHandler = async (event) => {
  const comment = event.target[0].value;
  const medication_id = document.getElementById("rx-name").dataset.value;

  if (comment) {
    const commentInfo = await fetch("/api/comment/", {
      method: "POST",
      body: JSON.stringify({ comment, medication_id }),
      headers: { "Content-Type": "application/json" },
    });

  }
};

document.querySelector("#tacocat").addEventListener("submit", (event) => {
  event.preventDefault();

  commentHandler(event);
});
//send to backend after capture as object
