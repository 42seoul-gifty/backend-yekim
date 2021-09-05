'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let preferenceSeed = [];
        const preferenceGenders = ['전체', '남', '전체', '여', '여'];
        for (let i = 0; i < 5; ++i) {
            let tmpPreference = {
                id: i + 1,
                gender: preferenceGenders[i],
            }
            preferenceSeed.push(tmpPreference);
        }
        await queryInterface.bulkInsert('preferences', preferenceSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('preferences', null, {});
    }
};
