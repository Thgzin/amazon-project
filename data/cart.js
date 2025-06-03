export let cart = JSON.parse(localStorage.getItem("cart"));

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

export function addToCart(productId) {
  let matchingItem;

  const selectProduct = document.querySelector(
    `.select-quantity-${productId}`
  ).value;

  const selectValue = Number(selectProduct);

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

  if (!cartQuantity) {
    cartQuantity = "";
  }
  if (cartQuantity < 0) {
    cartQuantity = "";
  }

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  if (cartQuantity >= 1000) {
    return;
  }

  saveToStorage();
}

export function updateCheckoutQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  if (cartQuantity < 0) {
    document.querySelector(".checkout-quantity").innerHTML = cartQuantity + "";
    return;
  } else {
    document.querySelector(".checkout-quantity").innerHTML =
      cartQuantity + " items";
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
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function updateSummary() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  if (cartQuantity === 0) {
    document.querySelector(
      ".js-payment-summary"
    ).innerHTML = `Items (${cartQuantity}):`;
  } else {
    document.querySelector(
      ".js-payment-summary"
    ).innerHTML = `Items (${cartQuantity}):`;
    saveToStorage();
  }
}
