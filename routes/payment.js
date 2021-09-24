const express = require('express');

const router = express.Router();

const paymentController = require('../controllers/payment');

router.post('/validation', paymentController.checkPayment);

module.exports = router;