const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: "Login Service",
        code: undefined,
    })
});

const { verifyToken } = require('./middlewares');
router.get('/profile', verifyToken, (req, res, next) => {
    res.send('프로필 페이지 입니다.');
});

const authController = require('../controllers/auth');
router.get('/login', authController.getTokens);
router.post('/logout', authController.unsetJwt);

const userRouter = require('../routes/user');
router.use('/users', userRouter);

const receiverRouter = require('../routes/receiver');
router.use('/receiver', receiverRouter);

module.exports = router;