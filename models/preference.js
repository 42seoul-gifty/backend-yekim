'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Preference extends Model {
        static associate(models) {
            Preference.hasOne(models.Receiver, {
                foreignKey: 'preference_id',
                // TODO: cascade 관계들 설정하기
                // onDelete: 'cascade',
            });
        }
    };
    Preference.init({
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Preference',
        tableName: 'preferences',
        timestamps: false,
    });
    return Preference;
};