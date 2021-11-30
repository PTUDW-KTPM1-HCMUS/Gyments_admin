class SiteController{
    //[GET] products Page
    Productpage(req,res){
        res.render('products/products');
    }
    add(req,res){
        res.render('products/addProducts');
    }
}

module.exports = new SiteController;