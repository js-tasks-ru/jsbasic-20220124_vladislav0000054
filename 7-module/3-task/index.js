import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  sliderValueSpan = null;
  steps = [];
  progressValues = [];

  get elem(){
    return this.elem;
  }

  constructor({ steps, value = 0 }) {
    this.onClick = this.onClick.bind(this);
    this.init(steps, value);    
  }

  init(steps, value){ 
    this.progressValues = [...Array(steps).keys()].map(x => Math.round(x / (steps - 1) * 100));
    this.steps = [...Array(steps).keys()].map(x => createElement(`<span></span>`));
    this.steps[value].classList.add('slider__step-active');

    const container = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: ${this.progressValues[value]}%;">
        </div>
        <div class="slider__progress" style="width: ${this.progressValues[value]}%;"></div>
        <div class="slider__steps">
        </div>
      </div>  
    `);    

    this.sliderValueSpan = createElement(`<span class="slider__value">${value}</span>`);
    container.querySelector('.slider__thumb').append(this.sliderValueSpan);   
    this.steps.forEach(element => { container.querySelector('.slider__steps').append(element) });
    
    this.elem = container;

    this.addHandlers();
  }

  addHandlers(){
    this.elem.addEventListener('click', this.onClick);
  }  

  onClick(event){
     const slider = event.target.closest('div.slider');
     if(slider){
       const stepIndex = this.selectStep(event.clientX);

       slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: stepIndex,
        bubbles: true
      }));
     }
  }

  selectStep(pointX){
    const sliderRect = this.elem.querySelector('.slider__steps').getBoundingClientRect();
    const pointClick = pointX - sliderRect.x;
    const stepWidth = sliderRect.width / (this.steps.length - 1);
    const stepIndex = Math.round(pointClick / stepWidth);

    this.elem.querySelector('span.slider__step-active').classList.remove('slider__step-active');
    this.steps[stepIndex].classList.add('slider__step-active');

    this.elem.querySelector('.slider__thumb').style.left = `${this.progressValues[stepIndex]}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.progressValues[stepIndex]}%`;
    this.sliderValueSpan.textContent = stepIndex;

    return stepIndex;
  }
}