import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      this.cartItems.push({ product, count: 1 });
    }

    this.onProductUpdate(cartItem || { product, count: 1 });
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);

    if (!cartItem) return;

    cartItem.count += amount;

    if (cartItem.count <= 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="product">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${count}</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>
    `);
  }

  renderOrderForm() {
    return createElement(`
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>
        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
          <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
          <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
        </div>
        <div class="cart-form__group">
          <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
        </div>
        <div class="cart-buttons">
          <div class="cart-buttons__buttons btn-group">
            <div class="cart-buttons__info">
              <span class="cart-buttons__info-text">total</span>
              <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
            </div>
            <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
          </div>
        </div>
      </form>
    `);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let modalBody = document.createElement('div');

    this.cartItems.forEach(cartItem => {
      modalBody.append(this.renderProduct(cartItem.product, cartItem.count));
    });

    modalBody.append(this.renderOrderForm());
    this.modal.setBody(modalBody);

    this.modal.open();

    modalBody.addEventListener('click', (event) => {
      let plusButton = event.target.closest('.cart-counter__button_plus');
      let minusButton = event.target.closest('.cart-counter__button_minus');

      if (plusButton) {
        let productId = plusButton.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      }

      if (minusButton) {
        let productId = minusButton.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      }
    });

    let cartForm = modalBody.querySelector('.cart-form');
    cartForm.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = this.modal.modal.querySelector('.modal__body');

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      if (cartItem.count === 0) {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      } else {
        productCount.textContent = cartItem.count;
        productPrice.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      }

      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;

      if (this.isEmpty()) {
        this.modal.close();
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    let submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    let formData = new FormData(event.target);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })      
      .then(data => {
        this.modal.setTitle("Success!");

        let successMessage = document.createElement('div');
        successMessage.classList.add('modal__body-inner');
        successMessage.innerHTML = `
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        `;

        this.modal.setBody(successMessage);

        this.cartItems = [];
        this.cartIcon.update(this);
      })
      .catch(error => {
        this.modal.setTitle("Error!");

        let errorMessage = document.createElement('div');
        errorMessage.classList.add('modal__body-inner');
        errorMessage.innerHTML = `
          <p>
            There was an error processing your order. Please try again later.<br>
            Error: ${error.message}
          </p>
        `;

        this.modal.setBody(errorMessage);
      })
      .finally(() => {
        submitButton.classList.remove('is-loading');
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}