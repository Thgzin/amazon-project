export const cart = [];

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
    });
  }
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}


