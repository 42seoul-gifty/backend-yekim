const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.renderUserMange);
router.get('/manage', userController.getUsers);
router.get('/detail', userController.renderUserDetail);

module.exports = router;