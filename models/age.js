'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Age extends Model {
        static associate(models) {
            Age.hasMany(models.Order, {
                foreignKey: 'age_id',
            });
            Age.hasMany(models.Product, {
                foreignKey: 'age_id',
            });
        }
    };
    Age.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        range: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'Age',
        tableName: 'ages',
        timestamps: false,
    });
    return Age;
};