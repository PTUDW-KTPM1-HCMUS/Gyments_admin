const apiService = require('./apiService');
const moment = require("moment");

class ApiController{
    async getData(req,res){
        let startOf2WeekBefore = moment().subtract(2, 'weeks').startOf('week').toDate();
        // let endOf2WeekBefore = moment().subtract(2, 'weeks').endOf('week').toDate();
        //
        // let startOfPreviousWeek = moment().subtract(1, 'weeks').startOf('week').toDate();
        // let endOfPreviousWeek = moment().subtract(1, 'weeks').endOf('week').toDate();
        //
        // let startOfWeek = moment().startOf('week').toDate();
        let endOfWeek = moment().endOf('week').toDate();
        const data = await apiService.getOrderBetween2Day(startOf2WeekBefore, endOfWeek);
        res.status(201).json(data);
    }
    async getTotalSales(req, res){
        const data = await apiService.getTotalSales();
        res.status(201).json(data);
    }
}
module.exports = new ApiController;