const { Product } = require('../models');
const getProductDetailForm = require('../libs/getProductDetailForm');
const setResponseForm = require('../libs/setResponseForm');

exports.getProductsByPreference = async function (req, res, next) {
    const preferences = req.body;
    try {
        let productDetails = [];
        const products = await Product.findAll({
            where: {
                gender: preferences.gender,
                age_id: preferences.age,
                price_id: preferences.price,
            }
        });
        for (let idx = 0; idx < products.length; ++idx) {
           const tmpProductDetail = await getProductDetailForm(products[idx]);
           productDetails.push(tmpProductDetail);
        }

        const msg = '선호에 따른 상품들이 조회되었습니다.';
        const ret = setResponseForm(true, productDetails, msg);
        res.json(ret);
    } catch (err) {
        console.error("선호에 따른 상품 정보들 조회 오류:", err);
        next(err);
    }
}

exports.getProductByPk = async function (req, res, next) {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(parseInt(productId, 10));
        const productDetail = await getProductDetailForm(product);

        const msg = '해당 상품이 조회되었습니다.'
        const ret = setResponseForm(true, productDetail, msg);
        res.json(ret);
    } catch (err) {
        console.error("해당 상품 정보 조회 오류:", err);
        next(err);
    }
}