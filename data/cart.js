import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
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

export function addToCart(productId, quantity = null) {
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

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity = selectValue;
  } else {
    cart.push({
      productId: productId,
      quantity: selectValue,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  if (!cartQuantity || cartQuantity < 0) {
    cartQuantity = "";
  }

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  if (cartQuantity < 1000) {
    saveToStorage();
  }
}

export function updateCheckoutQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const element = document.querySelector(".checkout-quantity");
  if (cartQuantity < 0) {
    element.innerHTML = cartQuantity + "";
    return;
  } else {
    element.innerHTML = cartQuantity + " items";
    saveToStorage();
  }
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOptions(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
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
  saveToStorage();
}

export function updateSummary() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const summary = document.querySelector(".js-payment-summary");
  summary.innerHTML = `Items (${cartQuantity}):`;
  if (cartQuantity > 0) {
    saveToStorage();
  }
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

export async function loadCartFetch() {
  try {
    const url = "https://supersimplebackend.dev/cart";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.text();
    console.log(data);
    return data;
    
  } catch (error) {
    console.error(error);
  }
}
