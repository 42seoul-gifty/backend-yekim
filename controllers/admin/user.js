const { User, Order, Like, Receiver} = require("../../models/");

async function setuserinfo(user) {
    const userdata = user.datavalues;
    const orders = await user.getorder();
    console.log(orders);
    const ret = {
        id: userdata.id,
        name: userdata.name,
        email: userdata.email,
        phone: userdata.phone,
        logintype: userdata.logintype,
        token: userdata.token,
        orders: orders,
    };
    return ret;
}

exports.renderUserMange = async function (req, res, next) {
    console.log("open axiosTest page");
    res.render('admin/userManage');
}

exports.getUsers = async function (req, res, next) {
    try {
        const users = await User.findAll({
            include: [{
                model: Order,
                as: 'Order'
            }]
        });
        res.json(users);
    } catch (err) {
        console.log('[admin] 유저들 조회 오류:', err);
        next(err);
    }
}

exports.renderUserDetail = async function (req, res, next) {
    try {
        const userId = req.query.user_id;
        const user = await User.findOne({
            where: {id: userId},
        });
        const orders = await user.getOrder();
        user.orders = orders;

        res.render('admin/userDetail', {
            user: user,
        });
    } catch (err) {
        console.error("[admin] 유저 상세 조회 오류:", err);
        next(err);
    }
}
