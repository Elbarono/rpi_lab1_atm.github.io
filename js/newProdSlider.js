let right_arrow = document.getElementById("new_products_header_right_arrow");
let left_arrow = document.getElementById("new_products_header_left_arrow");
right_arrow.onclick = function () {
    alert('right arrow clicked!');
}
left_arrow.onclick = function () {
    alert('left arrow clicked!');
}
function lazyAddSlider(sliderId, sliderWidth, visibleNumber, sliderHeight, imageWidth, imagesUrls, parentId) {
    addNewProductsSlider(sliderId, sliderWidth, sliderHeight, parentId);
    manageSliderElements(sliderId, imageWidth, imagesUrls, visibleNumber);
}
function addNewProductsSlider(sliderId, sliderWidth, sliderHeight, parentId)
{
    let slider = document.createElement('div');
    slider.setAttribute('id', sliderId);
    //adding styles to slider
    slider.style.display = 'flex';
    slider.style.justifyContent = 'space-between';
    slider.style.width = sliderWidth;
    slider.style.height = sliderHeight;
    document.getElementById(parentId).appendChild(slider);
}
//
function manageSliderElements(sliderId, imageWidth, imagesUrls, visibleNumber) {
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

    let centralImageNumber = Math.floor(visibleNumber/2);
    for(let i = 0; i < imagesNum; i++)
    {
        sliderElements[1].push(addToNewProductsSlider(sliderId, imageWidth, imagesUrls[i]));
    }

    manageCentralImage(sliderElements[1][centralImageNumber]);
}

function addToNewProductsSlider(sliderId, imageWidth, imageUrl) {
    let sliderElement = document.createElement('div');
    sliderElement.style.backgroundImage = `url('${imageUrl}')`;
    sliderElement.style.width = imageWidth;
    document.getElementById(sliderId).appendChild(sliderElement);
    return sliderElement;
}
function manageCentralImage(sliderCentralElement)
{
    sliderCentralElement.style.display = 'flex';
    sliderCentralElement.style.alignItems = 'center';
    sliderCentralElement.style.justifyContent = 'center';

    addButtons(sliderCentralElement);
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
    parent.appendChild(iElement);
    return iElement;
}

function addIElement(parent, className) {
    let iElement = document.createElement('i');
    iElement.className = className;
    parent.appendChild(iElement);
    return iElement;
}


function SwapBackgroundImage(direction) {

}