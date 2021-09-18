module.exports = function getPriceRange(price) {
    const tmpPriceRange = price.range;
    let priceRange;
    if (tmpPriceRange % 10000 === 0) {
        priceRange = `${tmpPriceRange /10000}만원`;
    } else {
        priceRange = `${parseInt(tmpPriceRange /10000)}만 ${parseInt(tmpPriceRange % 10000 / 1000)}천원`;
    }
    return priceRange;
}

