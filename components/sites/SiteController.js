class SiteController{
    //[GET] Home Page
    homePage(req,res){
        res.render('sites/views/index');
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