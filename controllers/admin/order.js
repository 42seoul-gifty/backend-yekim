const {Order, Age, Price, Product } = require("../../models/");

// TODO: image, viewCount, orderCount 추가
async function setOrderInfo(order, receiver) {
    const orderData = order.dataValues;
    const receiverData = receiver.dataValues;
    const product = receiver.Product;

    const tmpAgeRange = orderData.Age.range.split(',');
    let ageRange;
    if (tmpAgeRange.length === 1) {
        ageRange = `${tmpAgeRange[0]}세 이상`;
    } else {
        ageRange = `${tmpAgeRange[0]}~${tmpAgeRange[1]}세`;
    }

    const tmpPriceRange = orderData.Price.range;
    let priceRange;
    if (tmpPriceRange % 10000 === 0) {
        priceRange = `${tmpPriceRange /10000}만원`;
    } else {
        priceRange = `${parseInt(tmpPriceRange /10000)}만 ${parseInt(tmpPriceRange % 10000 / 1000)}천원`;
    }

    const productName = product === null ? '선택 안함' : product.name;

    const ret = {
        id: orderData.id,
        gender: orderData.gender,
        age: ageRange,
        price: priceRange,
        phone: receiverData.phone,
        address: receiverData.address,
        detailAddress: receiverData.detailAddress,
        productName: productName,
    };
    return ret;
}

exports.renderOrderManage = function (req, res, next) {
    res.render('admin/orderManage');
}

// Order에서 관련 product 주문 수 카운트하기
// Receiver 단위로 for문을 돌릴 것.
// TODO: Receiver가 여러명이 주어지는 경우, 이중루프로 처리하기.
exports.getOrders = async function (req, res, next) {
    const filter = req.body.filter;
    const keys = Object.keys(filter);
    for (let idx = 0; idx < keys.length; ++idx) {
        if (filter[keys[idx]] === '전체')
            delete filter[keys[idx]];
    }
    try {
        const orders = await Order.findAll({
            where: filter,
            include: [Age, Price]
        });

        const ordersForPage = [];
        for (let idx = 0; idx < orders.length; ++idx) {
            console.log(orders[idx]);
            const receivers = await orders[idx].getReceiver({
                include: Product,
            });
            const tmpOrderData = await setOrderInfo(orders[idx], receivers[0]);
            ordersForPage.push(tmpOrderData);
        }
        res.json(ordersForPage);
    } catch (err) {
        console.error('필터된 상품 조회 오류:', err);
        next(err);
    }
}

function getAgeList(ages) { const ageList = ['전체'];
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