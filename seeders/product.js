'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const productsNum = 5;
        const extName = 'jpeg';
        const thumbnailDir = '/tmp/example_thumbnails';

        const productNames = ['철봉', '손선풍기', '스탠드', '책받침', '손청소기'];

        let productSeed = [{
            id: 1,
            code: 701,
            name: productNames[0],
            thumbnail: thumbnailDir + productNames[0] + '.' + extName,
            price: 15000,
        }, {
            id: 2,
            code: 702,
            name: productNames[1],
            thumbnail: thumbnailDir + productNames[1] + '.' + extName,
            price: 10000,
        }, {
            id: 3,
            code: 703,
            name: productNames[2],
            thumbnail: thumbnailDir + productNames[2] + '.' + extName,
            price: 35000,
        }];
        await queryInterface.bulkInsert('products', productSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('products', null, {});
    }
};
