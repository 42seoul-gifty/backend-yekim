const express = require('express');

const router = express.Router();

const appController = require('../../controllers/admin/app');

router.get('/', appController.renderAppMange);
router.post('/', appController.saveAppManageOption);

module.exports = router;