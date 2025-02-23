function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselSlideWidth = document.querySelector('.carousel__slide').offsetWidth;
  const totalSlides = document.querySelectorAll('.carousel__slide').length;
  let currentSlide = 0;

  carouselArrowLeft.style.display = 'none';

  function updateCarousel() {
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
  }

  carouselArrowRight.addEventListener('click', () => {
    currentSlide++;
    updateCarousel();
  });

  carouselArrowLeft.addEventListener('click', () => {
    currentSlide--;
    updateCarousel();
  });
}
