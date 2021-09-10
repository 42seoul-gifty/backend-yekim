'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Order, {
                foreignKey: 'product_id',
            });
            Product.hasMany(models.Image, {
                foreignKey: 'product_id',
            });
            Product.belongsToMany(models.Receiver, {
                through: 'Like',
                foreignKey: 'product_id',
            });
        }
    };
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.INTEGER,
            notNull: true,
            uniqueKey: true,
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
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: false
    });
    return Product;
};