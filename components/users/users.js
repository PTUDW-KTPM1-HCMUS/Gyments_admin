const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const UserController = require('./UserController');

router.get('/profile', UserController.getProfilePage);
router.get('/management', UserController.showUserManagement);
// router.get('/management/:userID', UserController.getUserDetail);
router.get('/management/:id/ban', UserController.banAccount);
router.get('/management/:id/unban', UserController.unbanAccount);
router.get('/addAccount', UserController.getAddAccountPage);
router.post('/addAccount',  UserController.addAccount);
router.post('/profile/changename',  UserController.changename);
router.post('/profile/changeemail', UserController.changeemail);
router.post('/profile/changeaddress',  UserController.changeaddress);
router.post('/profile/changephone',  UserController.changephone);
router.post('/profile/changeavatar',  upload.single("avatar"), UserController.changeavatar);
router.post('/profile/changepass', UserController.changepassword);
module.exports = router;
