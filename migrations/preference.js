'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('preferences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            gender: {
                type: Sequelize.STRING
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('preferences');
    }
};