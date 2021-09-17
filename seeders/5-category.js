'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let categorySeed = [{
            id: 1,
            type: '화장품',
        }, {
            id: 2,
            type: '식품',
        }, {
            id: 3,
            type: '건강',
        }, {
            id: 4,
            type: '리빙',
        }, {
            id: 5,
            type: '패션잡화',
        }, {
            id: 6,
            type: '디지털',
        }];
        await queryInterface.bulkInsert('categories', categorySeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('categories', null, {});
    }
};