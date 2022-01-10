const express = require('express');
const router = express.Router();
const orderController = require('./OrderController');

router.get('/:orderID',orderController.getOrderDetail);
router.post('/:orderID',orderController.updateStatus);
router.get('/',orderController.getOrderPage);

module.exports = router;