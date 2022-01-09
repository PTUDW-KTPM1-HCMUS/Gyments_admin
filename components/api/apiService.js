const Order = require("../orders/OrderModel");
const Comment = require("../../models/reviewModel");
const moment = require("moment");

class apiService {
  async getOrderBetween2Day(startDay, endDay) {
    let orders = await Order
      .find({ date: { $gte: startDay, $lte: endDay } })
      .lean();
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let pos = 0;
    for (let i = moment(startDay); i.isSameOrBefore(moment(endDay)); i.add(1, "days")) {
      for (let j=0;j<orders.length;j++){
        if (moment(orders[j].date).format("l") === i.format("l")){
          data[pos] += orders[j].totalCost;
        }
      }
      pos++;
    }
    return data;
  }
  async getTotalSales(){
    const orders = await Order.find().lean();
    const review = await Comment.find().lean();
    const data = [0,orders.length, review.length];
    for (let i = 0; i < orders.length;i++){
      data[0] += orders[i].totalCost;
    }
    return data;
  }
}

module.exports = new apiService();
