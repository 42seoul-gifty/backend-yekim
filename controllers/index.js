const { Age, Price } = require('../models');
const setResponseForm = require('../libs/setResponseForm');

exports.getAges = async function (req, res, next) {
    try {
        let ageDetails = [];
        const ages = await Age.findAll({
            attributes: ["id", "range"],
        });

        for (let idx = 0; idx < ages.length; ++idx) {
            let tmpAgeDetail = {};
            tmpAgeDetail.id = ages[idx].dataValues.id;
            tmpAgeDetail.value = ages[idx].dataValues.range.split(',').map(x => parseInt(x, 10));
            ageDetails.push(tmpAgeDetail);
        }

        const msg = '연령대 카테고리가 조회되었습니다.';
        const ret = setResponseForm(true, ageDetails, msg);
        res.json(ret);
    } catch (err) {
        console.error("연령대 카테고리 조회 오류:", err);
        next(err);
    }
}

exports.getPrices = async function (req, res, next) {
    try {
        let priceDetails = [];
        const prices = await Price.findAll({
            attributes: ["id", "range"],
        });

        for (let idx = 0; idx < prices.length; ++idx) {
            let tmpPriceDetail = {};
            tmpPriceDetail.id = prices[idx].dataValues.id;
            tmpPriceDetail.value = parseInt(prices[idx].dataValues.range, 10);
            priceDetails.push(tmpPriceDetail);
        }
        const msg = '가격대 카테고리가 조회되었습니다.';
        const ret = setResponseForm(true, priceDetails, msg);
        res.json(ret);
    } catch (err) {
        console.error("가격대 카테고리 조회 오류:", err);
        next(err);
    }
}
