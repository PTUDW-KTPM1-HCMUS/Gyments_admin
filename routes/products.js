const express = require('express');
const router = express.Router();

const ProductsController = require('../Controller/ProductsController');


//router.get('/addProducts',ProductsController.addProduct);
router.get('/',ProductsController.ProductsPage);



module.exports = router;
