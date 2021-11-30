var express = require('express');
var router = express.Router();

/* GET notification page. */
router.get('/', function(req, res, next) {
    res.render('notifications', { title: 'Notification' });
});



module.exports = router;
