const express = require('express');
const router = express.Router();

const ProductsController = require('../Controller/ProductsController');


router.get('/addProducts',ProductsController.add);
router.get('/',ProductsController.Productpage);



module.exports = router;
