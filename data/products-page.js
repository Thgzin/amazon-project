import { products } from "../data/products.js";

export function renderProductsGrid() {
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" />
        </div>

        <div class="product-name limit-text-to-2-lines">${product.name}</div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}" />
          <div class="product-rating-count link-primary">${
            product.rating.count
          }</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
          <select class="select-quantity-${product.id}">
            ${[...Array(10).keys()]
              .map(
                (i) =>
                  `<option value="${i + 1}" ${i === 0 ? "selected" : ""}>${
                    i + 1
                  }</option>`
              )
              .join("")}
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-script-${product.id}">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
          product.id
        }">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;
}
