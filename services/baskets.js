class Basket {
  constructor() {
    this.grandTotal = 0;
    this.items = {};
  }
  addItem(item) {
    this.items[item.code]
      ? (this.items[item.code].amount = this.items[item.code].amount + 1)
      : (this.items[item.code] = { amount: 1, ...item });
  }

  applyDiscount() {
    for (const code in this.items) {
      const product = this.items[code];
      product.discount && product.discount(product);
    }
  }

  checkout() {
    this.applyDiscount();
    for (const code in this.items) {
      let price = this.items[code].discountedPrice || this.items[code].price;
      let amount = this.items[code].amount;
      this.grandTotal = this.grandTotal + price * amount;
    }
    return this.grandTotal;
  }
}

module.exports = {
  Basket,
};
