// seeders/타임스탬프-1-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let categorySeed = [{
            id: 1,
            type: '건강',
        }, {
            id: 2,
            type: '식품',
        }, {
            id: 3,
            type: '가전',
        }, {
            id: 4,
            type: '악세서리',
        }, {
            id: 5,
            type: '뷰티',
        }];
        await queryInterface.bulkInsert('categories', categorySeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('categories', null, {});
    }
};