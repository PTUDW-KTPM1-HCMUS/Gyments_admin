const siteService = require('./SiteService');
class SiteController{
    //[GET] Home Page
    async homePage(req,res){
        const top10Products = await siteService.getTop10Product();
        res.render('sites/views/index', {top10Products});
    }

    //[GET] notifications
    noti(req,res){
        res.render('sites/views/notifications');
    }

    //[GET] charts
    charts(req,res){
        res.render('sites/views/charts');
    }

    //[GET] helps
    helps(req,res){
        res.render('sites/views/help');
    }

    //[GET] orders
    orders(req,res){
        res.render('sites/views/orders');
    }
}

module.exports = new SiteController;