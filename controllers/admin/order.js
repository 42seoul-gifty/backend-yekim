const {Order, Gender, Age, Price, Product } = require("../../models/");
const getModelRange = require('../../libs/getModelRange');

// TODO: image, viewCount, orderCount 추가
async function setOrderInfo(order, receiver) {
    const orderData = order.dataValues;
    const receiverData = receiver.dataValues;
    const product = receiver.Product;

    const ageRange = getModelRange.getAgeRange(orderData.Age);
    const priceRange = getModelRange.getPriceRange(orderData.Price);

    const productName = product === null ? '선택 안함' : product.name;

    const ret = {
        id: orderData.id,
        gender: orderData.Gender.type,
        age: ageRange,
        price: priceRange,
        phone: receiverData.phone,
        address: receiverData.address,
        shipment_status: receiverData.shipmentStatus,
        address_detail: receiverData.detailAddress,
        productName: productName,
    };
    return ret;
}

exports.renderOrderManage = function (req, res, next) {
    res.render('admin/orderManage');
}

// TODO: 단체 주문의 경우, Receiver 단위로 for문을 돌릴 것.
// TODO: Receiver가 여러명이 주어지는 경우, 이중루프로 처리하기.
// TODO: filter 값 범주에 따라 Date 계산 후 출력하기
exports.getOrders = async function (req, res, next) {
    const filter = req.body.filter;
    const keys = Object.keys(filter);
    for (let idx = 0; idx < keys.length; ++idx) {
        if (filter[keys[idx]] === '전체')
            delete filter[keys[idx]];
    }
    try {
        const orders = await Order.findAll({
            where: filter,
            include: [Gender, Age, Price]
        });

        const ordersForPage = [];
        for (let idx = 0; idx < orders.length; ++idx) {
            const receivers = await orders[idx].getReceiver({
                include: Product,
            });
            const tmpOrderData = await setOrderInfo(orders[idx], receivers[0]);
            ordersForPage.push(tmpOrderData);
        }
        res.json(ordersForPage);
    } catch (err) {
        console.error('필터된 상품 조회 오류:', err);
        next(err);
    }
}

function findReceiverByPhone(receivers, phone) {
    for (let idx = 0; idx < receivers.length; ++idx) {
        if (receivers[idx].phone === phone) {
            return receivers[idx];
        }
    }
    return null;
}

// 현재 하나의 order에 여러 receiver가 배치될 가능성을 염두함.
// 하나의 order에 대한 여러 receiver를 조회하고, 번호로 각 receiver를 찾는 방식
exports.changeShipmentStatus = async function (req, res, next) {
    try {
        const orderId = req.body.id;
        const shipmentStatus = req.body.status;
        const receiverPhone = req.body.phone;
        const order = await Order.findByPk(orderId);
        const receivers = await order.getReceiver();
        const receiver = findReceiverByPhone(receivers, receiverPhone);
        receiver.shipmentStatus = shipmentStatus;
        await receiver.save({fields: ['shipmentStatus']});
        res.redirect('/admin/order/manage');
    } catch (err) {
        console.error('배송 상태 변경 오류:', err);
        next(err);
    }
}