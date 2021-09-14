'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const extName = 'jpeg';
        const thumbnailDir = '/tmp/upload_example/thumbnails/';

        let productSeed = [{
            id: 1,
            code: 701,
            name: '철봉',
            thumbnail: thumbnailDir + '철봉' + '.' + extName,
            description: '집에서도 즐거운 운동을 할 수 있습니다.',
            detail: '철 70% 봉 30%',
            gender: '전체',
            age_id: 1,
            price_id: 1,
            category_id: 3,
            brand_id: 1,
            price: 15000,
        }, {
            id: 2,
            code: 702,
            name: '손선풍기',
            thumbnail: thumbnailDir + '손선풍기' + '.' + extName,
            description: '손을 시원하게 해줍니다.',
            detail: '모델명: KING310',
            gender: '전체',
            age_id: 2,
            price_id: 2,
            category_id: 4,
            brand_id: 2,
            price: 20000,
        }, {
            id: 3,
            code: 703,
            name: '스탠드',
            thumbnail: thumbnailDir + '스탠드' + '.' + extName,
            description: '똑바로 서있습니다.',
            detail: '최대 소비전력: 30Wh',
            gender: '전체',
            age_id: 3,
            price_id: 5,
            category_id: 6,
            brand_id: 3,
            price: 35000,
        }, {
            id: 4,
            code: 704,
            name: '아령',
            thumbnail: thumbnailDir + '아령' + '.' + extName,
            description: '가벼워서 운동이 안 될지도 모릅니다.',
            detail: '철 20%',
            gender: '전체',
            age_id: 1,
            price_id: 1,
            category_id: 3,
            brand_id: 1,
            price: 15000,
        }, {
            id: 5,
            code: 705,
            name: '골프장갑',
            description: '미끄러워서 채를 놓칠 수도 있습니다.',
            detail: '고무 70%',
            thumbnail: thumbnailDir + '골프장갑' + '.' + extName,
            gender: '전체',
            age_id: 1,
            price_id: 1,
            category_id: 3,
            brand_id: 1,
            price: 15000,
        }, {
            id: 6,
            code: 706,
            name: '매니큐어',
            description: '쉽게 지워집니다.',
            detail: '에탄올 함유',
            thumbnail: thumbnailDir + '매니큐어' + '.' + extName,
            gender: '여성',
            age_id: 1,
            price_id: 1,
            category_id: 1,
            brand_id: 4,
            price: 15000,
        }];
        await queryInterface.bulkInsert('products', productSeed, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('products', null, {});
    }
};
