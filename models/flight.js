const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Aircraft = require('./aircraft');

const Flight = sequelize.define('Flight', {
    flight_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    aircraft_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aircraft,
            key: 'aircraft_id'
        }
    },
    flight_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departure_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    arrival_time: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'flight',
    timestamps: false
});

Flight.belongsTo(Aircraft, { foreignKey: 'aircraft_id' });

module.exports = Flight; 