const express = require('express');

const router = express.Router();

const indexController = require('../../controllers/admin/index');
router.get('/', indexController.renderIndexPage);

const authRouter = require('./auth');
router.use('/auth', authRouter);

const {isAuthenticated} = require('./middleware');
router.use(isAuthenticated);

const userRouter = require('./user');
router.use('/user', userRouter);

const productRouter = require('./product');
router.use('/product', productRouter);

const orderRouter = require('./order');
router.use('/order', orderRouter);

const appRouter = require('./app');
router.use('/app', appRouter);

module.exports = router;