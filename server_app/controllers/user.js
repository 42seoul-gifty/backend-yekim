const {User, Order, Receiver, Gender, Age, Price} = require('../../models');

const getUserDetailForm = require('../../libs/getUserDetailForm');
const getOrderDetailForm = require('../../libs/getOrderDetailForm');
const setResponseForm = require('../../libs/setResponseForm');

// API: GET {host}/users/:id
exports.readUser = async function (req, res, next) {
    const userId = req.params.id;
    try {
        const user = await User.findOne({
            where: {id: userId},
        });
        const userDetail = await getUserDetailForm(user);

        const data = userDetail;
        const msg = '특정 유저 조회가 완료되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('특정 유저 조회 오류:', err);
        next(err);
    }
}

// API: POST {host}/users/:user_id/orders
exports.createOrder = async function (req, res, next) {
    const userId = req.params.user_id;
    const orderInfo = req.body;
    try {
        const user = await User.findByPk(userId);
        const order = await Order.create({
            giverName: orderInfo.giver_name,
            giverPhone: orderInfo.giver_phone,
        });
        // TODO: 다중 주문의 경우, Receiver를 여러명 생성
        const receiver = await Receiver.create({
            name: orderInfo.receiver_name,
            phone: orderInfo.receiver_phone
        });
        const gender = await Gender.findByPk(orderInfo.gender);
        const age = await Age.findByPk(orderInfo.age);
        const price = await Price.findByPk(orderInfo.price);
        gender.addOrder(order);
        age.addOrder(order);
        price.addOrder(order);
        order.addReceiver(receiver);
        user.addOrder(order);

        // 결제를 위한 order 속성을 추가합니다.
        // TODO: 다중 주문의 경우, receiver 수에 따라서 처리하는 작업을 수행합니다.
        order.purchaseAmount = price.range;

        const dateFormat = order.createdAt.toISOString().slice(0, 10).replace(/-/g, "");
        const orderIdFormat = (order.id).toString().padStart(6, '0');
        order.merchantUid = `GIFTY${dateFormat}-${orderIdFormat}`;
        await order.save({fields: ['purchaseAmount', 'merchantUid']});

        const msg = '주문 생성이 완료되었습니다.';
        const data = {merchant_uid: order.merchantUid};
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('주문 생성 오류:', err);
        next(err);
    }
}

// API: GET {host}/:user_id/orders
exports.readOrders = async function (req, res, next) {
    const userId = req.params.user_id;
    try {
        const user = await User.findByPk(userId);
        const orders = await user.getOrder();
        let orderList = [];
        for (let idx = 0; idx < orders.length; ++idx) {
            const tmpOrderDetail = await getOrderDetailForm(orders[idx]);
            orderList.push(tmpOrderDetail);
        }

        const data = orderList;
        const msg = '주문 조회가 완료되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('주문 조회 오류:', err);
        next(err);
    }
}

// TODO: user_id로 user 검증하는 알고리즘 삽입하기
// API: GET {host}/users/:user_id/orders
exports.readOrderById = async function (req, res, next) {
    const orderId = req.params.order_id;
    try {
        const order = await Order.findOne({
            where: {id: orderId},
        });
        const orderDetail = await getOrderDetailForm(order);
        console.log(orderDetail);

        const data = orderDetail;
        const msg = '주문 조회가 완료되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('특정 주문 조회 오류:', err);
        next(err);
    }
}

// TODO: user_id로 user 검증하는 알고리즘 삽입하기
// TODO: 활성화 / 비활성화 적용시키기
// API: DELETE {host}/:user_id/orders/:order_id
exports.deleteOrder = async function (req, res, next) {
    const userId = req.params.user_id;
    const orderId = req.params.order_id;
    try {
        await Order.destroy({
            where: {id: orderId},
        });

        const msg = '해당 주문이 제거 되었습니다.'
        const ret = setResponseForm(true, "", msg);
        res.json(ret)
    } catch (err) {
        console.log('주문 삭제 오류:', err);
        next(err);
    }
}
