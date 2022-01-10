const Order = require('./OrderModel');
const moment = require('moment');

class OrderService {
  async getAllOrder(reqPage, option, customer) {
    let orders = [];
    let completeOrder = [];
    let deliveryOrder = [];
    let cancelOrder = [];
    let pages = [];
    try{
      if (customer.length !== 0){ // find order of one user
        if (option === "All"){
          orders = await Order.find({customerID: {$regex : customer}}).lean();
          completeOrder = await Order.find({customerID: {$regex : customer}, status: "Completed"}).lean();
          deliveryOrder =  await Order.find({customerID: {$regex : customer}, status: "Delivery"}).lean();
          cancelOrder =  await Order.find({customerID: {$regex : customer}, status: "Cancelled"}).lean();
        } else if (option === "Week"){ // find all order in a week
          let startOfWeek = moment().startOf('week').toDate();
          let endOfWeek = moment().endOf('week').toDate();
          orders = await Order.find({customerID: {$regex : customer}, date: { $gte: startOfWeek, $lte: endOfWeek}}).lean();
          completeOrder = await Order.find({customerID: {$regex : customer},date: { $gte: startOfWeek, $lte: endOfWeek}, status: "Completed"}).lean();
          deliveryOrder =  await Order.find({customerID: {$regex : customer},date: { $gte: startOfWeek, $lte: endOfWeek}, status: "Delivery"}).lean();
          cancelOrder =  await Order.find({customerID: {$regex : customer},date: { $gte: startOfWeek, $lte: endOfWeek}, status: "Cancelled"}).lean();
        } else if (option === "Month"){
          let startOfMonth = moment().startOf('month').toDate();
          let endOfMonth = moment().endOf('month').toDate();
          orders = await Order.find({customerID: {$regex : customer},date: { $gte: startOfMonth, $lte: endOfMonth}}).lean();
          completeOrder = await Order.find({customerID: {$regex : customer},date: { $gte: startOfMonth, $lte: endOfMonth}, status: "Completed"}).lean();
          deliveryOrder =  await Order.find({customerID: {$regex : customer},date: { $gte: startOfMonth, $lte: endOfMonth}, status: "Delivery"}).lean();
          cancelOrder =  await Order.find({customerID: {$regex : customer},date: { $gte: startOfMonth, $lte: endOfMonth}, status: "Cancelled"}).lean();
        }
      } else{
        // find all order
        if (option === "All"){
          orders = await Order.find().lean();
          completeOrder = await Order.find({status: "Completed"}).lean();
          deliveryOrder =  await Order.find({status: "Delivery"}).lean();
          cancelOrder =  await Order.find({status: "Cancelled"}).lean();
        } else if (option === "Week"){ // find all order in a week
          let startOfWeek = moment().startOf('week').toDate();
          let endOfWeek = moment().endOf('week').toDate();
          orders = await Order.find({date: { $gte: startOfWeek, $lte: endOfWeek}}).lean();
          completeOrder = await Order.find({date: { $gte: startOfWeek, $lte: endOfWeek}, status: "Completed"}).lean();
          deliveryOrder =  await Order.find({date: { $gte: startOfWeek, $lte: endOfWeek}, status: "Delivery"}).lean();
          cancelOrder =  await Order.find({date: { $gte: startOfWeek, $lte: endOfWeek}, status: "Cancelled"}).lean();
        } else if (option === "Month"){
          let startOfMonth = moment().startOf('month').toDate();
          let endOfMonth = moment().endOf('month').toDate();
          orders = await Order.find({date: { $gte: startOfMonth, $lte: endOfMonth}}).lean();
          completeOrder = await Order.find({date: { $gte: startOfMonth, $lte: endOfMonth}, status: "Completed"}).lean();
          deliveryOrder =  await Order.find({date: { $gte: startOfMonth, $lte: endOfMonth}, status: "Delivery"}).lean();
          cancelOrder =  await Order.find({date: { $gte: startOfMonth, $lte: endOfMonth}, status: "Cancelled"}).lean();
        }
      }
      const perPage = 6;
      const page = parseInt(reqPage);
      const start = (page - 1) * perPage;
      const end = page * perPage;

      for (let i = 0; i < orders.length / perPage; i++){
        let temp = {};
        temp.currentPage = i + 1;
        temp.pageLink = `?customer=${customer}&options=${option}&page=${i+1}`;
        pages.push(temp);
      }
      orders = orders.slice(start, end);
      return [orders, completeOrder, deliveryOrder, cancelOrder, pages];
    } catch(err){
      console.log({message: err});
    }
    return [orders, completeOrder, deliveryOrder, cancelOrder, pages];
  }
  async getDetail(orderID){
    return await Order.findById(orderID).lean();
  }
  async updateStatus(orderID, status){
    return await Order.findOneAndUpdate({_id: orderID}, {$set: {status: status}});
  }
}
module.exports = new OrderService();