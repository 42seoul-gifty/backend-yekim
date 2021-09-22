const { User, Order, Receiver, Product, Age, Price} = require('../models');

const setResponseForm = require('../libs/setResponseForm');
const getOrderDetailForm = require('../libs/getOrderDetailForm');

// TODO: user_id로 user 검증하는 알고리즘 삽입하기
exports.readOrderById = async function (req, res, next) {
    const orderId = req.params.order_id;
    try {
        const order = await Order.findOne({
            where: { id: orderId },
        });
        const orderDetail = await getOrderDetailForm(order);

        const data = orderDetail;
        const msg = '주문 조회가 완료되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('특정 주문 조회 오류:', err);
        next(err);
    }
}

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

exports.createOrder = async function (req, res, next) {
    const userId = req.params.user_id;
    const orderInfo = req.body;
    try {
        const user = await User.findByPk(userId);
        const order = await Order.create({
            giverName: orderInfo.giver_name,
            giverPhone: orderInfo.giver_phone,
            gender: orderInfo.gender,
        });
        const receiver = await Receiver.create({
            name: orderInfo.receiver_name,
            phone: orderInfo.receiver_phone
        });
        const age = await Age.findByPk(orderInfo.age);
        const price = await Price.findByPk(orderInfo.price);
        age.addOrder(order);
        price.addOrder(order);
        order.addReceiver(receiver);
        user.addOrder(order);
        const msg = '주문 생성이 완료되었습니다.';
        const data = { merchant_uid: order.id };
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('주문 생성 오류:', err);
        next(err);
    }
}

// TODO: user_id로 user 검증하는 알고리즘 삽입하기
// TODO: 활성화 / 비활성화 적용시키기
exports.deleteOrder = async function (req, res, next) {
    const userId = req.params.user_id;
    const orderId = req.params.order_id;
    try {
        await Order.destroy({
            where: { id: orderId },
        });

        const msg = '해당 주문이 제거 되었습니다.'
        const ret = setResponseForm(true, "", msg);
        res.json(ret)
    } catch (err) {
        console.log('주문 삭제 오류:', err);
        next(err);
    }
}
