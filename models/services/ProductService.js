const Product = require('../data/product');

// get all products in database
const add_list = async(reqPage)=>{
    let products = [];
    let pages = [];
    try{
        products = await Product.find().lean();
        const perPage = 8;
        const page = parseInt(reqPage);

        const pro_start = (page - 1) * perPage;
        const pro_end = page * perPage;

        for (let i = 0; i < products.length / perPage; i++){
            let tmp = {};
            tmp.currentPage = i + 1;
            tmp.pageLink = `?page=${i+1}`;
            pages.push(tmp);
        }
        products = products.slice(pro_start, pro_end);

        products = products.map(item => {
            let name = item.name;
            let rate = new Array(item.rate).fill(0);
            if (item.name.length >= 30)
                name = item.name.slice(0, 28) + "...";
            //let productID = "/product/" + item.productID;
            return { ...item, name: name, rate: rate }
        });

        return [products, pages];
    }catch(err){
        console.log({message: err});
    }
    return [products, pages];   
}
// get all information of product by productID
const add_detail = async (productID) => {
    let productDetails = null;
    try{
        productDetails = await Product.findOne({productID: productID}).lean();
        // let indexOfProduct = parseInt(productID.slice(-2));
        // productDetails.productID = "/products/updateProduct/" + productDetails.productID;
        productDetails.rate = new Array(productDetails.rate).fill(0);
        return productDetails;
    }catch (err){
        console.log({message: err});
    }
    return productDetails;
}
// update a product by productID
const updateOneProduct = async (productID, productDetail) => {
    let updateProduct = null;
    try{
        // get old product information
        const oldProductInfo = await Product.findOne({productID: productID}).lean();
        // check if this value of key is "" then assign old value to it
        const keys = Object.keys(productDetail);
        keys.forEach((key, index) => {
            if(productDetail[key] == ""){
                productDetail[key] = oldProductInfo[key];
            }
        });

        updateProduct = await Product.updateOne(
            {"productID": productID},
            {
                $set: {
                    name: productDetail.name,
                    price: productDetail.price,
                    overview: productDetail.overview,
                    rate: productDetail.rate,
                    sale: productDetail.sale,
                    description: productDetail.description,
                    // images: productDetail.images,
                    quantity: productDetail.quantity,
                    categoryID: productDetail.categoryID
                }
            }
        );
        return updateProduct;
    }catch (err){
        console.log({message: err});
    }
    return updateProduct;
}
// delete a product by productID
const deleteOneProduct = async (productID) => {
    let removedProduct = null;
    try{
        removedProduct = await Product.deleteOne({"productID": productID});
        return removedProduct;
    }catch (err){
        console.log({message: err});
    }
    return removedProduct;
}
// get all information of product by productID
const showDetail = async(productID) => {
    let detail = null;
    try{
        detail = await Product.findOne({"productID":productID}).lean();
        detail.rate = new Array(detail.rate).fill(0);
        // split the description to array
        const words = detail.description.split('.');
        // remove the last element because it's just space
        if (words[words.length - 1] === ""){
            words.splice(-1);
        }
        detail.description = words;

        return [detail];
    }catch(err){
        console.log({message:err});
    }
    return [detail];
}
module.exports = {add_list , add_detail, updateOneProduct, deleteOneProduct, showDetail};