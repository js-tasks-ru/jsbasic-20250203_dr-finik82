import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.addEventListeners();
    this.updateArrowVisibility();
  }

  render() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const ribbonInner = ribbon.querySelector('.ribbon__inner');
    this.categories.forEach(category => {
      const item = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
      ribbonInner.append(item);
    });

    return ribbon;
  }

  addEventListeners() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');

    ribbonArrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
      this.updateArrowVisibility();
    });

    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
      this.updateArrowVisibility();
    });

    ribbonInner.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    });

    ribbonInner.addEventListener('click', (event) => {
      if (event.target.classList.contains('ribbon__item')) {
        event.preventDefault();

        const activeItem = this.elem.querySelector('.ribbon__item_active');
        if (activeItem) {
          activeItem.classList.remove('ribbon__item_active');
        }

        event.target.classList.add('ribbon__item_active');

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true
        }));
      }
    });
  }

  updateArrowVisibility() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');

    if (ribbonInner.scrollLeft === 0) {
      ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      ribbonArrowLeft.classList.add('ribbon__arrow_visible');
    }

    let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

    if (scrollRight < 1) {
      ribbonArrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      ribbonArrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}