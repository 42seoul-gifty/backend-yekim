'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let orderSeed = [{
            id: 1,
            giverName: '김주는',
            giverPhone: '01056781234',
            gender: '남성',
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }, {
            id: 2,
            giverName: '이주는',
            giverPhone: '01067851234',
            gender: '여성',
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }, {
            id: 3,
            giverName: '강주는',
            giverPhone: '01078561234',
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }];
        await queryInterface.bulkInsert('orders', orderSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('orders', null, {});
    }
};
