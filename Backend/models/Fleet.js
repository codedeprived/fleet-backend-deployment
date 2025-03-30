// models/Fleet.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Fleet = sequelize.define('Fleet', {
  vehicle_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'drivers', key: 'driver_id' },
    onDelete: 'SET NULL'
  },
  vehicle_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chassis_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  kilometers_driven: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'fleet'
});

module.exports = Fleet;
