var express = require('express');
var router = express.Router();

/* GET order page. */
router.get('/', function(req, res, next) {
    res.render('orders', { title: 'Order' });
});



module.exports = router;
