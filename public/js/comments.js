


const commentHandler = async (event) => {
  const comment = event.target[0].value;
  const medication_id = document.getElementById("rx-id").dataset.value;

  if (comment) {
    const commentResponse = await fetch("/api/comment/", {
      method: "POST",
      body: JSON.stringify({ comment, medication_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (commentResponse.ok) {
      document.location.reload();
    } else {
      alert("Comment Failure!");
    }


  }
};

document.querySelector("#tacocat").addEventListener("submit", (event) => {
  event.preventDefault();

  commentHandler(event);
});
//send to backend after capture as object
