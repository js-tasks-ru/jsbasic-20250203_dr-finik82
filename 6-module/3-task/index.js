import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.render();
    this.initCarousel();
  }

  render() {
    this.elem = createElement(`
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

    this.carouselInner = this.elem.querySelector('.carousel__inner');

    for (let slide of this.slides) {
      let slideElem = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      this.carouselInner.append(slideElem);
    }

    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__button')) {
        const slide = event.target.closest('.carousel__slide');
        const productId = slide.dataset.id;
        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: productId,
          bubbles: true
        }));
      }
    });
  }
  initCarousel() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let currentSlide = 0;

    carouselArrowLeft.style.display = 'none';

    const updateCarousel = () => {
      const carouselSlideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
      const totalSlides = this.elem.querySelectorAll('.carousel__slide').length;
      carouselInner.style.transform = `translateX(-${currentSlide * carouselSlideWidth}px)`;

      if (currentSlide === 0) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
      }

      if (currentSlide === totalSlides - 1) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowRight.style.display = '';
      }
    };

    carouselArrowRight.addEventListener('click', () => {
      currentSlide++;
      updateCarousel();
    });

    carouselArrowLeft.addEventListener('click', () => {
      currentSlide--;
      updateCarousel();
    });
  }
}
