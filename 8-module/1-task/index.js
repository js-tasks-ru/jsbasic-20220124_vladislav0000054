import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const elem = document.querySelector('div.cart-icon_visible');    
    const isMobileSize =  window.innerWidth <= 767;
    if(elem && !isMobileSize && elem.offsetWidth && elem.offsetHeight){
      if(window.pageYOffset > 50){
        const containerFirstElementRect = document.querySelector('.container').firstElementChild.getBoundingClientRect();        
        let rightIndent = containerFirstElementRect.right + 20;        
        if(rightIndent > document.documentElement.clientWidth){
          rightIndent = document.documentElement.clientWidth - elem.clientWidth - 10;
        }
        
        elem.style.position = 'fixed';
        elem.style.left = rightIndent + 'px';
      }else{        
        elem.style.position = 'absolute';
        elem.style.removeProperty('left');
      } 
    }
  }
}