import { cart, addToCart, updateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { renderProductsGrid } from "../data/products-page.js";
import { showAddedMessage } from "../data/showAddedMessage.js";

const timeoutsId = {};


function addEventListenersToCartButtons() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      showAddedMessage(productId, timeoutsId);
      updateCartQuantity();
    });
  });
}

loadProducts(() => {
  renderProductsGrid();
  addEventListenersToCartButtons(); 
});

updateCartQuantity();
