const {Product} = require('../../models');
const getProductDetailForm = require('../../libs/getProductDetailForm');
const setResponseForm = require('../../libs/setResponseForm');

// API: {host}/products
exports.getProductsByPreference = async function (req, res, next) {
    const preferences = req.query;

    try {
        let productDetails = [];
        const products = await Product.findAll({
            where: {
                gender_id: preferences.gender,
                age_id: preferences.gender,
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

// API: {host}/products/:id
exports.getProductByPk = async function (req, res, next) {
    const productCode = req.params.id;
    try {
        const product = await Product.findOne({
            where: {code: productCode},
        });
        const productDetail = await getProductDetailForm(product);

        const msg = '해당 상품이 조회되었습니다.'
        const ret = setResponseForm(true, productDetail, msg);
        res.json(ret);
    } catch (err) {
        console.error("해당 상품 정보 조회 오류:", err);
        next(err);
    }
}