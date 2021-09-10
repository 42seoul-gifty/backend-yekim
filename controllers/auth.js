const axios = require('axios');
const { User } = require('../models');
const getUserDetailForm = require('../libs/getUserDetailForm');
const setResponseForm = require('../libs/setResponseForm');
const signToken = require('../libs/signToken');

const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

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
        const [ userFromDB, created ] = await User.findOrCreate({
            where: {
                name: accountInfo.profile.nickname,
                email: accountInfo.email,
                loginType: 1,
            },
        });
        const userName = userFromDB.dataValues.name;
        if (created) {
            console.log(`[DEBUG] 새로운 유저(${userName})가 등록되었습니다.`);
        } else {
            console.log(`[DEBUG] 기존 유저(${userName})가 로그인했습니다.`);
        }
        return(userFromDB);
    } catch (err) {
        console.error('로그인 시 유저 조회 오류:', err);
    }
}

exports.getTokens = async function(req, res, next) {
    try {
        const authCode = req.headers['authorization-code'];
        console.log("[DEBUG] 클라이언트로부터 받은 인가코드: ", authCode);
        const userInfo = await getUserInfoFromKakao(authCode);
        const { kakao_account } = userInfo.data;
        const userFromDB = await getUserInfoFromDB(kakao_account);
        const { accessToken, refreshToken } = await signToken(userFromDB, true);
        // User 모델에 token 추가
        userFromDB.token = refreshToken;
        await userFromDB.save({ fields: [ 'token' ] });
        const userDetail = await getUserDetailForm(userFromDB);

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
        const ret = setResponseForm(true, "", msg);
        res.json(ret);
    }
}

exports.removeToken = async function (req, res, next) {
    try {
        const user = await User.findOne({
            where: { token: req.headers['refresh_token'] },
        })
        user.token = "";
        await user.save({ fields: [ 'token' ] });

        const msg = '로그아웃 처리 되었습니다.';
        const ret = setResponseForm(true, "", msg);
        res.json(ret);
    } catch (err) {
        console.error('로그아웃 오류', err);
        next(err);
    }
}