<<<<<<< HEAD
const commentHandler = async (event) => {
  console.log("clicked");
  // event.preventDefault();
  const title = event.target[0].value.trim();
  const body = event.target[1].value.trim();
  if (title && body) {
    const commentInfo = await fetch("/api/comment-routes/", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(commentInfo);
  }
};

document.querySelector("#tacocat").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  commentHandler(event);
});
//send to backend after capture as object
=======



const commentHandler = async (event) => {
  event.preventDefault();
  const title = document.getElementsByClassName(commentTitle).value;
  const body = document.getElementsByClassName(commentContents).value;
  if (title && body) {
    const commentInfo = post("")
  }
};
>>>>>>> e62ac52fdd47b6dd9d10cab5f20a7193616b0d15
