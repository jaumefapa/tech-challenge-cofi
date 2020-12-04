class Product {
  constructor(name, code, price) {
    (this.name = name), (this.code = code), (this.price = price), this.discount;
  }
}

module.exports = {
  Product,
};
