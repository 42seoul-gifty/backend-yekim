const express = require('express');

const router = express.Router();

const receiverController = require('../controllers/receiver');

router.get('/:id', receiverController.readReceiverById);
router.patch('/:id', receiverController.pickProduct);
router.get('/:id/choice', receiverController.getReceiverChoice);
router.get('/:id/choice', receiverController.getReceiverChoice);

module.exports = router;
