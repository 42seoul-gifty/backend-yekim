'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Price extends Model {
        static associate(models) {
            Price.hasMany(models.Order, {
                foreignKey: 'price_id',
            });
            Price.hasMany(models.Product, {
                foreignKey: 'price_id',
            });
        }
    };
    Price.init({
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
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'Price',
        tableName: 'prices',
        timestamps: false,
    });
    return Price;
};