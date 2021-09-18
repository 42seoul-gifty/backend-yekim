'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let receiverSeed = [{
            id: 1,
            name: '김받는',
            phone: '01012345678',
            order_id: 1,
            postcode: 15243,
            address: '서울특별시 강남구',
            detailAddress: '산아파트 103동',
            product_id: 1,
        }, {
            id: 2,
            name: '이받는',
            phone: '01023415678',
            order_id: 2,
            postcode: 12453,
            address: '서울특별시 관악구',
            detailAddress: '바다아파트 301동',
        }, {
            id: 3,
            name: '강받는',
            phone: '01034125678',
            order_id: 3,
            postcode: 24315,
            address: '인천광역시 계양구',
            detailAddress: '강아파트 201동',
        }];
        await queryInterface.bulkInsert('receivers', receiverSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('receivers', null, {});
    }
};
