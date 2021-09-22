const { Receiver, Order, Product, Like } = require('../models');
const setResponseForm = require('../libs/setResponseForm');
const getProductDetailForm = require('../libs/getProductDetailForm');

exports.readReceiverById = async function (req, res, next) {
    const receiverId = req.params.id;
    try {
        const receiver = await Receiver.findOne({
            where: { id: receiverId },
            attributes: ['id', 'name', 'phone'],
            include: Product,
        });
        const ret = setResponseForm(true, receiver, "hihi");
        res.json(ret);
    } catch (err) {
        console.error("수신자 정보 디테일 조회 오류:", err);
        next(err);
    }
}

exports.pickProduct = async function (req, res, next) {
    const receiverId = req.params.id;
    const receiverInfo = req.body;
    const likes = receiverInfo.likes;
    const dislikes = receiverInfo.dislikes;
    try {
        const receiver = await Receiver.findOne({
            where: { id: receiverId },
            include: Order
        });
        receiver.postcode = receiverInfo.post_code;
        receiver.address = receiverInfo.address;
        receiver.detailAddress = receiverInfo.address_detail;
        await receiver.save({
            fields: ['postcode', 'address', 'detailAddress']
        });
        const product = await Product.findOne({
            where: { code: receiverInfo.product_id }
        });
        await product.addReceiver(receiver);

        for (let idx = 0; idx < likes.length; ++idx) {
            const tmpProduct = await Product.findByPk(likes[idx]);
            await receiver.addProduct(tmpProduct, {
                through: { value: true, }
            });
        }
        for (let idx = 0; idx < dislikes.length; ++idx) {
            const tmpProduct = await Product.findByPk(dislikes[idx]);
            await receiver.addProduct(tmpProduct, {
                through: { value: false, }
            });
        }

        const ret = setResponseForm(true, "", "수신자 선물 선택 완료");
        res.json(ret);
    } catch (err) {
        console.error("수신자 선물 선택 오류:", err);
        next(err);
    }
}

// TODO: Receiver를 통한 주문 조회 계속해서 구현
exports.getProductsChoiceList = async function (req, res, next) {
    const receiverId = req.params.id;
    try {
        const receiver = await Receiver.findOne({
            where: { id: receiverId },
            include: Order,
        });
        const order = receiver.Order;
        const products = await Product.findAll({
            where: {
                gender: order.gender,
                age_id: order.age_id,
                price_id: order.price_id,
            }
        })
        let productDetails = [];
        products.forEach((product) => {
           productDetails.push(getProductDetailForm(product));
        });

        const data = {
            giver_name: order.giverName,
            giver_phone: order.giverPhone,
            product: productDetails,
        };
        const msg = '해당 수신자 데이터 전달 완료';
        const ret = setResponseForm(true, data, msg);
        res.json(ret);
    } catch (err) {
        console.error("수신자 선택 정보 조회 오류:", err);
        next(err);
    }
}