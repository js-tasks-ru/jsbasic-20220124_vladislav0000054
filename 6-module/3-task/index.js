import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  carousel = null;
  productCard = [];

  get elem(){
    return this.carousel;
  }

  constructor(slides) {
    this.slides = slides;
    this.createHtml();
    this.initCarousel();
  }

  createHtml(){
    const carouselContainer = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      </div>
    </div>
    `);

    const carouselInner = carouselContainer.querySelector('.carousel__inner');
    for (let slider of this.slides) {
      const carouselSlide = createElement(`
        <div class="carousel__slide" data-id="${slider.id}">
          <img src="/assets/images/carousel/${slider.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slider.price.toFixed(2)}</span>
            <div class="carousel__title">${slider.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      
      const plusButton = carouselSlide.querySelector('button.carousel__button');
      this.addCustomEvent(plusButton, slider.id, true);

      carouselInner.append(carouselSlide);
    }

    this.carousel = carouselContainer;
  }

  initCarousel(){
    let carousel = this.carousel.querySelector('.carousel__inner');  
    let carouselArrows = this.carousel.querySelectorAll('.carousel__arrow'); 
    let slidesCount = this.carousel.querySelectorAll('.carousel__slide').length;
    let maxOffsetX = (slidesCount - 1) * carousel.offsetWidth * -1;

    this.hiddenArrow(0, maxOffsetX)

    for (const carouselArrow of carouselArrows) {
      carouselArrow.addEventListener('click', (event) => {
        let carouselArrowDiv = event.target.closest('div.carousel__arrow');
        if(!carouselArrowDiv) {
          return;
        }
        
        let offsetWidth = this.carousel.querySelector('.carousel__inner').offsetWidth;  
        maxOffsetX = (slidesCount - 1) * offsetWidth * -1;
        
        let offsetX = carouselArrowDiv.className.includes('right') ? -1 : 1;
        let currentOffsetValue = parseInt(carousel.style.transform.slice(11)) || 0;
        let newOffsetValue = currentOffsetValue + offsetX * offsetWidth;
        carousel.style.transform = `translateX(${newOffsetValue}px)`;

        this.hiddenArrow(newOffsetValue, maxOffsetX);
      });
    }
  }

  hiddenArrow(currentOffsetXValue, maxOffsetX){
    if(currentOffsetXValue === 0){
      this.carousel.querySelector('.carousel__arrow_left').style.display = 'none';
      return;
    }
    
    if(currentOffsetXValue === maxOffsetX){
      this.carousel.querySelector('.carousel__arrow_right').style.display = 'none';
      return;
    }
    
    this.carousel.querySelectorAll('.carousel__arrow').forEach(x => x.style.display = ''); 
  }

  addCustomEvent(element, detail, bubbles){
    element.addEventListener("click", () => {
      element.dispatchEvent(new CustomEvent("product-add", {
        detail,
        bubbles,
      }));
    });
  }
}
