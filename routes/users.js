const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');

router.get('/account',UserController.account);
router.get('/management', UserController.userManagement);
module.exports = router;
