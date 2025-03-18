export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}