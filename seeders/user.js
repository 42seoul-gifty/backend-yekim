// seeders/타임스탬프-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let userSeed = [];
        const emailForm = '@student.42seoul.kr';
        const userNames = ['yekim', 'yelee', 'yekang', 'yepark', 'yelim'];
        const userPhones = ['01050175933', '01050165933', '01050155933', '01050145933', '0105135933'];
        for (let i = 0; i < 5; ++i) {
            let tmpUser = {
                id: i + 1,
                name: userNames[i],
                email: userNames[i] + emailForm,
                phone: userPhones[i],
            }
            userSeed.push(tmpUser);
        }
        await queryInterface.bulkInsert('users', userSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};