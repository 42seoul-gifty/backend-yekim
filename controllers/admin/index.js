exports.renderIndexPage = function (req, res, next) {
    res.render('admin/index', {
        title: 'admin index page',
        isLoggedIn: req.session.isLoggedIn,
    });
}

