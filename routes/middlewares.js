const { User } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

async function signAccessToken(info) {
    try {
        const jwtAccessToken = await jwt.sign({
            email: info.email,
            nickname: info.nickname,
        }, JWT_SECRET, {
            expiresIn: '2m',
            issuer: 'Hello'
        });
        return jwtAccessToken;
    } catch (err) {
        console.error('access token 갱신 실패:', err);
        next(err);
    }
}

// TODO: [front-end] 논의할 것: 쿠키에 access token, refresh token을 저장해서 소통하는지, 헤더를 통해 소통하는지
// TODO: payload에서 유저 관련 데이터 가져오기
exports.verifyToken = async (req, res, next) => {
    const clientAccessToken = req.headers.accesstoken;
    const clientRefreshToken = req.headers.refreshtoken;
    console.log('client access token:', clientAccessToken);
    console.log('client refresh token:', clientRefreshToken);
    try {
        let accessTokenDecodeResult;
        const refreshTokenDecodeResult = jwt.verify(clientRefreshToken, JWT_SECRET);

        console.log(refreshTokenDecodeResult);
        // accessTokenDecodeResult = jwt.verify(clientAccessToken, JWT_SECRET);
        try {
            accessTokenDecodeResult = jwt.verify(clientAccessToken, JWT_SECRET);
        } catch (err) {
            const jwtAccessToken = await signAccessToken(UserInfo);
            res.json(jwtAccessToken);
            return ;
        }
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        } else {
            return res.status(401).json({
                code: 401,
                message: '유효하지 않은 토큰입니다.'
            });
        }
    }
}