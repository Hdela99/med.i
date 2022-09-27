


const commentHandler = async (event) => {
  event.preventDefault();
  const title = document.getElementsByClassName(commentTitle).value;
  const body = document.getElementsByClassName(commentContents).value;
  if (title && body) {
    const commentInfo = post("")
  }
};