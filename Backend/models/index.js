const Admin = require('./Admin');
const Driver = require('./Driver');
const Fleet = require('./Fleet');
const Trip = require('./Trip');
const Maintenance = require('./Maintenance');

// Associations

// Admin is independent, no direct associations needed here.

// Fleet and Driver relationship: A driver can be assigned to a vehicle.
Fleet.belongsTo(Driver, { foreignKey: 'driver_id', allowNull: true }); // Driver can be assigned to a vehicle

Driver.hasMany(Trip, { foreignKey: 'driver_id' });
Driver.hasMany(Maintenance, { foreignKey: 'driver_id' });

// Fleet associations: A vehicle can have multiple maintenance records, logged by the assigned driver.
Fleet.hasMany(Maintenance, { foreignKey: 'vehicle_id' });

// Trip and Maintenance logs by the driver
Trip.belongsTo(Driver, { foreignKey: 'driver_id' });
Maintenance.belongsTo(Driver, { foreignKey: 'driver_id' });
Maintenance.belongsTo(Fleet, { foreignKey: 'vehicle_id' });
