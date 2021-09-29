const {Receiver, Order, Product, Like} = require('../models');
const setResponseForm = require('../libs/setResponseForm');
const getProductDetailForm = require('../libs/getProductDetailForm');

// API: GET {host}/receiver/:id
exports.readReceiverById = async function (req, res, next) {
    const receiverId = req.params.id;
    try {
        const receiver = await Receiver.findOne({
            where: {id: receiverId},
            include: Product,
        });

        const msg = "특정 수신자 정보가 조회되었습니다.";
        const ret = setResponseForm(true, receiver, msg);
        res.json(ret);
    } catch (err) {
        console.error("수신자 정보 디테일 조회 오류:", err);
        next(err);
    }
}

// API: POST {host}/receiver/:id
exports.pickProduct = async function (req, res, next) {
    const receiverId = req.params.id;
    const receiverInfo = req.body;
    const likes = receiverInfo.likes;
    const dislikes = receiverInfo.dislikes;
    try {
        const receiver = await Receiver.findOne({
            where: {id: receiverId},
            include: Order
        });
        receiver.postcode = receiverInfo.post_code;
        receiver.address = receiverInfo.address;
        receiver.detailAddress = receiverInfo.address_detail;
        await receiver.save({
            fields: ['postcode', 'address', 'detailAddress']
        });
        const product = await Product.findOne({
            where: {code: receiverInfo.product_id}
        });
        await product.addReceiver(receiver);

        for (let idx = 0; idx < likes.length; ++idx) {
            const tmpProduct = await Product.findByPk(likes[idx]);
            tmpProduct.views += 1;
            await tmpProduct.save({fields: ['views']});
            await receiver.addProduct(tmpProduct, {
                through: {value: true,}
            });
        }
        for (let idx = 0; idx < dislikes.length; ++idx) {
            const tmpProduct = await Product.findByPk(dislikes[idx]);
            tmpProduct.views += 1;
            await tmpProduct.save({fields: ['views']});
            await receiver.addProduct(tmpProduct, {
                through: {value: false,}
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
// API: GET {host}/:id/choice
exports.getProductsChoiceList = async function (req, res, next) {
    const receiverId = req.params.id;
    try {
        const receiver = await Receiver.findOne({
            where: {id: receiverId},
            include: Order,
        });
        const order = receiver.Order;
        const products = await Product.findAll({
            where: {
                gender_id: order.gender_id,
                age_id: order.age_id,
                price_id: order.price_id,
            }
        })
        let productDetails = [];
        for (let idx = 0; idx < products.length; ++idx) {
            const tmpProductDetail = await getProductDetailForm(products[idx]);
            productDetails.push(tmpProductDetail);
        }

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