import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.closeButton = this.modal.querySelector('.modal__close');
    this.bodyElement = this.modal.querySelector('.modal__body');
    this.body = document.body;
    this.keydownHandler = this.keydownHandler.bind(this);
    this.closeByClick = this.closeByClick.bind(this);
  }

  open() {
    this.body.append(this.modal);
    this.body.classList.add('is-modal-open');
    this.addEventListeners();
    this.updateContent();
  }

  close() {
    this.removeEventListeners();
    this.body.classList.remove('is-modal-open');
    this.modal.remove();
  }

  setTitle(title) {
    this.title = title;
    if (this.modal) {
      const titleElement = this.modal.querySelector('.modal__title');
      if (titleElement) {
        titleElement.textContent = title;
      }
    }
  }

  setBody(node) {
    this.bodyContent = node;
    this.updateContent(); 
  }

  updateContent() {
    if (this.title) {
      const titleElement = this.modal.querySelector('.modal__title');
      if (titleElement) {
        titleElement.textContent = this.title;
      }
    }
    if (this.bodyContent) {
      this.bodyElement.innerHTML = '';
      this.bodyElement.append(this.bodyContent);
    }
  }

  addEventListeners() {
    this.closeButton.addEventListener('click', this.closeByClick);
    document.addEventListener('keydown', this.keydownHandler);
  }

  removeEventListeners() {
    this.closeButton.removeEventListener('click', this.closeByClick);
    document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  closeByClick() {
    this.close();
  }
}