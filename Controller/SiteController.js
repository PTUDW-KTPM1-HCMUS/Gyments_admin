class SiteController{
    //[GET] Home Page
    homePage(req,res){
        res.render('site/index');
    }

    //[GET] notifications
    noti(req,res){
        res.render('site/notifications');
    }

    //[GET] charts
    charts(req,res){
        res.render('site/charts');
    }

    //[GET] helps
    helps(req,res){
        res.render('site/help');
    }

    //[GET] orders
    orders(req,res){
        res.render('site/orders');
    }

    // //[GET] About Page
    // about(req,res){
    //     res.render('site/about');
    // }

    // //[GET] testimonial
    // testimonial(req,res){
    //     res.render('site/testimonial');
    // }

    // //[GET] whyUs
    // why(req,res){
    //     res.render('site/whyUs');
    // }

    // //[GET] login Page
    // login(req,res){
    //     res.render('site/login');
    // }

    // //[GET] register Page
    // register(req,res){
    //     res.render('site/register');
    // }
}

module.exports = new SiteController;