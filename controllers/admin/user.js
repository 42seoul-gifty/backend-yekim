const { User } = require("../../models/");

exports.renderUserMange = async function (req, res, next) {
    console.log("open axiosTest page");
    res.render('admin/userManage');
}

exports.getUserData = async function (req, res, next) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.log('[admin] 유저들 조회 오류:', err);
        next(err);
    }
}