const express = require('express');

const router = express.Router();

const indexController = require('../../controllers/admin/index');
router.get('/', indexController.renderIndexPage);

const authRouter = require('../../routes/admin/auth');
router.use('/auth', authRouter);

const productRouter = require('./product');
router.use('/product', productRouter);

module.exports = router;