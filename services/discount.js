class Discounts {
  constructor() {}

  twoForOne(product) {
    let freeItems = Math.floor(product.amount / 2);
    product.discountedPrice =
      ((product.amount - freeItems) * product.price) / product.amount;
  }

  buyThreeOneEuroDiscountPerUnit(product) {
    if (product.amount / 3 >= 1) product.discountedPrice = product.price - 1;
  }

  makeDiscountAvailableToProduct(discountName, arrayProducts) {
    arrayProducts.forEach((product) => {
      product.discount = discountName;
    });
  }
}

module.exports = {
  Discounts,
};
