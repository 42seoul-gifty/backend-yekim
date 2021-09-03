'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let productSeed = [];
        const productNames = ['영양제', '손선풍기', '스탠드', '책받침', '손청소기'];
        const productThumbnails = [];
        const productPrices = [30000, 15000, 35000, 7000, 150000];
        for (let i = 0; i < 5; ++i) {
            let tmpProduct = {
                id: i + 1,
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
