// seeders/타임스탬프-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let ageCategorySeed = [];
        const startAge = 20;
        for (let i = 0; i <= 5; ++i) {
            let tmpAgeCategory = {};
            if (i === 5) {
                tmpAgeCategory.id = i + 1;
                const tmpRange = startAge + 5 * i;
                tmpAgeCategory.range = `${tmpRange}`;
            } else {
                tmpAgeCategory.id = i + 1;
                const tmpRange = [startAge + 5 * i, (startAge + 4) + 5 * i];
                tmpAgeCategory.range = `${tmpRange[0]},${tmpRange[1]}`;

            }
            console.log(tmpAgeCategory);
            ageCategorySeed.push(tmpAgeCategory);
        }
        await queryInterface.bulkInsert('agecategorys', ageCategorySeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('agecategorys', null, {});
    }
};