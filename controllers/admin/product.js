const {Product, Age, Price, Category, Brand, Image, Like, Receiver} = require("../../models/");
const getAgeRange = require('../../libs/getAgeRange');
const getPriceRange = require('../../libs/getPriceRange');
const {getAgeList, getPriceList, getCategoryList, getBrandList} = require('../../libs/getModelList');

// TODO: image, viewCount, orderCount 추가
// TODO: orderCount 계수 시, receiver shipment 배송 완료인지 확인
async function setProductInfo(product) {
    const productData = product.dataValues;
    const likeCount = await Like.findAndCountAll({
        where: {product_id: productData.id, value: 1}
    });
    const orderCount = await Receiver.findAndCountAll({
        where: {product_id: productData.id}
    });

    const ageRange = getAgeRange(productData.Age);
    const priceRange = getPriceRange(productData.Price);

    const images = [];
    productData.Images.forEach(Image => {
        images.push(Image.dataValues.url);
    })

    const ret = {
        code: productData.code,
        name: productData.name,
        brand: product.Brand.name,
        thumbnail: productData.thumbnail,
        images: images,
        description: productData.description,
        detail: productData.detail,
        category: product.Category.type,
        feeRate: product.feeRate,
        link: product.link,
        likeCount: likeCount.count,
        orderCount: orderCount.count,
        retailPrice: productData.price,
        gender: productData.gender,
        age: ageRange,
        price: priceRange,
    };
    return ret;
}

exports.renderProductManage = function (req, res, next) {
    res.render('admin/productManage');
}

exports.renderProductRegister = function (req, res, next) {
    res.render('admin/productRegister');
}

exports.getProducts = async function (req, res, next) {
    const filter = req.body.filter;
    const keys = Object.keys(filter);
    for (let idx = 0; idx < keys.length; ++idx) {
        if (filter[keys[idx]] === '전체')
            delete filter[keys[idx]];
    }
    try {
        const products = await Product.findAll({
            where: filter,
            include: [Age, Price, Category, Brand, Image],
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

exports.getProductDetail = async function (req, res, next) {
    const productCode = req.query.product_code;
    console.log('productCode:', productCode);
    try {
        const product = await Product.findOne({
            where: {code: productCode},
            include: [Age, Price, Category, Brand, Image]
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
    const thumbnail = req.files.thumbnail[0];
    const images = req.files.images;

    const imagesPathList = [];
    images.forEach(file => {
        imagesPathList.push(file.filename);
    });
    try {
        const product = await Product.create({
            code: productInfo.code,
            name: productInfo.name,
            thumbnail: thumbnail.filename,
            price: productInfo.retail_price,
            feeRate: productInfo.fee_rate,
            link: productInfo.link,
            description: productInfo.description,
            detail: productInfo.detail,
            gender: productInfo.gender,
        }, {
            include: [Image],
        });

        const ages = await Age.findAll({raw: true});
        const ageList = getAgeList(ages);
        product.age_id = ageList.indexOf(productInfo.age);

        const prices = await Price.findAll({raw: true});
        const priceList = getPriceList(prices);
        product.price_id = priceList.indexOf(productInfo.price);

        const categories = await Category.findAll({raw: true});
        const categoryList = getCategoryList(categories);
        product.category_id = categoryList.indexOf(productInfo.category);

        const brands = await Brand.findAll({raw: true});
        const brandList = getBrandList(brands);
        product.brand_id = brandList.indexOf(productInfo.brand);

        await product.save({fields: ['age_id', 'brand_id', 'category_id', 'price_id']});

        for (let idx = 0; idx < imagesPathList.length; ++idx) {
            const tmpImage = await Image.create({
                url: imagesPathList[idx],
            });
            await product.addImages(tmpImage);
        }

        console.log("저장된 모델 데이터: ", product);
        res.json("Product Register complete");
    } catch (err) {
        console.error("[admin] 상품 저장 오류:", err);
        next(err);
    }
}

exports.renderEditPage = async function (req, res, next) {
    const productCode = req.query.product_code;
    try {
        const product = await Product.findOne({
            where: {code: productCode},
            include: [Age, Price, Category, Brand, Image],
        })
        const productForPage = await setProductInfo(product);
        res.render('admin/productEdit', {
            product: productForPage
        });
    } catch (err) {
        console.error('상품 수정 페이지 조회 오류:', err);
        next(err);
    }
}

// TODO: edit에서도 thumbnail, image에 대해서 파일처리
exports.editProduct = async function (req, res, next) {
    const productInfo = req.body;

    const imagesPathList = productInfo.images.split('\n');
    try {
        const product = await Product.findOne({
            where: { code: parseInt(productInfo.code, 10) },
            include: [Image],
        });

        product.name = productInfo.name;
        product.thumbnail = productInfo.thumbnail;
        product.price = productInfo.retail_price;
        product.feeRate = productInfo.fee_rate;
        product.link = productInfo.link;
        product.description = productInfo.description;
        product.detail = productInfo.detail;
        product.gender = productInfo.gender;

        const ages = await Age.findAll({raw: true});
        const ageList = getAgeList(ages);
        product.age_id = ageList.indexOf(productInfo.age);

        const prices = await Price.findAll({raw: true});
        const priceList = getPriceList(prices);
        product.price_id = priceList.indexOf(productInfo.price);

        const categories = await Category.findAll({raw: true});
        const categoryList = getCategoryList(categories);
        product.category_id = categoryList.indexOf(productInfo.category);

        const brands = await Brand.findAll({raw: true});
        const brandList = getBrandList(brands);
        product.brand_id = brandList.indexOf(productInfo.brand);

        await product.save({
            fields: product._options.attributes,
        });

        for (let idx = 0; idx < imagesPathList.length; ++idx) {
            const tmpImage = await Image.create({
                url: imagesPathList[idx],
            });
            await product.addImages(tmpImage);
        }

        console.log("수정된 모델 데이터: ", product);
        res.json("Product Register complete");
    } catch (err) {
        console.error("[admin] 상품 저장 오류:", err);
        next(err);
    }
}