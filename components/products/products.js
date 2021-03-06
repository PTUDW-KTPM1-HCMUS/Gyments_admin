const express = require('express');
const router = express.Router();

const upload = require('../../utils/multer');
const ProductsController = require('./ProductsController');

router.get('/addProducts',ProductsController.showAddProductPage);

router.post('/addProducts',upload.array("images"), ProductsController.addProduct);
router.get('/:productID',ProductsController.detail);
router.get('/updateProduct/:productID', ProductsController.showUpdatePage);
router.post('/updateProduct/:productID',upload.array("images") ,ProductsController.updateProduct);
router.get('/delete/:productID', ProductsController.deleteProduct);
router.get('/',ProductsController.ProductsPage);



module.exports = router;
