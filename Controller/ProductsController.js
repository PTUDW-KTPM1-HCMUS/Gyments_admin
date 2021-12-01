const service = require('../models/services/ProductService');

class ProductsController{
    //[GET] products Page
    async ProductsPage(req,res){
        try{
            let currentPage = req.query.page || 1;
            
            const [products, pages] = await service.add_list(currentPage);
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            res.render('products/products',{products, pages, currentPage,previous,next});
        }catch(err){
            console.log({message: err});
        }
    }
    addProduct(req,res){
        res.render('products/addProducts');
    }
    //[GET] products update Page
    async updateProduct(req, res){
        try{
            const [productDetails] = await service.add_detail(req.params.productID);
            res.render('products/updateProduct',{productDetails});
        }catch(err){
            console.log({message: err});
        }
    }
}

module.exports = new ProductsController;