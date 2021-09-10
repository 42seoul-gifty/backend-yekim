const { User } = require('../models');
const jwt = require('jsonwebtoken');
const signToken = require('../libs/signToken');
const getUserDetailForm = require('../libs/getUserDetailForm');
const setResponseForm = require('../libs/setResponseForm');
const JWT_SECRET = process.env.JWT_SECRET;

// TODO: [front-end] 논의할 것: 쿠키에 access token, refresh token을 저장해서 소통하는지, 헤더를 통해 소통하는지
// TODO: payload에서 유저 관련 데이터 가져오기
exports.verifyToken = async (req, res, next) => {
    const clientAccessToken = req.headers['access-token'];
    const clientRefreshToken = req.headers['refresh-token'];
    console.log('client access token:', clientAccessToken);
    console.log('client refresh token:', clientRefreshToken);
    try {
        jwt.verify(clientRefreshToken, JWT_SECRET);
        const user = await User.findOne({
            where: { token: clientRefreshToken },
        });
        try {
            jwt.verify(clientAccessToken, JWT_SECRET);
            next();
        } catch (err) {
            const tokens = await signToken(user.dataValues, false);
            const userDetail = await getUserDetailForm(user);
            console.log(tokens);
            const data = {
                access_token: tokens.accessToken,
                // TODO: refresh token도 새로 발급받아야하지는 않겠지? 고민해보기
                refresh_token: clientRefreshToken,
                // refresh_token: tokens.refreshToken,
                user: userDetail,
            }
            const msg = '서버로부터 access 토큰이 재발급 되었습니다.'
            const ret = setResponseForm(true, data, msg)
            return res.json(ret);
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.json({
                code: 419,
                message: '[토큰이 만료] 로그인을 다시 해주세요.'
            });
        } else {
            return res.json({
                code: 401,
                message: '[유효하지 않은 토큰] 로그인을 다시 해주세요.'
            });
        }
    }
}