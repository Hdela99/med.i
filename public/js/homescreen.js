
// Instantiate all document items
const rx = document.querySelector("#rxCabinet");
const intro = document.querySelector("#intro");
const carousel = document.querySelector("#rxCarousel")
const carouselItems = document.querySelectorAll('.carousel .carousel-item')
const smScreenItems = document.querySelector("#smallContent")


const renderIntro = () => {
    intro.classList.add('active');
}

const removeChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const main = () => {
    setTimeout(renderIntro, 10);
    if (rx) {
        setTimeout(() => rx.classList.add('active')
            , 500)
    }
}

// Configure carousel function to activate only if the screenwidth is >=1400px and if there are 4 or more items;
if (screen.width >= 1440 && carouselItems.length > 3) {

    removeChildren(smScreenItems);
    carouselItems[0].classList.add('active');

    carouselItems.forEach((el) => {

        let minPerSlide = 4
        let next = el.nextElementSibling
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = carouselItems[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })
} else {

    removeChildren(carousel);
}


main();