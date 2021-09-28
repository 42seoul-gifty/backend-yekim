'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let orderSeed = [{
            id: 1,
            giverName: '김주는',
            giverPhone: '01056781234',
            merchantUid: 'GIFTY20210928-000001',
            gender_id: 2,
            age_id: 1,
            price_id: 1,
            user_id: 1,
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }, {
            id: 2,
            giverName: '이주는',
            giverPhone: '01067851234',
            merchantUid: 'GIFTY20210928-000002',
            gender_id: 3,
            age_id: 2,
            price_id: 2,
            user_id: 1,
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }, {
            id: 3,
            giverName: '강주는',
            giverPhone: '01078561234',
            merchantUid: 'GIFTY20210928-000003',
            gender_id: 3,
            age_id: 3,
            price_id: 5,
            user_id: 2,
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }];
        await queryInterface.bulkInsert('orders', orderSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('orders', null, {});
    }
};
