const getProductDetailForm = require('./getProductDetailForm');

module.exports = function (receiverModel) {
    const receiverData = receiverModel.dataValues;
    const productModel = receiverModel.Product;
    const productDetail = getProductDetailForm(productModel);
    const receiverDetail = {
        id: receiverData.id,
        name: receiverData.name,
        phone: receiverData.phone,
        product: productDetail,
        address: {
            post_code: receiverData.postcode,
            address: receiverData.address,
            detail: receiverData.detailAddress,
        }
    }
    return receiverDetail;
}
