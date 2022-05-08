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
    slider.className = className;
    slider.style.transition = 'all ease 0.5s';
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
    slider.appendChild(sliderElement);

    let blackBackground = document.createElement('div');
    blackBackground.style.backgroundColor = 'black';
    blackBackground.style.width = '100%';
    blackBackground.style.height = '100%';
    blackBackground.className = 'black_background';
    blackBackground.style.transition = 'background-color 0.5s';

    blackBackground.style.display = 'flex';
    blackBackground.style.alignItems = 'center';
    blackBackground.style.justifyContent = 'center';

    blackBackground.style.backgroundColor = 'transparent';
    sliderElement.appendChild(blackBackground);

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


function slide(slider, central_buttons, blackParent, offset) {

    central_buttons.remove();
    slider.style.transform = 'translate(-'+offset+'px)';
    slider.ontransitionend = function () {
        blackParent.style.backgroundColor = 'rgba(54, 42, 79, 0.85)';
        blackParent.appendChild(central_buttons);
    }
}
function searchBlack(sliderCentralElement) {
    let children = sliderCentralElement.childNodes;
    let i = 0;
    while(i < children.length && children[i].className !== 'black_background')
    {
        i++;
    }
    return children[i];
}

let right_arrow = document.getElementById("new_products_header_right_arrow");
let left_arrow = document.getElementById("new_products_header_left_arrow");

const parentElement = document.getElementById("new-products");
const sliderClass = "new-products-slider";
const sliderWidth = '1170px';
const sliderHeight = '200px';
const visibleNumber = 3;
const imageWidth = '370px';
const imagesUrls = ["images/new_prod1.png" ,"images/new_prod22.png","images/new_prod3.png",
                    "images/new_prod1.png" ,"images/new_prod22.png","images/new_prod3.png"];


const slider = addNewProductsSlider(sliderWidth, sliderHeight, parentElement, sliderClass)
let sliderElements = manageSliderElements(slider, imageWidth, imagesUrls, visibleNumber);

let count = 0;
let sliderCentralElement = Math.floor(visibleNumber/2);

let blackParent = searchBlack(sliderElements[1][sliderCentralElement]);
blackParent.style.backgroundColor = 'rgba(54, 42, 79, 0.85)';
let central_buttons = addButtons(blackParent);

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
        blackParent = searchBlack(sliderElements[1][sliderCentralElement]);
        blackParent.style.background = 'transparent';

        count++;
        currOffset = offset*count;

        sliderCentralElement++;
        
        blackParent = searchBlack(sliderElements[1][sliderCentralElement]);
        slide(slider, central_buttons, blackParent, currOffset);
    }
}
left_arrow.onclick = function () {
    if(count > 0) {
        blackParent = searchBlack(sliderElements[1][sliderCentralElement]);
        blackParent.style.backgroundColor = 'transparent';

        count--;
        currOffset = offset*count;

        sliderCentralElement--;

        blackParent = searchBlack(sliderElements[1][sliderCentralElement]);
        slide(slider, central_buttons, blackParent, currOffset);
    }
}
