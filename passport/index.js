const { Admin } = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.serializeUser(function(user, done) {
        console.log('serializeUser', user);
        done(null, user.email);
    });

    passport.deserializeUser(async function(id, done) {
        try {
            const admin = await Admin.findOne({
                where: { email: id },
            });
            done(null, admin.dataValues);
        } catch (err) {
            console.log('', err);
        }
    });

    // 사용자가 로그인에 성공여부에 따른 동작을 수행합니다.
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        async function (email, password, done) {
            try {
                const admin = await Admin.findOne({
                    where: { email: email },
                });
                if (admin.password == password) {
                    return done(null, admin.dataValues);
                } else {
                    return done(false, null);
                }
            } catch (err) {
                console.error("없는 계정입니다.", err);
                return done(null, false, {
                    message: '일치하지 않는 email 입니다.'
                });
            }
        }
    ));
}