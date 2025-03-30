// models/Trip.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Trip = sequelize.define('Trip', {
  trip_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'drivers', key: 'driver_id' },
    onDelete: 'CASCADE'
  },
  start_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  distance_km: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  purpose: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'trips'
});

module.exports = Trip;
