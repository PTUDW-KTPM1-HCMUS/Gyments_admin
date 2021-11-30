var express = require('express');
var router = express.Router();

/* GET AddProducts page. */
router.get('/', function(req, res, next) {
    res.render('addProducts', { title: 'Add - Product' });
});



module.exports = router;
