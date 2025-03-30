const { sequelize, authenticateDatabase, syncDatabase } = require('./db'); // Adjust path as needed
const Admin = require('../models/Admin'); // Adjusted path
const Driver = require('../models/Driver'); // Adjusted path
const Fleet = require('../models/Fleet'); // Adjusted path
const Trip = require('../models/Trip'); // Adjusted path
const Maintenance = require('../models/Maintenance'); // Adjusted path
const Fuel = require('../models/Fuel');

const testDatabase = async () => {
  try {
    await authenticateDatabase(); // Authenticate database connection

    // Sync the models in the correct order (excluding Organization)
    await Admin.sync({ force: true }); // Sync Admins
    console.log('Admins table created.');

    await Driver.sync({ force: true }); // Sync Drivers
    console.log('Drivers table created.');

    await Fleet.sync({ force: true }); // Sync Fleets
    console.log('Fleets table created.');

    await Trip.sync({ force: true }); // Sync Trips
    console.log('Trips table created.');

    await Maintenance.sync({ force: true }); // Sync Maintenance
    console.log('Maintenance table created.');

    await Fuel.sync({force: true});
    console.log('Fuel Table Created');
    

    // Create sample admin
    const admin = await Admin.create({
      username: 'adminUser',
      password_hash: 'hashedPassword123',
      email: 'admin@example.com',
    });

    console.log('Admin created successfully:', admin.toJSON());

  } catch (error) {
    console.error('Error in database operations:', error);
  } finally {
    await sequelize.close(); // Close connection after operations
    console.log('Database connection closed.');
  }
};

testDatabase();
