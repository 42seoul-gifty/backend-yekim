const { Product, Age, Price, Category, Brand } = require("../../models/");

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
        res.json(products);
    } catch (err) {
        console.error('필터된 상품 조회 오류:', err);
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
