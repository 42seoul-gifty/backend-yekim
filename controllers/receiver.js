const { Receiver, Product } = require('../models');
const setResponseForm = require('../libs/setResponseForm');

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
    const productCode = req.query.product_id;
    console.log(receiverId, productCode);
    try {
        const receiver = await Receiver.findOne({
            where: { id: receiverId }
        });
        const product = await Product.findOne({
            where: { code: productCode }
        })
        const result = await product.addReceiver(receiver);
        const ret = setResponseForm(true, "", "수신자 선물 선택 완료");
        res.json(ret);
    } catch (err) {
        console.error("수신자 선물 선택 오류:", err);
        next(err);
    }

}