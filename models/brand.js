'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            Brand.hasMany(models.Product, {
                foreignKey: 'brand_id',
            });
        }
    };
    Brand.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Brand',
        tableName: 'brands',
        timestamps: false,
    });
    return Brand;
};