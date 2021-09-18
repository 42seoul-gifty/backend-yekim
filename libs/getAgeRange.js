module.exports = function getAgeRange(age) {
    const tmpAgeRange = age.range.split(',');
    let ageRange;
    if (tmpAgeRange.length === 1) {
        ageRange = `${tmpAgeRange[0]}세 이상`;
    } else {
        ageRange = `${tmpAgeRange[0]}~${tmpAgeRange[1]}세`;
    }
    return ageRange;
}