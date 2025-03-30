const Admin = require('../models/Admin');

/**
 * Get all admins
 * @route GET /api/admins
 */
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll(); // Fetch all admins from the database
    res.json(admins); // Send the admins data as a JSON response
  } catch (error) {
    console.error('Error fetching admins:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error fetching admins', error: error.message }); // Return 500 status code with error message
  }
};

/**
 * Add a new admin
 * @route POST /api/admins
 */
const addAdmin = async (req, res) => {
  const { username, password_hash, email } = req.body;

  try {
    // Create a new admin entry in the database
    const newAdmin = await Admin.create({
      username,
      password_hash,
      email,
    });

    res.status(201).json(newAdmin); // Return the newly created admin with a 201 status code
  } catch (error) {
    console.error('Error adding admin:', error); // Log the error for debugging purposes
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Username or email already exists', error: error.message });
    } else {
      res.status(500).json({ message: 'Error adding admin', error: error.message }); // General error handler
    }
  }
};

/**
 * Update an admin by ID
 * @route PUT /api/admins/:id
 */
const updateAdmin = async (req, res) => {
  const { id } = req.params; // Extract admin ID from request params
  const { username, email, password_hash } = req.body; // Extract fields to update from request body

  try {
    const admin = await Admin.findByPk(id); // Find admin by primary key (ID)
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' }); // Return 404 if admin doesn't exist
    }

    // Update admin fields if they are provided, otherwise keep the existing values
    admin.username = username || admin.username;
    admin.email = email || admin.email;
    admin.password_hash = password_hash || admin.password_hash;

    await admin.save(); // Save updated admin to the database
    res.json(admin); // Return the updated admin
  } catch (error) {
    console.error('Error updating admin:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error updating admin', error: error.message }); // Return 500 status code with error message
  }
};

/**
 * Delete an admin by ID
 * @route DELETE /api/admins/:id
 */
const deleteAdmin = async (req, res) => {
  const { id } = req.params; // Extract admin ID from request params

  try {
    const admin = await Admin.findByPk(id); // Find admin by primary key (ID)
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' }); // Return 404 if admin doesn't exist
    }

    await admin.destroy(); // Delete admin from the database
    res.json({ message: 'Admin deleted successfully' }); // Return success message
  } catch (error) {
    console.error('Error deleting admin:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error deleting admin', error: error.message }); // Return 500 status code with error message
  }
};

/**
 * Find an admin by username
 * @route GET /api/admins/username/:username
 */
const findAdminByUsername = async (req, res) => {
  const { username } = req.params; // Extract username from request params

  try {
    const admin = await Admin.findOne({ where: { username } }); // Find admin by username
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' }); // Return 404 if admin doesn't exist
    }

    res.json(admin); // Return the found admin as JSON
  } catch (error) {
    console.error('Error finding admin by username:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error finding admin by username', error: error.message }); // Return 500 status code with error message
  }
};

module.exports = {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  findAdminByUsername,
};
