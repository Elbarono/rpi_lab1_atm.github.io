function addNewProductsSlider(sliderWidth, sliderHeight, parentElement, className)
{
    let sliderContainer = addDivElement(parentElement, "slider_container", "");
    sliderContainer.style.width = sliderWidth;
    sliderContainer.style.height = sliderHeight;
    sliderContainer.style.overflow = 'hidden';
    parentElement.appendChild(sliderContainer);

    let slider = document.createElement('div');

    slider.style.display = 'flex';
    slider.style.justifyContent = 'space-between';
    slider.style.width = sliderWidth;
    slider.style.height = sliderHeight;
    //slider.style.overflow = 'hidden';
    slider.className = className;
    slider.style.transition = 'all ease 1s';
    slider.className = "new-products-images";

    sliderContainer.appendChild(slider);

    return slider;
}

function manageSliderElements(slider, imageWidth, imagesUrls, visibleNumber) {
    let sliderElements = [[], []];
    let differenceNumber = visibleNumber - imagesUrls.length;

    for(let i = 0; i < differenceNumber; i++)
    {
        imagesUrls.push(imagesUrls[i]);
    }
    let imagesNum = imagesUrls.length;
    for(let i = 0;  i < imagesNum; i++) {
        sliderElements[0].push(imagesUrls[i]);
    }
    for(let i = 0; i < imagesNum; i++)
    {
        sliderElements[1].push(addToNewProductsSlider(slider, imageWidth, imagesUrls[i]));
    }
    let margin_right;
    let margin_left;
    if(visibleNumber !== 1)
    {
        margin_right = `${Math.floor((slider.offsetWidth - sliderElements[1][0].offsetWidth*visibleNumber)/(visibleNumber - 1))}px`;
        margin_left = "0";
    }
    else
    {
        margin_right = `${Math.floor((slider.offsetWidth - sliderElements[1][0].offsetWidth)/2)}px`;
        margin_left = margin_right;
    }
    for(let i = 0; i < imagesNum; i++)
    {
        sliderElements[1][i].style.marginRight = margin_right;
        sliderElements[1][i].style.marginLeft = margin_left;
    }

    return sliderElements;
}

function addToNewProductsSlider(slider, imageWidth, imageUrl) {

    let sliderElement = document.createElement('div');
    sliderElement.style.backgroundImage = `url('${imageUrl}')`;
    sliderElement.style.minWidth = imageWidth;
    sliderElement.style.height = '100%';
    sliderElement.className = 'slider_element';

    sliderElement.style.display = 'flex';
    sliderElement.style.alignItems = 'center';
    sliderElement.style.justifyContent = 'center';

    slider.appendChild(sliderElement);
    return sliderElement;
}
function addButtons(parentElement)
{
    let element = parentElement;

    let subElement = addDivElement(element, "buttons-baby-shop");
    addSpanElement(subElement, "buttons-text", "Baby Shop", "Baby shop");

    element = addDivElement(subElement, "buttons-gift", "Whislost");
    addIElement(element, "fa-solid fa-gift");

    element = addDivElement(subElement, "buttons-cart", "Add to cart");
    addIElement(element, "fa-solid fa-shopping-cart");

    element = addDivElement(subElement, "buttons-price", "");
    addSpanElement(element, "dollar-sign", "$", "");
    addSpanElement(element, "dollar", "99.", "");
    addSpanElement(element, "cents", "00", "");
    //
    //subElement.style.transition = 'all ease 1s';
    //
    return subElement;
}

function addDivElement(parent, className, title) {
    let iElement = document.createElement('div');
    iElement.className = className;
    if(title !== "") {
        iElement.title = title;
    }
    parent.appendChild(iElement);
    return iElement;
}

function addSpanElement(parent, className, text, title) {
    let iElement = document.createElement('span');
    iElement.className = className;
    if(title !== "") {
        iElement.title = title;
    }
    iElement.textContent = text;
    if(parent !== "")
    {
        parent.appendChild(iElement);
    }
    return iElement;
}

function addIElement(parent, className) {
    let iElement = document.createElement('i');
    iElement.className = className;
    parent.appendChild(iElement);
    return iElement;
}
function slide(slider, central_buttons, sliderCentralElement, offset) {

    central_buttons.remove();
    slider.style.transform = 'translate(-'+offset+'px)';
    slider.ontransitionend = function () {
        sliderCentralElement.appendChild(central_buttons);
    }
}
let right_arrow = document.getElementById("new_products_header_right_arrow");
let left_arrow = document.getElementById("new_products_header_left_arrow");

const parentElement = document.getElementById("new-products");
const sliderClass = "new-products-slider";
const sliderWidth = '1170px';
const sliderHeight = '200px';
const visibleNumber = 3;
const imageWidth = '370px';
const imagesUrls = ["images/new_prod1.png" ,"images/new_prod2.png","images/new_prod3.png",
                    "images/new_prod1.png" ,"images/new_prod2.png","images/new_prod3.png"];


const slider = addNewProductsSlider(sliderWidth, sliderHeight, parentElement, sliderClass)
let sliderElements = manageSliderElements(slider, imageWidth, imagesUrls, visibleNumber);

let count = 0;
let sliderCentralElement = Math.floor(visibleNumber/2);
let central_buttons = addButtons(sliderElements[1][sliderCentralElement]);

let offset =  sliderElements[1][0].offsetWidth;
if(visibleNumber === 1)
{
    offset += slider.offsetWidth - sliderElements[1][0].offsetWidth;
}
else
{
    offset += Math.floor((slider.offsetWidth - sliderElements[1][0].offsetWidth*visibleNumber)/(visibleNumber - 1));
}
let currOffset = offset;

right_arrow.onclick = function () {
    if(count + visibleNumber !== imagesUrls.length) {
        count++;
        sliderCentralElement++;
        currOffset = offset*count;
        slide(slider, central_buttons, sliderElements[1][sliderCentralElement], currOffset);
    }
}
left_arrow.onclick = function () {
    if(count !== 0) {
        count--;
        currOffset = offset*count;
        sliderCentralElement--;
        slide(slider, central_buttons, sliderElements[1][sliderCentralElement], currOffset);
    }
}
