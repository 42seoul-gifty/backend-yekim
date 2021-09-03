'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const productsNum = 5;
        const extName = 'jpeg';
        const thumbnailDir = '/tmp/example_thumbnails';

        const productCodes = ['1', '10', '11', '110', '101'];
        const productNames = ['영양제', '손선풍기', '스탠드', '책받침', '손청소기'];
        const productPrices = [30000, 15000, 35000, 7000, 150000];
        let productThumbnails = [];
        for (let i = 0; i < productsNum; ++i) {
            productThumbnails.push(thumbnailDir + productNames[i] + extName);
        }

        let productSeed = [];
        for (let i = 0; i < productsNum; ++i) {
            let tmpProduct = {
                id: i + 1,
                code: productCodes[i],
                name: productNames[i],
                thumbnail: productThumbnails[i],
                price: productPrices[i]
            }
            productSeed.push(tmpProduct);
        }
        await queryInterface.bulkInsert('products', productSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('products', null, {});
    }
};
