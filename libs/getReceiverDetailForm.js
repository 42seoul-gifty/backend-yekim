const getProductDetailForm = require('../libs/getProductDetailForm');

module.exports = async function (receiverModel) {
    try {
        const receiverData = receiverModel.dataValues;
        const productDetail = getProductDetailForm(receiverModel.Product);
        const receiverDetail = {
            id: receiverData.id,
            nickname: receiverData.name,
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
        console.error('유저 디테일 생성 오류:', err);
    }
}