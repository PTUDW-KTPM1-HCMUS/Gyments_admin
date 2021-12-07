const service = require('./ProductService');

class ProductsController{
    //[GET] products Page
    async ProductsPage(req,res){
        try{
            let currentPage = req.query.page || 1;
            const [products, pages] = await service.getProductList(currentPage);
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            res.render('products/views/products',{products, pages, currentPage,previous,next});
        }catch(err){
            console.log({message: err});
        }
    }
    //[GET] add new product page
    showAddProductPage(req,res){
        res.render('products/views/addProducts');
    }
    //[GET] products update Page
    async showUpdatePage(req, res){
        try{
            const productDetails = await service.getProduct(req.params.productID);
            res.render('products/views/updateProduct',{productDetails});
        }catch(err){
            console.log({message: err});
        }
    }
    // [POST] update product information
    async updateProduct(req, res){
        try{
            const updatedProduct = await service.updateOneProduct(req.params.productID, req.body, req.files);
            const productDetails = await service.getProduct(req.params.productID);
            res.render('products/views/updateProduct', {productDetails});
        }catch(err){
            console.log({message: err});
        }
    }
    // [DELETE] delete a product
    async deleteProduct(req, res){
        try{
            const deletedProduct = await service.deleteOneProduct(req.params.productID);
            res.redirect('/products');
        }catch(err){
            console.log({message: err});
        }
    }
    // [GET] get product detail
    async detail(req,res){
        try{
            const [detail] = await service.showDetail(req.params.productID);
            let newPrice = detail.price - detail.price * detail.sale / 100;
            res.render('products/views/productsDetail',{detail,newPrice});
        }catch(err){
            console.log({message:err});
        }
    }
    // [POST] add new product
    async addProduct(req, res){
        try{

            const newProduct = await service.addOneProduct(req.body,req.files);
            res.render('products/views/addProducts');
        }catch (err){
            console.log({message: err});
        }
    }
}

module.exports = new ProductsController;