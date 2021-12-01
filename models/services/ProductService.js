const Product = require('../data/product');


const add_list = async(reqPage)=>{
    let products = [];
    let pages = [];
    try{
        products = await Product.find().lean();
        const perPage = 9;
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
            let productID = "/products/updateProduct/" + item.productID;
            return { ...item, name: name,  rate: rate, productID: productID}
        });

        return [products, pages];
    }catch(err){
        console.log({message: err});
    }
    return [products, pages]
}

const add_detail = async (productID) => {
    let productDetails = null;
    try{
        productDetails = await Product.findOne({productID: productID}).lean();
        // let indexOfProduct = parseInt(productID.slice(-2));
        productDetails.productID = "/products/updateProduct/" + productDetails.productID;
        productDetails.rate = new Array(productDetails.rate).fill(0);
        return productDetails;
    }catch (err){
        console.log({message: err});
    }
    return productDetails;
}
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
module.exports = {add_list , add_detail, updateOneProduct};