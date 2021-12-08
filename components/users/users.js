const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const UserController = require('./UserController');

router.get('/profile', UserController.getProfilePage);
router.get('/management', UserController.showUserManagement);
router.get('/management/:userID', UserController.getUserDetail);
router.get('/addAccount', UserController.getAddAccountPage);
router.post('/addAccount', upload.single("avatar"), UserController.addAccount);
module.exports = router;
