var express = require('express');
var router = express.Router();

/* GET chart page. */
router.get('/', function(req, res, next) {
    res.render('charts', { title: 'Chart' });
});



module.exports = router;
