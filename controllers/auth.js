const axios = require('axios');
const { User } = require('../models');
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
                email: accountInfo.email
            },
            defaults: { phone: '01050175933' },
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
        const authCode = req.headers.authorization;
        console.log("[DEBUG] 클라이언트로부터 받은 인가코드: ", authCode);
        const userInfo = await getUserInfoFromKakao(authCode);
        const { kakao_account } = userInfo.data;
        const userFromDB = getUserInfoFromDB(kakao_account);
        const { accessToken, refreshToken } = await signToken(userFromDB, true);
        // token 수령 확인
        const data = {
            access_token: accessToken,
            refresh_token: refreshToken,
        }
        const ret = setResponseForm(true, data, 'jwt 토큰이 발급되었습니다.');
        res.json(ret);
    } catch (err) {
        console.error('jwt token 설정 오류:', err.data);
        next(err);
    }
}

// TODO: [front-end] 협의 후에, 쿠키로 저장하게 되면 쿠키에 있는 jwt 파기 / DB에 저장한다면 DB jwt 파기
exports.unsetJwt = function (req, res, next) {
    req.session.token = "";
    req.session.destroy(function(err) {
        console.error(err);
    });
    res.redirect('/');
}