

exports.renderLoginPage = function (req, res, next) {
    res.render('admin/login', {
        title: 'admin login page',
    });
}

exports.saveDataInSession = function (req, res, next) {
    console.log("session 저장");
    req.session.isLoggedIn = true;
    req.session.save(function() {
        console.log('session save...');
        res.redirect('/admin');
    });
}

exports.signOut = function (req, res, next) {
    req.logout();
    req.session.isLoggedIn = false;
    req.session.save(function() {
        res.redirect('/admin');
    })
};