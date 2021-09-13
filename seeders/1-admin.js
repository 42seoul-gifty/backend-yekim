// seeders/타임스탬프-1-user.js 파일
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const emailForm = '@student.42seoul.kr';
        const adminSeed = [{
            id: 1,
            email: 'yekim' + emailForm,
            password: '5933'
        }];
        await queryInterface.bulkInsert('admins', adminSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('admins', null, {});
    }
};