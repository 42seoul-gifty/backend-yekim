'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                notNull: true
            },
            thumbnail: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            detail: {
                type: Sequelize.STRING,
                allowNull: true
            },
            price: {
                type: Sequelize.INTEGER,
                notNull: true
            },
            gender: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
    }
};