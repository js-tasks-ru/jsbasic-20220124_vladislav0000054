import createElement from '../../assets/lib/create-element.js'

export default class ProductCard {
  _productCard = null;

  constructor(product) {
    this._productCard = initProductCard(product);
  }

  get elem(){
    return this._productCard;
  }
}

function initProductCard(product){
  let cardContainer = createElement('<div class="card"></div>');
  let imageContainer = createElement('<div class="card__top">');
  cardContainer.append(imageContainer);

  let img = createElement('<img class="card__image" alt="product">');
  let span = createElement(`<span class="card__price">€${product.price.toFixed(2)}</span>`);
  img.src = `/assets/images/products/${product.image}`;
  imageContainer.append(img, span);
  
  let bodyContainer = createElement('<div class="card__body">');
  let title = createElement(`<div class="card__title">${product.name}</div>`);
  let button = createElement('<button type="button" class="card__button"></button>');
  let plusImg = createElement('<img src="/assets/images/icons/plus-icon.svg" alt="icon">');

  cardContainer.append(bodyContainer);
  bodyContainer.append(title, button);
  button.append(plusImg);
  
  addCustomEvent(button, product.id);

  return cardContainer;
}

function addCustomEvent(element, detail){
  element.addEventListener("click", () => {
    element.dispatchEvent(new CustomEvent("product-add", {
      detail,
      bubbles: true
    }));
  });
}