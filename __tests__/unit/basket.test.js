const { describe, expect, it } = require("@jest/globals");
const { Basket } = require("../../services/baskets");

describe("Testing Basket constructor", () => {
  it("Should create a new Basket", () => {
    const newBasket = new Basket();
    expect(newBasket).toBeDefined();
  });

  it("addItem should add items to the basket and update price", () => {
    const newBasket = new Basket();
    const mockedProductOne = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
    };
    const mockedProductTwo = {
      name: "Cofi Coffe Mug",
      code: "MUG",
      price: 7.5,
    };
    newBasket.addItem(mockedProductOne);
    expect(newBasket.items[mockedProductOne.code].amount).toBe(1);
    newBasket.addItem(mockedProductTwo);
    expect(newBasket.items[mockedProductTwo.code].amount).toBe(1);
    newBasket.addItem(mockedProductOne);
    expect(newBasket.items[mockedProductOne.code].amount).toBe(2);
    expect(newBasket.items[mockedProductTwo.code].amount).toBe(1);
  });

  it("ApplyDiscount should set discountedPrice if discount is provided", () => {
    const newBasket = new Basket();
    const mockedProduct = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
      discount() {
        this.discountedPrice = 2.5;
      },
    };
    newBasket.addItem(mockedProduct);
    newBasket.applyDiscount();
    expect(newBasket.items["VOUCHER"].discountedPrice).toBe(2.5);
  });

  it("ApplyDiscount should NOT set discountedPrice if discount is NOT provided", () => {
    const newBasket = new Basket();
    const mockedProduct = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
    };
    newBasket.addItem(mockedProduct);
    newBasket.applyDiscount();
    expect(newBasket.items["VOUCHER"].discountedPrice).toBe(undefined);
  });

  it("Checkout should provide the grandTotal", () => {
    const newBasket = new Basket();
    const mockedProductOne = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
    };
    const mockedProductTwo = {
      name: "Cofi Coffe Mug",
      code: "MUG",
      price: 7.5,
    };
    newBasket.addItem(mockedProductOne);
    newBasket.addItem(mockedProductOne);
    newBasket.addItem(mockedProductTwo);
    newBasket.checkout();
    expect(newBasket.grandTotal).toBe(17.5);
  });

  it("Checkout should provide the grandTotal with applied discounts", () => {
    const newBasket = new Basket();
    const mockedProductOne = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
      discount() {
        this.discountedPrice = 2.5;
      },
    };
    const mockedProductTwo = {
      name: "Cofi Coffe Mug",
      code: "MUG",
      price: 7.5,
    };
    newBasket.addItem(mockedProductOne);
    newBasket.addItem(mockedProductOne);
    newBasket.addItem(mockedProductTwo);
    newBasket.checkout();
    expect(newBasket.grandTotal).toBe(12.5);
  });
});
