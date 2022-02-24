import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  title;
  body;
  elem;
  
  constructor() {
    this.init();
    this.onClose = this.onClose.bind(this);
  }

  init(){
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
            </div>
        </div>
      </div>
    `);

    this.title = createElement(`<h3 class="modal__title"></h3>`);
    this.body = createElement(`<div class="modal__body"></div>`);

    this.elem.querySelector(`div.modal__header`).append(this.title);
    this.elem.querySelector(`div.modal__inner`).append(this.body);
  }

  setTitle(title){
    this.title.textContent = title;
  }
  
  setBody(node){
    this.body.innerHTML = node.outerHTML;
  }

  open(){
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
    this.addHandlers();
  }

  addHandlers(){
    let closeButton = this.elem.querySelector('button.modal__close');
    closeButton.addEventListener('click', this.onClose);

    document.addEventListener('keydown', this.onClose);
  }

  close(){
    this.elem.querySelector('button.modal__close').click();
  }
  
  onClose(event){
    if(event.code === 'Escape' || event.target.closest('button.modal__close')){
      let closeButton = this.elem.querySelector('button.modal__close');
      closeButton.removeEventListener('click', this.onClose);
      document.removeEventListener('keydown', this.onClose);

      document.body.classList.remove('is-modal-open');
      document.querySelector('.modal').remove();      
    }
  }
}