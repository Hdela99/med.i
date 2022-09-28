const searchHandler = function (event) {
    event.preventDefault();
    const query = document.querySelector("#search-input").value.trim();

    location.pathname = `/search/${query}`

};

document.querySelector("#findRx").addEventListener("submit", searchHandler);
