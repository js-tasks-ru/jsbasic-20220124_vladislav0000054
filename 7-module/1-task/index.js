import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.elem = this.init();
    this.refreshButtons();
    this.addHandlers();
  }

  get elem(){
    return this.elem;
  }

  init(){
    const container = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    let nav = container.querySelector('nav.ribbon__inner');

    for (const category of this.categories) {
      const a = createElement(`<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`);
      nav.append(a);
    }

    return container;
  }

  addHandlers(){
    const buttons = this.elem.querySelectorAll('button.ribbon__arrow');
    const ribbonInner = this.elem.querySelector('nav.ribbon__inner');

    for (const button of buttons) {
      button.addEventListener('click', (event) =>{
        const buttonElement = event.currentTarget.closest('button.ribbon__arrow');
        if(!buttonElement) {
          return;
        }
        
        let offsetX = buttonElement.className.includes('ribbon__arrow_right') ? 1 : -1;
        ribbonInner.scrollBy(350 * offsetX, 0);

      });
    }

    ribbonInner.addEventListener('scroll', () =>{
      this.refreshButtons();
    });

    ribbonInner.addEventListener("click", (event) => {
      if(!event.target.closest('a.ribbon__item')){
        return;
      }
      
      ribbonInner.dispatchEvent(new CustomEvent("ribbon-select", {
        detail: event.target.dataset.id,
        bubbles: true
      }));
    });
  }

  refreshButtons(){     
    const ribbonInner = this.elem.querySelector('nav.ribbon__inner');

    if(ribbonInner.scrollLeft === 0){
      this.elem.querySelector('button.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      return;
    }
    
    let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

    if(scrollRight < 1){
      this.elem.querySelector('button.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
      return;
    }
    
    this.elem.querySelectorAll('button.ribbon__arrow').forEach(x => x.classList.add('ribbon__arrow_visible'));
  }
}
