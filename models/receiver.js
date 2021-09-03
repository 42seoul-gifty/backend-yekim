'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Receiver extends Model {
        static associate(models) {
        }
    };
    Receiver.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            notNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            notNull: true,
        }
    }, {
        sequelize,
        modelName: 'Receiver',
        timestamps: false,
    });
    return Receiver;
};