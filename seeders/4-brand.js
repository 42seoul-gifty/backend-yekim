// seeders/타임스탬프-1-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let brandSeed = [{
            id: 1,
            name: '건강맨',
        }, {
            id: 2,
            name: '시워언해',
        }, {
            id: 3,
            name: '샤이니 컴퍼니',
        }, {
            id: 4,
            name: '올영세일',
        }];
        await queryInterface.bulkInsert('brands', brandSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('brands', null, {});
    }
};