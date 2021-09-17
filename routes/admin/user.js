const express = require('express');

const router = express.Router();

const userController = require('../../controllers/admin/user');

router.get('/', userController.renderUserMange);
router.get('/manage', userController.getUsers);

module.exports = router;