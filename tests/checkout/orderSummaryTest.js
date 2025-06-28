import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  beforeEach(() => {
    if (!localStorage.setItem.calls) {
      spyOn(localStorage, "setItem");
    }
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-middle-header"></div>
      <div class="pay-summary-js"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    const cartItem1 = document.querySelector(
      `.js-cart-item-container-${productId1}`
    );
    const cartItem2 = document.querySelector(
      `.js-cart-item-container-${productId2}`
    );

    expect(cartItem1).not.toBeNull();
    expect(cartItem2).not.toBeNull();

    expect(cartItem1.querySelector(".quantity-label").innerText).toContain("2");
    expect(cartItem2.querySelector(".quantity-label").innerText).toContain("1");
  });

  it("removes a product", () => {
    const deleteButton = document.querySelector(
      `.js-delete-link[data-product-id="${productId1}"]`
    );
    expect(deleteButton).not.toBeNull(); // valida que o botão existe

    deleteButton.click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      0
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toBeNull();
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toBeNull();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it("get the name of the product", () => {
    const productName1 = document.querySelector(
      `.js-product-name-${productId1}`
    ).innerText;

    const productName2 = document.querySelector(
      `.js-product-name-${productId2}`
    ).innerText;

    expect(productName1).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs"
    );

    expect(productName2).toEqual("Intermediate Size Basketball");
  });

  it("get the price of the product", () => {
    let productPrice = document.querySelector(
      `.js-product-price-${productId1}`
    ).innerText;
    expect(productPrice).toEqual("$10.90");

    productPrice = document.querySelector(
      `.js-product-price-${productId2}`
    ).innerText;
    expect(productPrice).toEqual("$20.95");
  });

  it("updating the delivery option", () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`)
        .checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0]).toEqual({
      productId: productId1,
      quantity: 2,
      deliveryOptionId: "3",
    });
    expect(document.querySelector(".js-shipping-price").innerText).toEqual(
      "$14.98"
    );
    expect(document.querySelector(".js-total-price").innerText).toEqual(
      "$63.50"
    );
  });
});
