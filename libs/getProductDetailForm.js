module.exports = function (productModel) {
    const productData = productModel.dataValues;
    const productDetail = {
        id: productData.id,
        code: productData.code,
        thumbnail: productData.thumbnail,
        price: productData.price,
    }
    return productDetail;
}