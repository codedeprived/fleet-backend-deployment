const Driver = require('../models/Driver'); // Ensure correct import
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT



// Register function for driver 
const driverRegister = async (req, res) => {
  const { username, email, phone_number, license_number, password } = req.body; // Removed organization_id
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new driver without organization_id
    const newDriver = await Driver.create({
      username,
      password_hash: hashedPassword,
      email,
      license_number,
      phone_number,
    });

    // Respond with success message
    return res.status(201).json({ message: 'Registration successful!', driver: newDriver });
  } catch (error) {
    console.error("Error registering driver:", error); // More detailed logging
    return res.status(500).json({ message: 'Error registering driver', error: error.message });
  }
};


//  REGISTER FOR ADMIN
const adminRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new admin
    const newAdmin = await Admin.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    // Remove sensitive information before sending the response
    const { password_hash, ...adminData } = newAdmin.toJSON();

    // Send success response
    return res.status(201).json({
      message: 'Admin registration successful!',
      admin: adminData, // Exclude sensitive fields
    });
  } catch (error) {
    console.error('Error registering admin:', error);

    // Handle unique constraint errors (e.g., duplicate email or username)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ message: 'Username or email already exists.', error: error.errors[0].message });
    }

    // General error handler
    return res.status(500).json({
      message: 'An error occurred while registering the admin.',
      error: error.message,
    });
  }
};

// LOGIN FOR DRIVER 
const driverLogin  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ where: { email } }); // Find the driver by email
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' }); // If driver is not found, return an error
    }

    const isPasswordValid = await bcrypt.compare(password, driver.password_hash); // Compare the password with the hashed password
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' }); // If passwords don't match, return an error
    }

    // Generate JWT token with driver ID and email
    const token = jwt.sign(
      { driver_id: driver.driver_id, username: driver.username, email: driver.email}, // Generate JWT with role set to 'driver'
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return res.status(200).json({
      message: 'Login successful!',
      driver: { driver_id: driver.driver_id, username: driver.username, email: driver.email},
      token, // Send token in the response
    });
  } catch (error) {
    console.error('Error logging in driver:', error);
    return res.status(500).json({ message: 'Error logging in driver', error: error.message });
  }
};



// Login FOR ADMIN
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
                                                                                      
    // const isPasswordValid = await bcrypt.compare(password, admin.password_hash); ---------------------------- uncomment this line after login 
    const isPasswordValid = password; // -------------------------------------------------------------- and delete this line 
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT with role set to 'admin'
    const token = jwt.sign(
      { userId: admin.admin_id, username: admin.username ,email: admin.email},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Admin login successful!',
      user: { userId: admin.admin_id, username: admin.username , email: admin.email},
      token,
    });
  } catch (error) {
    console.error('Error logging in admin:', error);
    return res.status(500).json({ message: 'Error logging in admin', error: error.message });
  }
};

module.exports = { driverRegister , driverLogin , adminLogin , adminRegister };
