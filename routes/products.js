const express = require('express');
const router = express.Router();

const ProductsController = require('../Controller/ProductsController');


router.get('/addProducts',ProductsController.addProduct);
router.get('/updateProduct/:productID', ProductsController.showUpdatePage);
router.post('/updateProduct/:productID', ProductsController.updateProduct);
router.get('/',ProductsController.ProductsPage);



module.exports = router;
