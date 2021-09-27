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
            Order.belongsTo(models.Gender, {
                foreignKey: 'gender_id',
            });
            Order.belongsTo(models.Age, {
                foreignKey: 'age_id',
            });
            Order.belongsTo(models.Price, {
                foreignKey: 'price_id',
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
        },
        purchaseAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        merchantUid: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        impUid: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        paymentStatus: {
            type: DataTypes.STRING,
            notNull: true,
            defaultValue: "결제대기"
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
    });
    return Order;
};