'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let priceSeed = [];
        const startPrice = 15000;
        for (let i = 0; i < 8; ++i) {
            const tmpPrice = {};
            tmpPrice.id = i + 1;
            tmpPrice.range = (startPrice + i * 5000).toString();
            tmpPrice.active = true;
            priceSeed.push(tmpPrice);
        }
        await queryInterface.bulkInsert('prices', priceSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('prices', null, {});
    }
};