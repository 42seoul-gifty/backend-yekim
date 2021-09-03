'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let receiverSeed = [];
        const receiverNames = ['김받는', '이받는', '강받는', '박받는', '임받는'];
        const receiverPhone = ['01012345678', '01023415678', '01034125678', '01041235678', '01013245678'];
        for (let i = 0; i < 5; ++i) {
            let tmpReceiver = {
                id: i + 1,
                name: receiverNames[i],
                phone: receiverPhone[i],
            }
            receiverSeed.push(tmpReceiver);
        }
        await queryInterface.bulkInsert('receivers', receiverSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('receivers', null, {});
    }
};
