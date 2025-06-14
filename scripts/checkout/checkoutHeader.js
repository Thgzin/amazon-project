import { updateCheckoutQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const headerElement = document.querySelector(".js-checkout-middle-header");
  if (!headerElement) return;

  let html = "";

  html += `    Checkout (<a
            class="return-to-home-link checkout-quantity"
            href="amazon.html"
          ></a
          >)
  `;

  headerElement.innerHTML = html;
  updateCheckoutQuantity();
}
