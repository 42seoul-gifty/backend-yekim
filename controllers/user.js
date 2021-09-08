const { User, Order, Receiver, Product} = require('../models');

const setResponseForm = require('../libs/setResponseForm');
const getReceiverDetailForm = require('../libs/getReceiverDetailForm');

// TODO: user_id로 user 검증하는 알고리즘 삽입하기
// TODO: preference 모델 추가하기
// TODO: detail 정보들을 가공하는 함수 생성하기
// TODO: product 모델의 속성값 채우기
exports.readOrderById = async function (req, res, next) {
    const orderId = req.params.order_id;
    try {
        const receiver = await Receiver.findAll({
            where: { order_id: orderId },
            include: [Product, Order],
        });
        const firstReciever = receiver[0];
        const order = firstReciever.dataValues.Order;
        const receiverData = firstReciever.dataValues;
        const receiverDetail = getReceiverDetailForm(firstReciever);
        const data = {
            giver_name: order.giverName,
            giver_phone: order.giverPhone,
            receiver: receiverDetail,
            order_date: order.createdAt.toString(),
        }
        const msg = '주문 조회가 완료되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('주문 조회 오류:', err);
        next(err);
    }
}

exports.readOrders = async function (req, res, next) {
    const userId = req.params.user_id;
    try {
        const user = await User.findByPk(userId);
        const orders = await user.getOrder();
        const orderList = [];
        orders.forEach(order => {
            orderList.push(order.dataValues);
        })
        const data = orderList;
        const msg = '주문 조회가 완료되었습니다.';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.log('주문 생성 오류:', err);
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
        })
        const receiver = await Receiver.create({
            name: orderInfo.receiver_name,
            phone: orderInfo.receiver_phone
        })
        user.addOrder(order);
        order.addReceiver(receiver);
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
exports.deleteOrder = async function (req, res, next) {
    const userId = req.params.user_id;
    const orderId = req.params.order_id;
    try {
        Order.destroy({
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
