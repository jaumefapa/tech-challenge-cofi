const { it, expect, describe } = require("@jest/globals");
const { Discounts } = require("../../services/discount");
const Product = require("../../services/product");

describe("Testing Discounts constructor", () => {
  it("Should create a new discount", () => {
    const newDiscount = new Discounts();
    expect(newDiscount).toBeDefined();
  });

  it("Discount methods should be defined", () => {
    const newDiscount = new Discounts();
    expect(newDiscount.twoForOne).toBeDefined();
    expect(newDiscount.buyThreeOneEuroDiscountPerUnit).toBeDefined();
    expect(newDiscount.makeDiscountAvailableToProduct).toBeDefined();
  });
});

describe("twoForOne should return recalculated price", () => {
  it("twoForOne: 1 item", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
      amount: 1,
    };
    newDiscount.twoForOne(mockedProduct);
    expect(mockedProduct.discountedPrice * mockedProduct.amount).toBe(5);
  });
  it("twoForOne: 2 items", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
      amount: 2,
    };
    newDiscount.twoForOne(mockedProduct);
    expect(mockedProduct.discountedPrice * mockedProduct.amount).toBe(5);
  });
  it("twoForOne: 3 items", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi Voucher",
      code: "VOUCHER",
      price: 5,
      amount: 3,
    };
    newDiscount.twoForOne(mockedProduct);
    expect(mockedProduct.discountedPrice * mockedProduct.amount).toBe(10);
  });
});

describe("buyThreeOneEuroDiscountPerUnit should return recalculated price", () => {
  it("buyThreeOneEuroDiscountPerUnit: 1 item", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi T-Shirt",
      code: "TSHIRT",
      price: 20,
      amount: 1,
    };
    newDiscount.buyThreeOneEuroDiscountPerUnit(mockedProduct);
    expect(mockedProduct.discountedPrice * mockedProduct.amount).toBe(NaN);
  });
  it("buyThreeOneEuroDiscountPerUnit: 2 items", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi T-Shirt",
      code: "TSHIRT",
      price: 20,
      amount: 2,
    };
    newDiscount.buyThreeOneEuroDiscountPerUnit(mockedProduct);
    expect(mockedProduct.discountedPrice * mockedProduct.amount).toBe(NaN);
  });
  it("buyThreeOneEuroDiscountPerUnit: 3 items", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi T-Shirt",
      code: "TSHIRT",
      price: 20,
      amount: 3,
    };
    newDiscount.buyThreeOneEuroDiscountPerUnit(mockedProduct);
    expect(mockedProduct.discountedPrice * mockedProduct.amount).toBe(57);
  });
  it("buyThreeOneEuroDiscountPerUnit: 4 items", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi T-Shirt",
      code: "TSHIRT",
      price: 20,
      amount: 4,
    };
    newDiscount.buyThreeOneEuroDiscountPerUnit(mockedProduct);
    expect(mockedProduct.discountedPrice * mockedProduct.amount).toBe(76);
  });
});

describe("makeDiscountAvailableToProduct should assign discount to products", () => {
  it("Test with a single Product", () => {
    const newDiscount = new Discounts();
    const mockedProduct = {
      name: "Cofi T-Shirt",
      code: "TSHIRT",
      price: 20,
      amount: 4,
    };
    const discountToAssign = newDiscount.twoForOne;
    newDiscount.makeDiscountAvailableToProduct(discountToAssign, [
      mockedProduct,
    ]);
    expect(mockedProduct.discount).toBeDefined();
    expect(mockedProduct.discount).toBe(discountToAssign);
  });
  it("Test with a two Products", () => {
    const newDiscount = new Discounts();
    const mockedProductOne = {
      name: "Cofi T-Shirt",
      code: "TSHIRT",
      price: 20,
    };
    const mockedProductTwo = {
      name: "Cofi Coffe Mug",
      code: "MUG",
      price: 7.5,
    };
    const discountToAssign = newDiscount.twoForOne;
    newDiscount.makeDiscountAvailableToProduct(discountToAssign, [
      mockedProductOne,
      mockedProductTwo,
    ]);
    expect(mockedProductOne.discount).toBeDefined();
    expect(mockedProductOne.discount).toBe(discountToAssign);
    expect(mockedProductTwo.discount).toBeDefined();
    expect(mockedProductTwo.discount).toBe(discountToAssign);
  });
});
