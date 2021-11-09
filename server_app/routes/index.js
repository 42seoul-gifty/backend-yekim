const express = require('express');

const router = express.Router();

const metaInformationController = require('../controllers/index');
router.get('/', (req, res, next) => {
    res.render('index', {
        title: "Login Service",
        code: undefined,
    })
});
router.get('/genders', metaInformationController.getGenders);
router.get('/ages', metaInformationController.getAges);
router.get('/prices', metaInformationController.getPrices);


const { verifyToken } = require('./middlewares');
router.get('/profile', verifyToken, (req, res, next) => {
    res.send('프로필 페이지 입니다.');
});

const authController = require('../controllers/auth');
router.get('/login/kakao', authController.setTokenAboutKakao);
router.get('/token/refresh', authController.renewToken);
router.post('/logout', authController.removeToken);

//router.use(verifyToken);

const productRouter = require('../routes/product');
router.use('/products', productRouter);

const userRouter = require('../routes/user');
router.use('/users', userRouter);

const receiverRouter = require('../routes/receiver');
router.use('/receiver', receiverRouter);

const paymentRouter = require('../routes/payment');
router.use('/payment', paymentRouter);

module.exports = router;
