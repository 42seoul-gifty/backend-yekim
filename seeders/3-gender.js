// seeders/타임스탬프-1-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const genderSeed = [];
        genderSeed.push({
            id: 1,
            type: "전체",
            active: true,
        });
        genderSeed.push({
            id: 2,
            type: "남성",
            active: true,
        });
        genderSeed.push({
            id: 3,
            type: "여성",
            active: true,
        });
        console.log(genderSeed);
        await queryInterface.bulkInsert('genders', genderSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('genders', null, {});
    }
};