

const rx = document.querySelector("#rxCabinet");
const intro = document.querySelector("#intro");

const renderIntro = () => {
    intro.classList.add('active');
}

const renderRx = () => {
    rx.classList.add('active');
}

const underline = () => {
    rx.classList.add('active');
}

const main = () => {
    setTimeout(renderIntro, 10);
    setTimeout(renderRx, 500)
}


main();