const express = require('express');
const router = express.Router();

/* GET product page. */
router.get('/', function(req, res, next) {
    res.render('products', { title: 'Products' });
});



module.exports = router;
