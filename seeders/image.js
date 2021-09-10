// seeders/타임스탬프-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const imageDir = '/tmp/uploads_example/images/';
        const extName = 'jpeg';
        const imageSeed = [{
            id: 1,
            url: imageDir + '철봉1.' + extName,
            // product_id: 1,
        }, {
            id: 2,
            url: imageDir + '철봉2.' + extName,
            // product_id: 1,
        }, {
            id: 3,
            url: imageDir + '손선풍기1.' + extName,
            // product_id: 2,
        }, {
            id: 4,
            url: imageDir + '스탠드1.' + extName,
            // product_id: 3,
        }, {
            id: 5,
            url: imageDir + '스탠드2.' + extName,
            // product_id: 3,
        }, {
            id: 6,
            url: imageDir + '스탠드3.' + extName,
            // product_id: 3,
        }];

        await queryInterface.bulkInsert('images', imageSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('images', null, {});
    }
};