// models/Maintenance.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Maintenance = sequelize.define('Maintenance', {
  record_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'fleet', key: 'vehicle_id' },
    onDelete: 'CASCADE'
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'drivers', key: 'driver_id' },
    onDelete: 'CASCADE'
  },
  maintenance_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'maintenance_records'
});

module.exports = Maintenance;

