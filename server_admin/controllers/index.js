exports.renderIndexPage = function (req, res, next) {
    res.render('index', {
        title: 'admin index page',
        isLoggedIn: req.session.isLoggedIn,
    });
}

