const {Product} = require('../models');
const getReceiverDetail = require('./getReceiverDetailForm');

module.exports = async function (orderModel) {
    const orderData = orderModel.dataValues;
    try {
        const receiverModel = (await orderModel.getReceiver({
            include: Product,
        }))[0];
        const receiverDetail = await getReceiverDetail(receiverModel);
        const orderDetail = {
            giver_name: orderData.giverName,
            giver_phone: orderData.giverPhone,
            receiver: receiverDetail,
            order_date: orderData.createdAt,
            preference: {
                gender: orderData.gender_id,
                age: orderData.age_id,
                price: orderData.price_id,
            }
        }
        return orderDetail;
    } catch (err) {
        console.error('주문 디테일 생성 오류', err);
    }
}
