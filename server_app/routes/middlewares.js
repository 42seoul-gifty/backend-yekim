const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = async (req, res, next) => {
    const accessTokenFromClient = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(accessTokenFromClient, JWT_SECRET);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.json({
                code: 419,
                message: '[토큰 만료] access token을 갱신해주세요.'
            });
        } else {
            return res.json({
                code: 401,
                message: '[유효하지 않은 토큰] 로그인을 다시 해주세요.'
            });
        }
    }
}