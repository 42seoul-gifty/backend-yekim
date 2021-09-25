'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Gender extends Model {
        static associate(models) {
            Gender.hasMany(models.Order, {
                foreignKey: 'gender_id',
            });
            Gender.hasMany(models.Product, {
                foreignKey: 'gender_id',
            });
        }
    };
    Gender.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'Gender',
        tableName: 'genders',
        timestamps: false,
    });
    return Gender;
};