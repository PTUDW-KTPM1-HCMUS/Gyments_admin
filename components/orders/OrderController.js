
const orderService = require('./OrderService');


class OrderController{
    async getOrderPage(req, res){
        // const orders = await orderService.getAllOrder();
        try {
            let currentPage = req.query.page || 1;
            let option = req.query.options || "All";
            let customer = req.query.customer || "";
            const [orders, completeOrder, deliveryOrder, cancelOrder, pages] =
                await orderService.getAllOrder(currentPage, option, customer);
            let previous =
                Math.ceil(parseInt(currentPage) - 1) < 1
                    ? 1
                    : Math.ceil(parseInt(currentPage) - 1);
            let next =
                Math.ceil(parseInt(currentPage) + 1) > pages.length
                    ? pages.length
                    : Math.ceil(parseInt(currentPage) + 1);
            let length = true; // check if search for 1 user or multiple
            if (customer.length !== 0 || orders.length === 1) length = false;
            res.render("orders/views/orders", {
                orders,
                completeOrder,
                deliveryOrder,
                cancelOrder,
                pages,
                currentPage,
                previous,
                next,
                option,
                customer,
                length,
            });
        } catch (err) {
            console.log({ message: err });
        }
    }
    async getOrderDetail(req, res){
        const order = await orderService.getDetail(req.params.orderID);
        const status = req.query['success']!== undefined;
        res.render('orders/views/orderDetail', {order, status});
    }
    async updateStatus(req, res){
        const status = req.body.options;
        const orderID = req.params.orderID;
        const order = await orderService.updateStatus(req.params.orderID, status);
        res.redirect('/orders/' + orderID +"?success");
    }
}
module.exports = new OrderController();