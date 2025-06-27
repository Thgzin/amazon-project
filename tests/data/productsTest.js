import { products, Appilance, Clothing, Product } from "../../data/products.js";

describe("test suite: Products", () => {
  it("verify the Products propriets and methods", () => {
    const testProduct = new Product({
      id: "backpack-product",
      image: "images/products/backpack.jpg",
      name: "Backpack",
      rating: {
        stars: 4.5,
        count: 100,
      },
      priceCents: 3000,
    });
    expect(testProduct.id).toEqual("backpack-product");
    expect(testProduct.getPrice()).toEqual("$30.00");
    expect(testProduct.extraInfoHTML()).toEqual("");
  });
});

describe("teste suite: Clothing", () => {
  it("verify the Clothing propriets and methods", () => {
    const clothingProduct = new Clothing({
      id: "green-clothing-product",
      image: "images/products/clothing.jpg",
      name: "Green Clothing",
      rating: {
        stars: 4.0,
        count: 430,
      },
      priceCents: 3000,
    });
    expect(clothingProduct.extraInfoHTML()).toContain(
      `<a href="${clothingProduct.sizeChartLink}" target="_blank">Size Chart</a>`
    );
  });
});

describe("teste suite: Appliance", () => {
  it("verify the Appilance propriets and methods", () => {
    const appilanceProduct = new Appilance({
      id: "appilance-product",
      image: "images/products/appilance.jpg",
      name: "Black Appliance",
      rating: {
        stars: 5.0,
        count: 621,
      },
      priceCents: 9200,
    });
    expect(appilanceProduct.extraInfoHTML()).toContain(
      `<a href="${appilanceProduct.instructionLink}" target="_blank">Instruction Link</a>`
    );
    expect(appilanceProduct.extraInfoHTML()).toContain(
        `<a href="${appilanceProduct.warrantyLink}" target="_blank">Warranty Link</a>`
      );
  });
});
