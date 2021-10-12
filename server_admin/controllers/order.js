const {Order, Gender, Age, Price, Product} = require("../../models/");
const getModelRange = require('../../libs/getModelRange');
const getModelList = require("../../libs/getModelList");

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
        merchantUid: orderData.merchantUid,
        giverName: orderData.giverName,
        giverPhone: orderData.giverPhone,
        gender: orderData.Gender.type,
        paymentStatus: orderData.paymentStatus,
        age: ageRange,
        price: priceRange,
        phone: receiverData.phone,
        address: receiverData.address,
        shipmentStatus: receiverData.shipmentStatus,
        addressDetail: receiverData.detailAddress,
        productName: productName,
        createdAt: orderData.createdAt,
    };
    return ret;
}

async function editOrderMetaInfo(order, orderInfo) {
    const genders = await Gender.findAll({raw: true});
    const genderList = getModelList.getGenderList(genders);
    order.gender_id = genderList.indexOf(orderInfo.gender);

    const ages = await Age.findAll({raw: true});
    const ageList = getModelList.getAgeList(ages);
    order.age_id = ageList.indexOf(orderInfo.age);

    const prices = await Price.findAll({raw: true});
    const priceList = getModelList.getPriceList(prices);
    order.price_id = priceList.indexOf(orderInfo.price);
}

exports.renderOrderManage = function (req, res, next) {
    res.render('orderManage');
}

exports.renderEditPage = async function (req, res, next) {
    try {
        const orderId = req.query.order_id;
        console.log("orderId:", orderId);
        const order = await Order.findOne({
            where: {id: orderId},
            include: [Gender, Age, Price],
        });
        const receivers = await order.getReceiver({
            include: Product,
        });
        const orderForPage = await setOrderInfo(order, receivers[0]);

        res.render('orderEdit', {
            order: orderForPage,
        });
    } catch (err) {
        console.error('주문 편집 페이지 조회 오류:', err);
        next(err);
    }
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
        res.redirect('/order/manage');
    } catch (err) {
        console.error('배송 상태 변경 오류:', err);
        next(err);
    }
}

exports.renderOrderDetail = async function (req, res, next) {
    try {
        res.render('orderDetail', {
            orderId: req.query.order_id,
        });
    } catch (err) {
        console.error('주문 상세 조회 오류:', err);
        next(err);
    }
}

exports.getOrderByPk = async function (req, res, next) {
    const orderId = req.params.id;
    try {
        const order = await Order.findOne({
            where: {id: orderId},
            include: [Gender, Age, Price]
        });

        const receivers = await order.getReceiver({
            include: Product,
        });
        const orderForPage = await setOrderInfo(order, receivers[0]);
        res.json(orderForPage);
    } catch (err) {
        console.error('해당 번호의 상품 조회 오류:', err);
        next(err);
    }
}

exports.editOrder = async function (req, res, next) {
    try {
        const orderInfo = req.body;
        let order = await Order.findOne({
            where: { id: orderInfo.id },
            include: [Gender, Age, Price],
        });
        order.giverName = orderInfo.giver_name;
        order.giverPhone = orderInfo.giver_phone;

        await editOrderMetaInfo(order, orderInfo);
        await order.save({
            fields: order._options.attributes,
        });
        res.json("Order Register complete");
    } catch (err) {
        console.error("[admin] 주문 변경사항 저장 오류:", err);
        next(err);
    }
}