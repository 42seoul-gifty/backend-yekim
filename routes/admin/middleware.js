exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {

        res.redirect('/admin')
        // res.render('admin/index', {
        //     title: 'admin index page',
        //     isLoggedIn: false,
        // });
    }
};