const { expect, it } = require("@jest/globals");
const { Product } = require("../../services/product");

describe("Testing Product constructor", () => {
  it("Should create a new product", () => {
    const newProduct = new Product("Cofi Voucher", "VOUCHER", 5);
    expect(newProduct.name).toBe("Cofi Voucher");
    expect(newProduct.code).toBe("VOUCHER");
    expect(newProduct.price).toBe(5);
    expect(newProduct.discounts).toBe(undefined);
  });
});
