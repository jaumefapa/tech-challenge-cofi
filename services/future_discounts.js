const basket = {
  total: 0,
  items: {},
  addItem(item) {
    // undo discounts
    this.items[item.productId]
      ? (this.items[item.productId].amount =
          this.items[item.productId].amount + 1)
      : (this.items[item.productId] = { amount: 1, ...item });
    // update this.total
  },
  applyDiscount() {
    for (const productId in this.items) {
    }
  },
  checkout() {
    // applyDiscounts(basket.items)
    for (const productId in this.items) {
      let price = this.items[productId].price;
      let amount = this.items[productId].amount;
      this.total = this.total + price * amount;
    }
    console.log(this.total);
  },
};

const products = {
  idCount: 0,
  list: {},
  createProduct,
};

/**
 * discounts: dicountId[], OPTIONAL
 */
function createProduct(name, code, price, stock, discounts) {
  const newProduct = {
    productId: products.idCount,
    name,
    code,
    price,
    stock,
    discounts,
  };
  products.list[newProduct.productId] = newProduct;
  products.idCount = products.idCount + 1;
}

const discounts = {
  idCount: 0,
  list: {},
  createDiscount,
  // checkDiscountConditions,
  discountType: {
    percentatge(basket, percentatge) {
      return basket - basket * percentatge;
    },
    discountPerUnit(basket, discount) {
      // run code
    },
    xForY(basket, amountToBuy, amountFree) {
      // run code
    },
    amountDiscount(basket, value) {
      return basket - value;
    },
  },

  makeDiscountAvailableToProduct(discountId, arrayProductsIds) {
    arrayProductsIds.forEach((productId) => {
      products.list[productId].discounts.push(discountId);
      discounts.list[discountId].discountableProducts.push(productId);
    });
  },

  applyDiscount(type, target, value) {
    if (checkDiscountConditions(conditions))
      discounts.discountType[type](basket, value);
  },
};

/**
 * @param {string} name
 * @param {string} type
 * @param {boolean} stackable
 */
function createDiscount(
  name,
  type,
  value,
  conditions,
  target,
  stackable,
  arrayProductsIds
) {
  const newDiscount = {
    discountId: discounts.idCount,
    name,
    type,
    value,
    conditions,
    target,
    stackable,
    discountableProducts: [],
  };
  discounts.idCount + 1;
  discounts.list.push(newDiscount);
  discounts.makeDiscountAvailableToProduct(
    newDiscount.discountId,
    arrayProductsIds
  );
}

// Creating items
createProduct("Cofi t-shirt", "TSHIRT", 20, 100);
createProduct("Cofi Voucher", "VOUCHER", 5, 50);
createProduct("Cofi Coffee Mug", "MUG", 7.5, 60);

// Adding items to the basket
basket.addItem(products.list[1]);
basket.addItem(products.list[1]);
basket.addItem(products.list[0]);
basket.addItem(products.list[2]);
console.log(basket.items);
basket.checkout();
