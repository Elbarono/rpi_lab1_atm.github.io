
let featured_products_right_arrow = document.getElementById("featured-products-arrow-right");
let featured_products_left_arrow = document.getElementById("featured-products-arrow-left");

let list = document.getElementById('featured-products-images');
let images = document.querySelectorAll('li.featured-products-image');

let stepSize = 300;
let firstEl = 0;
const visibleImgCount = 4;

featured_products_left_arrow.onclick = function() {
    if (firstEl > 0) {
        firstEl--;
        for (let li of images) {
            li.style.transform = "translateX(" + `${-stepSize * firstEl}` + "px)";
        }
    }
};
featured_products_right_arrow.onclick = function() {
    if (firstEl < images.length - visibleImgCount) {
        firstEl++;
        for (let li of images) {
            li.style.transform = "translateX(" + `${-stepSize * firstEl}` + "px)";
        }
    }
};