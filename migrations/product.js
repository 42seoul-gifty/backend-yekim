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
                type: DataTypes.STRING,
                notNull: true
            },
            thumbnail: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            detail: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price: {
                type: DataTypes.INTEGER,
                notNull: true
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
    }
};