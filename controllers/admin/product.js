const { Product, Age, Price, Category, Brand, Like, Order } = require("../../models/");

// TODO: image, viewCount, orderCount 추가
async function setProductInfo(product) {
    const productData = product.dataValues;
    const likeCount = await Like.findAndCountAll({
        where: { product_id: productData.id, value: 1 }
    });
    const orderCount = await Order.findAndCountAll({
        where: { product_id: productData.id }
    });
    const ret = {
        code: productData.code,
        name: productData.name,
        brand: product.Brand.name,
        thumbnail: productData.thumbnail,
        description: productData.description,
        detail: productData.detail,
        category: product.Category.type,
        feeRate: product.feeRate,
        likeCount: likeCount.count,
        orderCount: orderCount.count,
    };
    return ret;
}

exports.renderProductManage = function (req, res, next) {
    res.render('admin/productManage');
    // res.render('admin/filterTest');
}

exports.renderProductRegister = function (req, res, next) {
    // res.render('admin/imgUploadTest');
    res.render('admin/productRegister', {
        title: "This is Title"
    });
}

// Order에서 관련 product 주문 수 카운트하기
exports.getFilteredProducts = async function (req, res, next) {
    const filter = req.body.filter;
    const keys = Object.keys(filter);
    for (let idx = 0; idx < keys.length; ++idx) {
        if (filter[keys[idx]] === '전체')
            delete filter[keys[idx]];
    }
    try {
        const products = await Product.findAll({
            where: filter,
            include: [Age, Price, Category, Brand],
        });

        const productsForPage = [];
        for (let idx = 0; idx < products.length; ++idx) {
            const tmpProductData = await setProductInfo(products[idx]);
            productsForPage.push(tmpProductData);
        }
        res.json(productsForPage);
    } catch (err) {
        console.error('필터된 상품 조회 오류:', err);
        next(err);
    }
}

exports.getProductDetailById = async function (req, res, next) {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId, {
            include: [Age, Price, Category, Brand]
        });

        const productForPage = await setProductInfo(product);
        res.render('admin/productDetail', {
            product: productForPage,
        });
    } catch (err) {
        console.error('상품 상세 조회 오류:', err);
        next(err);
    }
}

exports.registerProduct = async function (req, res, next) {
    const productInfo = req.body;
    const productFile = req.file;
    console.log('등록을 위한 데이터:', 'body:', req.body, '\nfile:', req.file);
    try {
        const product = await Product.create({
            code: productInfo.code,
            name: productInfo.name,
            thumbnail: productFile.path,
            price: parseInt(productInfo.price, 10),
        });
        console.log("저장된 모델 데이터: ", product.dataValues);
        res.json("Product Register complete");
    } catch (err) {
        console.err("[admin] 상품 저장 오류:", err);
        next(err);
    }
}
