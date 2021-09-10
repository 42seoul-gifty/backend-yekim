'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let receiverSeed = [{
            id: 1,
            name: '김받는',
            phone: '01012345678',
            order_id: 1
        }, {
            id: 2,
            name: '이받는',
            phone: '01023415678',
            order_id: 2
        }, {
            id: 3,
            name: '강받는',
            phone: '01034125678',
            order_id: 3
        }];
        await queryInterface.bulkInsert('receivers', receiverSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('receivers', null, {});
    }
};
