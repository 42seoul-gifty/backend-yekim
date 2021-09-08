const { Receiver, Order, Product } = require('../models');
const setResponseForm = require('../libs/setResponseForm');
const getProductDetailForm = require('../libs/getProductDetailForm');

exports.readReceiverById = async function (req, res, next) {
    const receiverId = req.params.id;
    console.log(receiverId);
    try {
        const receiver = await Receiver.findOne({
            where: { id: receiverId },
            attributes: ['id', 'name', 'phone'],
            include: Product,
        });
        console.log(receiver);
        const ret = setResponseForm(true, receiver, "hihi");
        res.json(ret);
    } catch (err) {
        console.error("수신자 정보 디테일 조회 오류:", err);
        next(err);
    }
}

exports.pickProduct = async function (req, res, next) {
    const receiverId = req.params.id;
    const receiverInfo = req.query;
    try {
        const receiver = await Receiver.findOne({
            where: { id: receiverId }
        });
        receiver.postcode = receiverInfo.post_code;
        receiver.address = receiverInfo.address;
        receiver.detailAddress = receiverInfo.address_detail;
        await receiver.save({
            fields: ['postcode', 'address', 'detailAddress']
        });
        const product = await Product.findOne({
            where: { code: receiverInfo.product_id }
        })
        const result = await product.addReceiver(receiver);
        const ret = setResponseForm(true, "", "수신자 선물 선택 완료");
        res.json(ret);
    } catch (err) {
        console.error("수신자 선물 선택 오류:", err);
        next(err);
    }
}

// TODO: Receiver를 통한 주문 조회 계속해서 구현
exports.getReceiverChoice = async function (req, res, next) {
    const receiverId = req.params.id;
    try {
        const receiver = await Receiver.findOne({
            where: { id: receiverId },
            include: [ Order, Product ]
        });
        const productDetail = getProductDetailForm(receiver.Product);
        const data = {
            giver_name: receiver.Order.giverName,
            giver_phone: receiver.Order.giverPhone,
            product: productDetail,
        }
        const msg = '해당 수신자 데이터 전달 완료';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.error("수신자 선택 정보 조회 오류:", err);
        next(err);
    }
}