'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            range: {
                type: Sequelize.STRING
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ages');
    }
};