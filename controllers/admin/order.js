const {Order, Gender, Age, Price, Product } = require("../../models/");
const getAgeRange = require('../../libs/getAgeRange');
const getPriceRange = require('../../libs/getPriceRange');

// TODO: image, viewCount, orderCount 추가
async function setOrderInfo(order, receiver) {
    const orderData = order.dataValues;
    const receiverData = receiver.dataValues;
    const product = receiver.Product;

    const ageRange = getAgeRange(orderData.Age);
    const priceRange = getPriceRange(orderData.Price);

    const productName = product === null ? '선택 안함' : product.name;

    const ret = {
        id: orderData.id,
        gender: orderData.Gender.type,
        age: ageRange,
        price: priceRange,
        phone: receiverData.phone,
        address: receiverData.address,
        detailAddress: receiverData.detailAddress,
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