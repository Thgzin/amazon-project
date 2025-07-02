import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch, loadProducts } from "../data/products.js";
//import "../data/cart-class.js";
//import "../data/backend-pratice.js";
//import "../data/car.js";
import { loadCartFetch } from "../data/cart.js";

/*
async function loadPage() {
  
  try {
    //throw "error1";
    await loadProductsFetch();
    await loadCartFetch();
  } catch (error) {
    console.log("Unexpected Error. Please try again later.");
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
*/

async function loadPage() {
  await Promise.all([loadProductsFetch(), loadCartFetch()]);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
*/
