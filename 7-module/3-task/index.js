export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>
    `;

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.valueElem = this.elem.querySelector('.slider__value');
    this.stepsContainer = this.elem.querySelector('.slider__steps');
    this.updateActiveStep();
    this.updatePosition();
  }

  updateActiveStep() {
    const stepElements = this.stepsContainer.querySelectorAll('span');

    stepElements.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });
  }

  updatePosition() {
    let valuePercents = (this.value / (this.steps - 1)) * 100;

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    this.valueElem.textContent = this.value;
  }

  addEventListeners() {
    this.elem.addEventListener('click', this.onClick);
  }

  onClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    this.value = Math.round(approximateValue);

    this.updateActiveStep();
    this.updatePosition();

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }
}