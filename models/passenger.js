const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Passenger = sequelize.define('Passenger', {
    passenger_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passport_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'passenger',
    timestamps: false
});

module.exports = Passenger; 