'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.hasMany(models.Receiver, {
                foreignKey: 'order_id',
                as: 'Receiver',
            });
        }
    };
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        giverName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        giverPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
    });
    return Order;
};