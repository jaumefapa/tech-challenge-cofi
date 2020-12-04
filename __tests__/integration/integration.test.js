const { Product } = require("../../services/product");
const { Basket } = require("../../services/baskets");
const { Discounts } = require("../../services/discount");
const { describe, it, expect } = require("@jest/globals");

describe("Testing integration between Basket - Discounts - Products", () => {
  const cofiVoucher = new Product("Cofi Voucher", "VOUCHER", 5);
  const cofiTShirt = new Product("Cofi t-shirt", "TSHIRT", 20);
  const cofiCoffeMug = new Product("Cofi Coffee Mug", "MUG", 7.5);
  const cofiBasket = new Basket();
  const cofiDiscounts = new Discounts();

  beforeEach(() => {
    cofiBasket.grandTotal = 0;
    cofiBasket.items = {};
  });

  test("Scenario 1: no discounts", () => {
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiCoffeMug);
    cofiBasket.checkout();
    expect(cofiBasket.grandTotal).toBe(62.5);
  });

  test("Scenario 2: adding discounts", () => {
    const twoForOne = cofiDiscounts.twoForOne;
    const oneEuroLessUnit = cofiDiscounts.buyThreeOneEuroDiscountPerUnit;
    cofiDiscounts.makeDiscountAvailableToProduct(twoForOne, [cofiVoucher]);
    cofiDiscounts.makeDiscountAvailableToProduct(oneEuroLessUnit, [cofiTShirt]);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiCoffeMug);
    cofiBasket.addItem(cofiCoffeMug);
    cofiBasket.checkout();
    expect(cofiBasket.grandTotal).toBe(82);
  });

  test("Scenario 3: discount not applying twice", () => {
    const twoForOne = cofiDiscounts.twoForOne;
    const oneEuroLessUnit = cofiDiscounts.buyThreeOneEuroDiscountPerUnit;
    cofiDiscounts.makeDiscountAvailableToProduct(twoForOne, [cofiVoucher]);
    cofiDiscounts.makeDiscountAvailableToProduct(oneEuroLessUnit, [cofiTShirt]);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiVoucher);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiTShirt);
    cofiBasket.addItem(cofiCoffeMug);
    cofiBasket.addItem(cofiCoffeMug);
    cofiBasket.checkout();
    expect(cofiBasket.grandTotal).toBe(163);
  });
});
