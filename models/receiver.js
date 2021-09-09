'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Receiver extends Model {
        static associate(models) {
            Receiver.belongsTo(models.Order, {
                foreignKey: 'order_id',
            });
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
        },
        postcode: {
            type: DataTypes.INTEGER,
            notNull: true,
        },
        address: {
            type: DataTypes.STRING,
            notNull: true,
        },
        detailAddress: {
            type: DataTypes.STRING,
            notNull: true,
        },
    }, {
        sequelize,
        modelName: 'Receiver',
        timestamps: false,
    });
    return Receiver;
};