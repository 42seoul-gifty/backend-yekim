'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static associate(models) {
        }
    };
    Admin.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'Admin',
        tableName: 'admins',
        timestamps: false,
    });
    return Admin;
};