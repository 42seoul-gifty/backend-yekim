const getProductDetailForm = require('./getProductDetailForm');

module.exports = async function (receiverModel) {
    try {
        const receiverData = receiverModel.dataValues;
        const productModel = receiverModel.Product;
        const productDetail = await getProductDetailForm(productModel);
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
    } catch (err) {
        console.error('수신자 디테일 생성 오류:', err);
    }
}