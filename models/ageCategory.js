'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AgeCategory extends Model {
        static associate(models) {
        }
    };
    AgeCategory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        range: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'AgeCategory',
        tableName: 'agecategorys',
        timestamps: false,
    });
    return AgeCategory;
};