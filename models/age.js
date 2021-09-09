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
        }
    };
    Age.init({
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
        modelName: 'Age',
        tableName: 'ages',
        timestamps: false,
    });
    return Age;
};