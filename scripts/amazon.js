import { cart, addToCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { productsHTML } from "../data/products-page.js";

const timeoutsId = {};

function showAddedMessage(productId, timeoutsId) {
  const addInput = document.querySelector(`.js-added-script-${productId}`);

  if (timeoutsId[productId]) {
    clearInterval(timeoutsId[productId]);
  }

  addInput.style.opacity = 1;

  timeoutsId[productId] = setTimeout(() => {
    addInput.style.opacity = 0;
    delete timeoutsId[productId];
  }, 2000);
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    showAddedMessage(productId, timeoutsId);
    updateCartQuantity();
  });
});
