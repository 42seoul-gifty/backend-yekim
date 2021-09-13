// seeders/타임스탬프-1-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const emailForm = '@student.42seoul.kr';
        const dates = [
            new Date(2021, 3, 30),
            new Date(2021, 3, 19),
            new Date(2021, 4, 30),
        ]
        const userSeed = [{
            id: 1,
            name: 'yekim',
            email: 'yekim' + emailForm,
            loginType: 1,
            createdAt: dates[0].toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: dates[0].toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }, {
            id: 2,
            name: 'yelee',
            email: 'yelee' + emailForm,
            loginType: 1,
            createdAt: dates[1].toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: dates[1].toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }, {
            id: 3,
            name: 'yekang',
            email: 'yekang' + emailForm,
            loginType: 1,
            createdAt: dates[2].toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: dates[2].toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }];
        await queryInterface.bulkInsert('users', userSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};