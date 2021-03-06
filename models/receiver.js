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
            Receiver.belongsTo(models.Product, {
                foreignKey: 'product_id',
            });
            Receiver.belongsToMany(models.Product, {
                through: 'Like',
                foreignKey: 'receiver_id',
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
        shipmentStatus: {
            type: DataTypes.STRING,
            notNull: true,
            defaultValue: "배송전"
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'Receiver',
        tableName: 'receivers',
        timestamps: false,
    });
    return Receiver;
};