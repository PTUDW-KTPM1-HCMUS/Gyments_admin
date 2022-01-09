const Order = require("../orders/OrderModel");
const Product = require("../products/ProductModel");

class SiteService {
  async getTop10Product() {
    const orders = await Order.find().lean();
    const products = await Product.find().lean();
    const top10Products = [];
    for (let i = 0; i < products.length; i++) {
      let temp = {};
      temp.id = products[i]._id.toString();
      temp.name = products[i].name;
      temp.price = products[i].price;
      temp.discount = products[i].sale;
      temp.quantity = products[i].quantity;
      temp.sold = 0;
      top10Products.push(temp);
    }
    for (let k = 0; k < top10Products.length; k++) {
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].products.length; j++) {
          if (orders[i].products[j]._id.toString() === top10Products[k].id) {
            top10Products[k].sold += orders[i].products[j].inCart;
          }
        }
      }
    }
    // sort in descending order
    top10Products.sort(function (a, b) {
      return parseInt(b.sold) - parseInt(a.sold);
    });
    // take first 10 products
    return top10Products.slice(0, 10);
  }
}

module.exports = new SiteService();