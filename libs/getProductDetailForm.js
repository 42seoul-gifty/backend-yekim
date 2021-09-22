module.exports = async function (productModel) {
    const images = await productModel.getImages();
    const imageUrlList = [];
    for (let idx = 0; idx < images.length; ++idx) {
        imageUrlList.push(images[idx].dataValues.url)
    }

    try {
        const productData = productModel.dataValues;
        const productDetail = {
            id: productData.id,
            name: productData.name,
            description: productData.description,
            detail: productData.detail,
            thumbnail: productData.thumbnail,
            image_url: imageUrlList,
            price: productData.price,
        }
        return productDetail;
    } catch (err) {
        console.error('상품 디테일 생성 오류:', err);
    }
}