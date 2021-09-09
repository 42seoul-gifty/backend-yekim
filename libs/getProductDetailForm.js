module.exports = function (productModel) {
    try {
        const productData = productModel.dataValues;
        const productDetail = {
            id: productData.id,
            code: productData.code,
            thumbnail: productData.thumbnail,
            price: productData.price,
        }
        return productDetail;
    } catch (err) {
        console.error('상품 디테일 생성 오류:', err);
    }
}