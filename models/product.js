'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Receiver, {
                foreignKey: 'product_id',
                as: 'Receiver',
            });
        }
    };
    Product.init({
        code: {
            type: DataTypes.INTEGER,
            notNull: true,
            uniqueKey: true,
            // autoIncrement: true,
            // primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            notNull: true
        },
        thumbnail: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
            notNull: true
        }
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: false
    });
    return Product;
};