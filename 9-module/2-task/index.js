import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  carousel = {};
  ribbonMenu = {};
  stepSlider = {};
  cartIcon = {};
  cart = {};
  productsGrid = {};

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    this.addHandlers();
  }

  async render() {    
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);    
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);    
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);    
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);    

    const response = await fetch('products.json');
    const products = await response.json();
    this.productsGrid = new ProductsGrid(products); 

    const grid = document.querySelector('[data-products-grid-holder]');
    grid.innerHTML = '';
    grid.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.querySelector('#nuts-checkbox').checked,
      vegeterianOnly: document.querySelector('#vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  addHandlers(){
    document.body.addEventListener('product-add', event => {
      const product = this.productsGrid.products.find(x => x.id === event.detail);
      if(product){       
        this.cart.addProduct(product);
      }
    });

    document.body.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.body.addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.body.querySelector('.filters__inner').addEventListener('change', event => {
      const checkboxContainer = event.target.closest('.filters__checkbox');
      if(checkboxContainer){
        const nutsCheckbox = checkboxContainer.querySelector('#nuts-checkbox');
        if(nutsCheckbox){
          this.productsGrid.updateFilter({
            noNuts: nutsCheckbox.checked
          });
        }
        else{
          const vegeterianCheckbox = checkboxContainer.querySelector('#vegeterian-checkbox');
          if(vegeterianCheckbox){
            this.productsGrid.updateFilter({
              vegeterianOnly: vegeterianCheckbox.checked
            });
          }
        }
      }
    });
  }
}
