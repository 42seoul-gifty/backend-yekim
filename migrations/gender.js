'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('genders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('genders');
    }
};