exports.getAgeRange = function(age) {
    const tmpAgeRange = age.range.split(',');
    let ageRange;
    if (tmpAgeRange.length === 1) {
        ageRange = `${tmpAgeRange[0]}세 이상`;
    } else {
        ageRange = `${tmpAgeRange[0]}~${tmpAgeRange[1]}세`;
    }
    return ageRange;
}

exports.getPriceRange = function(price) {
    const tmpPriceRange = price.range;
    let priceRange;
    if (tmpPriceRange % 10000 === 0) {
        priceRange = `${tmpPriceRange /10000}만원`;
    } else {
        priceRange = `${parseInt(tmpPriceRange /10000)}만 ${parseInt(tmpPriceRange % 10000 / 1000)}천원`;
    }
    return priceRange;
}

