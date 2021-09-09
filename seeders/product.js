'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const extName = 'jpeg';
        const thumbnailDir = '/tmp/example_thumbnails/';

        let productSeed = [{
            id: 1,
            code: 701,
            name: '철봉',
            thumbnail: thumbnailDir + '철봉' + '.' + extName,
            description: '집에서도 즐거운 운동을 할 수 있습니다.',
            detail: '철 70% 봉 30%',
            age_id: 1,
            price_id: 1,
            gender: '전체',
            price: 15000,
        }, {
            id: 2,
            code: 702,
            name: '손선풍기',
            thumbnail: thumbnailDir + '손선풍기' + '.' + extName,
            description: '손을 시원하게 해줍니다.',
            detail: '모델명: KING310',
            age_id: 2,
            price_id: 2,
            gender: '여',
            price: 20000,
        }, {
            id: 3,
            code: 703,
            name: '스탠드',
            thumbnail: thumbnailDir + '스탠드' + '.' + extName,
            description: '똑바로 서있습니다.',
            detail: '최대 소비전력: 30Wh',
            age_id: 3,
            price_id: 5,
            gender: '전체',
            price: 35000,
        }, {
            id: 4,
            code: 704,
            name: '아령',
            thumbnail: thumbnailDir + '아령' + '.' + extName,
            description: '가볍습니다.',
            detail: '철 20%',
            age_id: 1,
            price_id: 1,
            gender: '전체',
            price: 15000,
        }, {
            id: 5,
            code: 705,
            name: '골프장갑',
            description: '손에 착착 감깁니다.',
            detail: '고무 70%',
            thumbnail: thumbnailDir + '골프장갑' + '.' + extName,
            age_id: 1,
            price_id: 1,
            gender: '전체',
            price: 15000,
        }, {
            id: 6,
            code: 706,
            name: '매니큐어',
            description: '쉽게 지워집니다.',
            detail: '에탄올 함유',
            thumbnail: thumbnailDir + '매니큐어' + '.' + extName,
            age_id: 1,
            price_id: 1,
            gender: '전체',
            price: 15000,
        }];
        await queryInterface.bulkInsert('products', productSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('products', null, {});
    }
};
