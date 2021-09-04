const { Product } = require("../../models/");

exports.renderProductManage = function (req, res, next) {
    res.render('admin/productManage');
    // res.render('admin/filterTest');
}

exports.renderProductRegister = function (req, res, next) {
    res.render('admin/productRegister');
}

exports.displayProduct = async function (req, res, next) {
    const productFilter = req.body;
    console.log(productFilter);
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
