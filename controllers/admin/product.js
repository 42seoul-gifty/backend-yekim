const { Product } = require("../../models/");

exports.renderProductManage = function (req, res, next) {
    res.render('admin/productManage');
    // res.render('admin/filterTest');
}

exports.renderProductRegister = function (req, res, next) {
    res.render('admin/productRegister', {
        title: "This is Title"
    });
}

exports.displayProduct = async function (req, res, next) {
    const productFilterValue = req.body;
    // TODO: 필터 카테고리 사용하여 데이터 가져오기
    try {
        let productsToMakeList = [];
        const products = await Product.findAll();
        products.forEach(product => {
            productsToMakeList.push(product.dataValues);
        });
        res.json(productsToMakeList);
    } catch (err) {
        console.error('[admin] 조건에 맞는 상품 조회 오류:', err);
        next(err);
    }
}

exports.registerProduct = async function (req, res, next) {
    const productInfo = req.body;
    console.log(req.body);
    try {
        const product = await Product.create({
            code: productInfo.code,
            name: productInfo.name,
            thumbnail: productInfo.thumbnail,
            price: parseInt(productInfo.price, 10),
        });
        console.log("저장된 모델 데이터: ", product.dataValues);
    } catch (err) {
        console.err("[admin] 상품 저장 오류:", err);
        next(err);
    }
    res.json("Product Register complete");
}
