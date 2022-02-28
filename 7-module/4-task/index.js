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
    this.onPointermove = this.onPointermove.bind(this);
    this.onPointerup = this.onPointerup.bind(this);
    this.onClick = this.onClick.bind(this);

    this.init(steps, value); 
    this.addHandlers();   
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
  }

  addHandlers(){
    this.elem.addEventListener('click', this.onClick);    

    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;  

    thumb.addEventListener('pointerdown', event => { 
      this.elem.classList.add('slider_dragging');
      document.addEventListener('pointermove', this.onPointermove);
      document.addEventListener('pointerup', this.onPointerup);      
    }); 
  }  

  onPointermove(event){
    const sliderPercentLeft = this.calcSliderPercentLeftPosition(event.clientX);    
    this.elem.querySelector('.slider__thumb').style.left = `${sliderPercentLeft}%`;    
    this.elem.querySelector('.slider__progress').style.width = `${sliderPercentLeft}%`;
    
    const stepIndex = this.getStepIndex(event.clientX);
    if(stepIndex !== this.sliderValueSpan.textContent){
      this.activateStep(stepIndex);  
    } 

    if(event.pointerType !== 'mouse'){
      return false;
    }
  }

  onPointerup(event){
    document.removeEventListener('pointermove', this.onPointermove);
    document.removeEventListener('pointerup', this.onPointerup);

    this.elem.classList.remove('slider_dragging');
    
    const stepIndex = this.getStepIndex(event.clientX)
    this.selectStep(stepIndex);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: stepIndex,
      bubbles: true
     }));

    if(event.pointerType !== 'mouse'){
      return false;
    }
  }

 onClick(event){
   const slider = event.target.closest('div.slider');
   if(slider){
     const stepIndex = this.getStepIndex(event.clientX);
     this.selectStep(stepIndex);

     slider.dispatchEvent(new CustomEvent('slider-change', {
       detail: stepIndex,
       bubbles: true
      }));
    }
  }

  calcSliderPercentLeftPosition(clientX){
    const sliderRect = this.elem.querySelector('.slider__steps').getBoundingClientRect();
    const rigthBound = sliderRect.right - sliderRect.left;
    const leftBound = 0;
    const pointer = clientX - sliderRect.left;
    
    if(pointer >= rigthBound){
      return 100;
    }

    if(pointer <= leftBound){
      return 0;
    }
    
    return Math.round(pointer / rigthBound * 100);
  }
  
  selectStep(stepIndex){ 
    this.activateStep(stepIndex);    
    this.elem.querySelector('.slider__thumb').style.left = `${this.progressValues[stepIndex]}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.progressValues[stepIndex]}%`;
    
  }

  activateStep(stepIndex){
    this.elem.querySelector('span.slider__step-active').classList.remove('slider__step-active');
    this.steps[stepIndex].classList.add('slider__step-active');
    this.sliderValueSpan.textContent = stepIndex;
  }

  getStepIndex(clientX){
    const sliderRect = this.elem.querySelector('.slider__steps').getBoundingClientRect();
    
    if(sliderRect.left >= clientX){
      return 0;
    }

    if(sliderRect.right <= clientX){
      return this.steps.length - 1;
    }

    const pointClick = clientX - sliderRect.x;
    const stepWidth = sliderRect.width / (this.steps.length - 1);

    return Math.round(pointClick / stepWidth);
  }
}