// seeders/타임스탬프-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const emailForm = '@student.42seoul.kr';
        const userSeed = [{
            id: 1,
            name: 'yekim',
            email: 'yekim' + emailForm,
            loginType: 1,
        }, {
            id: 2,
            name: 'yelee',
            email: 'yelee' + emailForm,
            loginType: 1,
        }, {
            id: 3,
            name: 'yekang',
            email: 'yekang' + emailForm,
            loginType: 1,
        }];
        await queryInterface.bulkInsert('users', userSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};