// models/Fuel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Fuel = sequelize.define('Fuel', {
  fuel_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fuel_in_liters: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fleet', // References Fleet table
      key: 'vehicle_id',
    },
    onDelete: 'CASCADE',
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'drivers', // References Driver table
      key: 'driver_id',
    },
    onDelete: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'fuel_logs',
});

module.exports = Fuel;
