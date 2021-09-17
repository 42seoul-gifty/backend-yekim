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
            Product.belongsTo(models.Category, {
                foreignKey: 'category_id',
            });
            Product.belongsTo(models.Age, {
                foreignKey: 'age_id',
            });
            Product.belongsTo(models.Price, {
                foreignKey: 'price_id',
            });
            Product.belongsTo(models.Brand, {
                foreignKey: 'brand_id',
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
        link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            notNull: true
        },
        feeRate: {
            type: DataTypes.INTEGER,
            notNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'Product',
        tableName: 'products',
        timestamps: false
    });
    return Product;
};