import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems = undefined;
  localStorageKey = undefined;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId, quantity = null) {
    let matchingItem;

    let selectValue;

    if (quantity !== null) {
      selectValue = quantity;
    } else {
      const selectProduct = document.querySelector(
        `.select-quantity-${productId}`
      );
      if (!selectProduct)
        throw new Error("Quantidade não especificada e elemento DOM ausente");
      selectValue = Number(selectProduct.value);
    }

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity = selectValue;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectValue,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }
  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );
    this.saveToStorage();
  }
  updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (!matchingItem) {
      return;
    }

    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  updateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    if (!cartQuantity || cartQuantity < 0) {
      cartQuantity = "";
    }

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    if (cartQuantity < 1000) {
      this.saveToStorage();
    }
  }
  updateCheckoutQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const element = document.querySelector(".checkout-quantity");
    if (cartQuantity < 0) {
      element.innerHTML = cartQuantity + "";
      return;
    } else {
      element.innerHTML = cartQuantity + " items";
      this.saveToStorage();
    }
  }
  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  updateSummary() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const summary = document.querySelector(".js-payment-summary");
    summary.innerHTML = `Items (${cartQuantity}):`;
    if (cartQuantity > 0) {
      this.saveToStorage();
    }
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(cart instanceof Cart);
