import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = null;
    this.closeButton = null;
    this.body = document.body;
    this.keydownHandler = this.keydownHandler.bind(this);
    this.closeByClick = this.closeByClick.bind(this);
  }

  open() {
    this.render();
    this.body.classList.add('is-modal-open');
    this.addEventListeners();
  }

  close() {
    if (!this.modal) {
      return;
    }

    this.removeEventListeners();
    this.modal.remove();
    this.body.classList.remove('is-modal-open');
    this.modal = null;
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
    if (this.modal) {
      const bodyElement = this.modal.querySelector('.modal__body');
      if (bodyElement) {
        bodyElement.innerHTML = '';
        bodyElement.append(node); 
      }
    }
  }

  render() {
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

    if (this.title) {
      const titleElement = this.modal.querySelector('.modal__title');
      if (titleElement) {
        titleElement.textContent = this.title;
      }
    }
    if (this.bodyContent) {
      const bodyElement = this.modal.querySelector('.modal__body');
      if (bodyElement) {
        bodyElement.innerHTML = '';
        bodyElement.append(this.bodyContent);
      }
    }

    this.body.append(this.modal);
    this.closeButton = this.modal.querySelector('.modal__close');
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