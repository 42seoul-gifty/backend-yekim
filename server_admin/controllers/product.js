const {Product, Gender, Age, Price, Category, Brand, Image, Like, Receiver} = require("../../models/");
const getModelRange = require('../../libs/getModelRange');
const getModelList = require('../../libs/getModelList');

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

    const genderType = productData.Gender.type;
    const ageRange = getModelRange.getAgeRange(productData.Age);
    const priceRange = getModelRange.getPriceRange(productData.Price);

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
        viewCount: productData.views,
        gender: genderType,
        age: ageRange,
        price: priceRange,
    };
    return ret;
}

exports.renderProductManage = function (req, res, next) {
    res.render('productManage');
}

exports.renderProductRegister = function (req, res, next) {
    res.render('productRegister');
}

exports.renderProductDetail = async function (req, res, next) {
    try {
        const productCode = req.query.product_code;
        const product = await Product.findOne({
            where: {code: productCode},
            include: [Gender, Age, Price, Category, Brand, Image]
        });
        const productForPage = await setProductInfo(product);
        res.render('productDetail', {
            product: productForPage,
        });
    } catch (err) {
        console.error('상품 상세 조회 오류:', err);
        next(err);
    }
}

exports.renderEditPage = async function (req, res, next) {
    try {
        const productCode = req.query.product_code;
        const product = await Product.findOne({
            where: {code: productCode},
            include: [Gender, Age, Price, Category, Brand, Image],
        })
        const productForPage = await setProductInfo(product);
        res.render('productEdit', {
            product: productForPage
        });
    } catch (err) {
        console.error('상품 수정 페이지 조회 오류:', err);
        next(err);
    }
}

exports.getProductsAsFilter = async function (req, res, next) {
    try {
        const filter = req.body.filter;
        const keys = Object.keys(filter);
        for (let idx = 0; idx < keys.length; ++idx) {
            if (filter[keys[idx]] === '전체')
                delete filter[keys[idx]];
        }
        const products = await Product.findAll({
            where: filter,
            include: [Gender, Age, Price, Category, Brand, Image],
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

async function setProductMetaInfo(product, productInfo) {
    const categories = await Category.findAll({raw: true});
    const categoryList = getModelList.getCategoryList(categories);
    product.category_id = categoryList.indexOf(productInfo.category);

    const genders = await Gender.findAll({raw: true});
    const genderList = getModelList.getGenderList(genders);
    product.gender_id = genderList.indexOf(productInfo.gender);

    const ages = await Age.findAll({raw: true});
    const ageList = getModelList.getAgeList(ages);
    product.age_id = ageList.indexOf(productInfo.age);

    const prices = await Price.findAll({raw: true});
    const priceList = getModelList.getPriceList(prices);
    product.price_id = priceList.indexOf(productInfo.price);

    // 만약, 새로운 브랜드이면 브랜드를 추가하고 존재하는 브랜드이면 이를 등록합니다.
    const [brand, created] = await Brand.findOrCreate({
        where: {name: productInfo.brand},
        defaults: {name: productInfo.brand}
    });
    await brand.addProduct(product);
    await product.save({
        fields: product._options.attributes,
    });
}

async function addImagesOnProduct(product, imagesPathList) {
    for (let idx = 0; idx < imagesPathList.length; ++idx) {
        const tmpImage = await Image.create({
            url: imagesPathList[idx],
        });
        await product.addImages(tmpImage);
    }
}

exports.registerProduct = async function (req, res, next) {
    try {
        const productInfo = req.body;
        const thumbnail = req.files.thumbnail[0];
        const images = req.files.images;

        const imagesPathList = [];
        if (images) {
            images.forEach(file => {
                imagesPathList.push(file.filename);
            });
        }
        let product = await Product.create({
            code: productInfo.code,
            name: productInfo.name,
            thumbnail: thumbnail.filename,
            price: productInfo.retail_price,
            feeRate: productInfo.fee_rate,
            link: productInfo.link,
            description: productInfo.description,
            detail: productInfo.detail,
        }, {
            include: [Image],
        });

        await setProductMetaInfo(product, productInfo);
        await addImagesOnProduct(product, imagesPathList);
        res.json("Product Register complete");
    } catch (err) {
        console.error("[admin] 상품 저장 오류:", err);
        next(err);
    }
}

// TODO: edit에서도 thumbnail, image에 대해서 파일처리
exports.editProduct = async function (req, res, next) {
    try {
        const productInfo = req.body;
        const imagesPathList = productInfo.images.split('\n');
        let product = await Product.findOne({
            where: { code: productInfo.code },
            include: [Image],
        });

        product.name = productInfo.name;
        product.thumbnail = productInfo.thumbnail;
        product.price = productInfo.retail_price;
        product.feeRate = productInfo.fee_rate;
        product.link = productInfo.link;
        product.description = productInfo.description;
        product.detail = productInfo.detail;

        await setProductMetaInfo(product, productInfo);
        await addImagesOnProduct(product, imagesPathList);
        res.json("Product Register complete");
    } catch (err) {
        console.error("[admin] 상품 저장 오류:", err);
        next(err);
    }
}