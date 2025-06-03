import { updateCheckoutQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let html = "";

  html += `    Checkout (<a
            class="return-to-home-link checkout-quantity"
            href="amazon.html"
          ></a
          >)
  `;

  document.querySelector(".js-checkout-middle-header").innerHTML = html;
  updateCheckoutQuantity();
}
