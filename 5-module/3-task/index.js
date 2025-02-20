function initCarousel() {
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const slides = document.querySelectorAll('.carousel__slide');
  let slideIndex = 1;


  carouselArrowLeft.style.display = 'none'; 
  

  carouselArrowRight.addEventListener('click', () =>{
    if (slideIndex < slides.length) {
      slides[slideIndex - 1].style.display = 'none';
      slideIndex++;
      slides[slideIndex - 1].style.display = 'block';
      if (slideIndex === slides.length) {
        carouselArrowRight.style.display = 'none';
      }else {
        carouselArrowLeft.style.display = 'block';
      }
    }
  });

  carouselArrowLeft.addEventListener('click', () => {
    if (slideIndex > 1) {
      slides[slideIndex - 1].style.display = 'none';
      slideIndex--;
      slides[slideIndex - 1].style.display = 'block';
      if (slideIndex === 1) {
        carouselArrowLeft.style.display = 'none';
      }else{
        carouselArrowRight.style.display = 'block';
      }
    }
  });
}
