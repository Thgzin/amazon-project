import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOptions,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOptions,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptions(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption.id);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
        <div class="delivery-date">Delivery date: ${dateString}</div>
  
        <div class="cart-item-details-grid">
            <img
            class="product-image"
            src="${matchingProduct.image}"
            />
  
            <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
                ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${
              matchingProduct.id
            }">${matchingProduct.getPrice()}</div>
            <div class="product-quantity">
                <span> Quantity: <span class="quantity-label js-quantity-label-${
                  matchingProduct.id
                }">${cartItem.quantity}</span> </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                  matchingProduct.id
                }">
                Update
                </span>
                <input class="quantity-input js-quantity-input-${
                  matchingProduct.id
                }"/>
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                  matchingProduct.id
                }">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matchingProduct.id
                }">
                Delete
                </span>
            </div>
            </div>
  
            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
        </div>
      `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      removeFromCart(productId);
      renderPaymentSummary();
      container.remove();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      quantityInput.focus();
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      const newQuantity = Number(quantityInput.value);

      if (
        !Number.isInteger(newQuantity) ||
        newQuantity < 1 ||
        newQuantity > 999
      ) {
        alert("Quantity must be a whole number between 1 and 999.");
        return;
      }

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );

      updateQuantity(productId, newQuantity);

      quantityLabel.innerHTML = newQuantity;
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const classList = Array.from(input.classList);
        const match = classList.find((cls) =>
          cls.startsWith("js-quantity-input-")
        );

        if (!match) return;

        const productId = match.replace("js-quantity-input-", "");
        const saveButton = document.querySelector(
          `.js-save-link[data-product-id="${productId}"]`
        );
        if (saveButton) {
          saveButton.click();
        }
      }
    });
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM, D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)} `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
            <div class="delivery-option js-delivery-option
            js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"

            data-product-id="${matchingProduct.id}" 
            data-delivery-option-id="${deliveryOption.id}">
              <input
              type="radio"
              ${isChecked ? "checked" : ""}
              class="delivery-option-input
            js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
              name="delivery-option-${matchingProduct.id}"
              />
              <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString} - Shipping</div>
              </div>
          </div>
        `;
    });
    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
