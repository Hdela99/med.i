const { post } = require("../../controllers/home-routes");

const commentHandler = async (event) => {
  event.preventDefault();
  const title = document.getElementsByClassName(commentTitle).value.trim();
  const body = document.getElementsByClassName(commentContents).value.trim();
  if (title && body) {
    const commentInfo = post("")
};

