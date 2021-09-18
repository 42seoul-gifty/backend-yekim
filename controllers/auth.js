const axios = require('axios');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const getUserDetailForm = require('../libs/getUserDetailForm');
const setResponseForm = require('../libs/setResponseForm');
const signToken = require('../libs/signToken');

const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

async function getUserInfoFromKakao(authCode) {
    const url = 'https://kauth.kakao.com/oauth/token';
    let params = "";
    params += `?grant_type=authorization_code`;
    params += `&client_id=${KAKAO_CLIENT_SECRET}`;
    params += `&redirect_uri=${KAKAO_REDIRECT_URI}`;
    params += `&code=${authCode}`;
    const axiosResult = await axios.post(url + params);
    const accessToken = axiosResult.data.access_token;
    const refreshToken = axiosResult.data.refresh_token;

    console.log("[DEBUG] accessToken from kakao: ", accessToken);
    console.log("[DEBUG] refreshToken from kakao: ", refreshToken);

    const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return userInfo;
}

async function getUserInfoFromDB(accountInfo) {
    try {
        const [userFromDB, created] = await User.findOrCreate({
            where: {
                name: accountInfo.profile.nickname,
                email: accountInfo.email,
            },
        });
        const userName = userFromDB.dataValues.name;
        if (created) {
            console.log(`[DEBUG] 새로운 유저(${userName})가 등록되었습니다.`);
        } else {
            console.log(`[DEBUG] 기존 유저(${userName})가 로그인했습니다.`);
        }
        return (userFromDB);
    } catch (err) {
        console.error('로그인 시 유저 조회 오류:', err);
    }
}

exports.setTokenAboutKakao = async function (req, res, next) {
    try {
        const authCode = req.headers['authorization-code'];
        const userInfo = await getUserInfoFromKakao(authCode);
        const {kakao_account} = userInfo.data;
        const user = await getUserInfoFromDB(kakao_account);
        const {accessToken, refreshToken} = await signToken(user, true);
        user.token = refreshToken;
        user.loginType = 1;
        await user.save({fields: ['token']});
        const userDetail = await getUserDetailForm(user);

        const data = {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: userDetail,
        }
        const msg = '서버로부터 jwt 토큰이 발급되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.error('jwt token 설정 오류 [kakao로부터 받은 auth code 만료]:', err.data);
        const msg = 'kakao auth code가 만료되었습니다.';
        const ret = setResponseForm(false, "", msg);
        res.json(ret);
    }
}

// TODO: 로그인 페이지로 redirection
// error case 참고: https://github.com/auth0/node-jsonwebtoken
exports.renewToken = async function (req, res, next) {
    const refreshTokenFromClient = req.headers.authorization.split(' ')[1];
    try {
        const user = await User.findOne({
            where: {token: refreshTokenFromClient},
        })
        jwt.verify(refreshTokenFromClient, JWT_SECRET)
        const {accessToken, refreshToken} = await signToken(user, true);

        const data = {
            access_token: accessToken,
            refresh_token: refreshToken,
        }
        const msg = '서버로부터 jwt 토큰이 재발급되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.error('user 조회 실패 혹은 refresh token 기간 만료', err);
        return res.json({
            code: 401,
            message: '[유효하지 않은 토큰] 로그인을 다시 해주세요.'
        });
    }
}

exports.removeToken = async function (req, res, next) {
    try {
        const user = await User.findOne({
            where: {token: req.headers['refresh_token']},
        })
        user.token = "";
        await user.save({fields: ['token']});

        const msg = '로그아웃 처리 되었습니다.';
        const ret = setResponseForm(true, "", msg);
        res.json(ret);
    } catch (err) {
        console.error('로그아웃 오류', err);
        next(err);
    }
}