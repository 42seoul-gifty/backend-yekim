// seeders/타임스탬프-1-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let ageSeed = [];
        const startAge = 20;
        for (let i = 0; i <= 5; ++i) {
            let tmpAge = {};
            if (i === 5) {
                tmpAge.id = i + 1;
                const tmpRange = startAge + 5 * i;
                tmpAge.range = `${tmpRange}`;
            } else {
                tmpAge.id = i + 1;
                const tmpRange = [startAge + 5 * i, (startAge + 4) + 5 * i];
                tmpAge.range = `${tmpRange[0]},${tmpRange[1]}`;
            }
            ageSeed.push(tmpAge);
        }
        await queryInterface.bulkInsert('ages', ageSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ages', null, {});
    }
};