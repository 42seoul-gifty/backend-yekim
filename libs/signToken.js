const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function(userInfo, refreshTokenFlag) {
    const tokens = {};
    const payload = {
        email: userInfo.email,
        nickname: userInfo.nickname,
    };
    const secret = JWT_SECRET;
    tokens.accessToken = await jwt.sign(payload, secret, {
        expiresIn: '1m',
        issuer: 'Hello'
    });
    if (refreshTokenFlag) {
        tokens.refreshToken = await jwt.sign(payload, secret, {
            expiresIn: '10m',
            issuer: 'World'
        });
    }
    return tokens;
}
