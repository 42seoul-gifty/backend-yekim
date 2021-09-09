const getReceiverDetail = require('./getReceiverDetailForm');

module.exports = async function (orderModel) {
    const orderData = orderModel.dataValues;
    try {
        const receiverModel = (await orderModel.getReceiver())[0];
        const productModel = orderModel.Product;
        const receiverDetail = await getReceiverDetail(receiverModel, productModel);
        const orderDetail = {
            giver_name: orderData.giverName,
            giver_phone: orderData.giverPhone,
            receiver: receiverDetail,
            order_date: orderData.createdAt,
            preference: {
                age: orderData.age_id,
                gender: orderData.gender,
                price: orderData.price_id,
            }
        }
        return orderDetail;
    } catch (err) {
        console.error('주문 디테일 생성 오류', err);
    }
}
