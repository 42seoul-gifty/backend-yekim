const {Product, Age, Price, Category, Brand, Image, Like, Order} = require("../../models/");

// TODO: image, viewCount, orderCount 추가
async function setProductInfo(product) {
    const productData = product.dataValues;
    console.log(productData);
    const likeCount = await Like.findAndCountAll({
        where: {product_id: productData.id, value: 1}
    });
    const orderCount = await Order.findAndCountAll({
        where: {product_id: productData.id}
    });
    const ageRange = productData.Age.range.split(',');
    const priceRange = productData.Price.range;
    const ret = {
        code: productData.code,
        name: productData.name,
        brand: product.Brand.name,
        thumbnail: productData.thumbnail,
        description: productData.description,
        detail: productData.detail,
        category: product.Category.type,
        feeRate: product.feeRate,
        link: product.link,
        likeCount: likeCount.count,
        orderCount: orderCount.count,
        retailPrice: productData.price,
        gender: productData.gender,
        age: `${ageRange[0]}~${ageRange[1]}세`,
        price: `${priceRange}원`,
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

function getAgeList(ages) {
    const ageList = ['전체'];
    for (let idx = 0; idx < ages.length; ++idx) {
        const tmpAge = ages[idx].range.split(',');
        if (idx != ages.length - 1) {
            ageList.push(`${tmpAge[0]}~${tmpAge[1]}세`);
        } else {
            ageList.push(`${tmpAge[0]}세 이상`);
        }
    }
    return ageList;
}

function getPriceList(prices) {
    const priceList = ['전체'];
    for (let idx = 0; idx < prices.length; ++idx) {
        const tmpPrice = parseInt(prices[idx].range, 10);
        if (tmpPrice % 10000 === 0) {
            priceList.push(`${tmpPrice / 10000}만원`);
        } else {
            priceList.push(`${parseInt(tmpPrice / 10000)}만 ${parseInt((tmpPrice % 10000) / 1000)}천원`);
        }
    }
    return priceList;
}

function getCategoryList(categories) {
    const categoryList = ['카테고리'];
    categories.forEach(category => {
        categoryList.push(category.type);
    });
    return categoryList;
}

function getBrandList(brands) {
    const brandList = ['판매처'];
    brands.forEach(brand => {
        brandList.push(brand.name);
    });
    return brandList;
}

// TODO: category 및 age 등등 처리
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
            include: [Age, Price, Category, Brand],
        })
        const productForPage = await setProductInfo(product);
        console.log(productForPage);
        res.render('admin/productEdit', {
            product: productForPage
        });
    } catch (err) {
        console.error('상품 수정 페이지 조회 오류:', err);
        next(err);
    }
}
