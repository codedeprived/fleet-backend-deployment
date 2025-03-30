const Driver = require('../models/Driver');
/**
 * Get all drivers
 * @route GET /api/drivers
 */
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll(); // Fetch all drivers from the database
    res.json(drivers); // Send the drivers as a JSON response
  } catch (error) {
    console.error('Error fetching drivers:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error fetching drivers', error: error.message }); // Return 500 status code with error message
  }
};
/**
 * Add a new driver
 * @route POST /api/drivers
 */
const addDriver = async (req, res) => {
  const { username, password_hash, email, license_number, phone_number } = req.body; // Removed organization_id
  try {
    // Create a new driver entry in the database
    const newDriver = await Driver.create({
      username,
      password_hash,
      email,
      license_number,
      phone_number,
    });

    res.status(201).json(newDriver); // Return the newly created driver with a 201 status code
  } catch (error) {
    console.error('Error adding driver:', error); // Log the error for debugging purposes
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint errors, such as duplicate email or license number
      res.status(400).json({ message: 'Duplicate entry detected', error: error.message });
    } else {
      res.status(500).json({ message: 'Error adding driver', error: error.message }); // General error handler
    }
  }
};

/**
 * Update a driver by ID
 * @route PUT /api/drivers/:id
 */
const updateDriver = async (req, res) => {
  const { id } = req.params; // Extract driver ID from request params
  const { username, email, license_number, phone_number } = req.body; // Extract fields to update from request body
  try {
    const driver = await Driver.findByPk(id); // Find driver by primary key (ID)
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' }); // Return 404 if driver doesn't exist
    }
    // Update driver fields if they are provided, otherwise keep the existing values
    driver.username = username || driver.username;
    driver.email = email || driver.email;
    driver.license_number = license_number || driver.license_number;
    driver.phone_number = phone_number || driver.phone_number;
    await driver.save(); // Save updated driver to the database
    res.json(driver); // Return the updated driver
  } catch (error) {
    console.error('Error updating driver:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error updating driver', error: error.message }); // Return 500 status code with error message
  }
};
/**
 * Delete a driver by ID
 * @route DELETE /api/drivers/:id
 */
const deleteDriver = async (req, res) => {
  const { id } = req.params; // Extract driver ID from request params

  try {
    const driver = await Driver.findByPk(id); // Find driver by primary key (ID)
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' }); // Return 404 if driver doesn't exist
    }

    await driver.destroy(); // Delete driver from the database
    res.json({ success:true , message: 'Driver deleted successfully' }); // Return success message
  } catch (error) {
    console.error('Error deleting driver:', error); // Log the error for debugging purposes
    res.status(500).json({ success:false ,  message: 'Error deleting driver', error: error.message }); // Return 500 status code with error message
  }
};
/**
 * Get a driver by ID
 * @route GET /api/drivers/:id
 */
const getDriverById = async (req, res) => {
  const { id } = req.params; // Extract driver ID from request params
  try {
    const driver = await Driver.findByPk(id); // Find driver by primary key (ID)
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' }); // Return 404 if driver doesn't exist
    }

    res.json(driver); // Return the found driver as JSON
  } catch (error) {
    console.error('Error fetching driver:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error fetching driver', error: error.message }); // Return 500 status code with error message
  }
};
/**
 * Find a driver by username
 * @route GET /api/drivers/username/:username
 */
const findDriverByUsername = async (req, res) => {
  const { username } = req.params; // Extract username from request params

  try {
    const driver = await Driver.findOne({ where: { username } }); // Find driver by username
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' }); // Return 404 if driver doesn't exist
    }

    res.json(driver); // Return the found driver as JSON
  } catch (error) {
    console.error('Error finding driver:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error finding driver', error: error.message }); // Return 500 status code with error message
  }
};

module.exports = {
  getDriverById,
  getAllDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
  findDriverByUsername,
};
