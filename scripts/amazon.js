import { cart, addToCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { productsHTML } from "../data/products-page.js";
import { showAddedMessage } from "../data/showAddedMessage.js";
const timeoutsId = {};

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    showAddedMessage(productId, timeoutsId);
    updateCartQuantity();
  });
});
