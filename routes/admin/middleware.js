exports.isLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        console.error('로그인을 먼저 해야합니다.');
        res.render('admin/index', {
            title: 'admin index page',
            isLoggedIn: false,
        });
    }
};