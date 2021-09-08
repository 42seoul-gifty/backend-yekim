// seeders/타임스탬프-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let userSeed = [];
        const emailForm = '@student.42seoul.kr';
        const userNames = ['yekim', 'yelee', 'yekang', 'yepark', 'yelim'];
        for (let i = 0; i < 5; ++i) {
            let tmpUser = {
                id: i + 1,
                name: userNames[i],
                email: userNames[i] + emailForm,
            }
            userSeed.push(tmpUser);
        }
        await queryInterface.bulkInsert('users', userSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};