'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let orderSeed = [];
        const orderGiverNames = ['김주는', '이주는', '강주는', '박주는', '임주는'];
        const orderGiverPhones = ['01056781234', '01067851234', '01078561234', '01085671234', '01057681234'];
        for (let i = 0; i < 5; ++i) {
            let tmpOrder = {
                id: i + 1,
                giverName: orderGiverNames[i],
                giverPhone: orderGiverPhones[i],
                createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            }
            orderSeed.push(tmpOrder);
        }
        await queryInterface.bulkInsert('orders', orderSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('orders', null, {});
    }
};
