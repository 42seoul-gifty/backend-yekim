const express = require('express');

const router = express.Router();

const KAKAO_CLIENT_SECRET = '1ba26f09773c4e4473835dabe091a18a';
const KAKAO_REDIRECT_URI = 'http://localhost:4242/auth/code'

async function getAuthCode(req, res, next) {
    const url = 'https://kauth.kakao.com/oauth/authorize'
    let params = "";
    params += `?response_type=code`;
    params += `&client_id=${KAKAO_CLIENT_SECRET}`;
    params += `&redirect_uri=${KAKAO_REDIRECT_URI}`;
    res.redirect(url + params);
};

router.get('/', getAuthCode);
router.get('/code', async function (req, res, next) {
    res.render('index', {
        title: 'Login Service',
        code: req.query.code,
    });
})

module.exports = router;