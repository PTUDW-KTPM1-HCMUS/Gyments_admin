const express = require('express');
const router = express.Router();

const upload = require('../models/services/utils/multer');
const ProductsController = require('../Controller/ProductsController');

router.get('/addProducts',ProductsController.showAddProductPage);

router.post('/addProducts',upload.array("images"), ProductsController.addProduct);
router.get('/:productID',ProductsController.detail);
router.get('/updateProduct/:productID', ProductsController.showUpdatePage);
router.post('/updateProduct/:productID', ProductsController.updateProduct);
router.get('/delete/:productID', ProductsController.deleteProduct);
router.get('/',ProductsController.ProductsPage);



module.exports = router;
