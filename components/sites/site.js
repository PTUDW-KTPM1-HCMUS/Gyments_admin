const express = require('express');
const router = express.Router();
const SiteController = require('./SiteController');


router.get('/help',SiteController.helps);
router.get('/charts',SiteController.charts);
router.get('/notifications', SiteController.noti);
router.get('/',SiteController.homePage);

module.exports = router;