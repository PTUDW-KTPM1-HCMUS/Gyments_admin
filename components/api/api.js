const express = require('express');
const router = express.Router();
const apiController = require('./apiController');

router.get('/order/getData', apiController.getData);
router.get('/order/getTotalSales', apiController.getTotalSales);

module.exports = router;