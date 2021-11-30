var express = require('express');
var router = express.Router();

/* GET setting page. */
router.get('/', function(req, res, next) {
    res.render('settings', { title: 'Setting' });
});



module.exports = router;
