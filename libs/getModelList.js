exports.getGenderList = function(gender) {
    const genderList = ['공란'];
    for (let idx = 0; idx < gender.length; ++idx) {
        genderList.push(gender[idx].type);
    }
    return genderList;
}

exports.getAgeList = function(ages) {
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

exports.getPriceList = function(prices) {
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

exports.getCategoryList = function(categories) {
    const categoryList = ['카테고리'];
    categories.forEach(category => {
        categoryList.push(category.type);
    });
    return categoryList;
}

exports.getBrandList = function(brands) {
    const brandList = ['판매처'];
    brands.forEach(brand => {
        brandList.push(brand.name);
    });
    return brandList;
}
