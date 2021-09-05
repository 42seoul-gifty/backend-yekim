const express = require('express');

const router = express.Router();

const receiverController = require('../controllers/receiver');

router.get('/:id', receiverController.readReceiverById);
router.patch('/:id', receiverController.pickProduct);

module.exports = router;
