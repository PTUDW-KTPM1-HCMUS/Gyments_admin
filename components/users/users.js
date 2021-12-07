const express = require('express');
const router = express.Router();
const UserController = require('./UserController');

router.get('/account',UserController.account);
router.get('/management', UserController.showUserManagement);
router.get('/management/:userID', UserController.getUserDetail);
module.exports = router;
