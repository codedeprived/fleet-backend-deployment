const Maintenance = require('../models/Maintenance');

// Get all maintenance records
/**
 * Fetches all maintenance records from the database.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} List of maintenance records in JSON format or error message
 */
const getAllMaintenanceRecords = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.findAll();
    res.json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance records', error });
  }
};

// Add a new maintenance record
/**
 * Adds a new maintenance record to the database.
 * @param {object} req - Express request object containing maintenance record details
 * @param {object} res - Express response object
 * @returns {object} Created maintenance record in JSON format or error message
 */
const addMaintenanceRecord = async (req, res) => {
  
  try {
       // Extract driver_id from the JWT token (assuming you have middleware to decode the JWT and add driver_id to req)
       const driver_id = req.user.driver_id; // req.user should have been populated by authentication middleware

    const { vehicle_id, maintenance_date, description, cost } = req.body;
    const newMaintenanceRecord = await Maintenance.create({
      vehicle_id,
      driver_id,
      maintenance_date,
      description,
      cost,
    });
    res.status(201).json(newMaintenanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error adding maintenance record', error });
  }
};

// Update a maintenance record by ID
/**
 * Updates an existing maintenance record by its ID.
 * @param {object} req - Express request object containing updated maintenance details
 * @param {object} res - Express response object
 * @returns {object} Updated maintenance record or error message
 */
const updateMaintenanceRecord = async (req, res) => {
  const { id } = req.params;
  const { vehicle_id, driver_id, maintenance_date, description, cost } = req.body;

  try {
    const maintenanceRecord = await Maintenance.findByPk(id);
    if (!maintenanceRecord) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    maintenanceRecord.vehicle_id = vehicle_id || maintenanceRecord.vehicle_id;
    maintenanceRecord.driver_id = driver_id || maintenanceRecord.driver_id;
    maintenanceRecord.maintenance_date = maintenance_date || maintenanceRecord.maintenance_date;
    maintenanceRecord.description = description || maintenanceRecord.description;
    maintenanceRecord.cost = cost || maintenanceRecord.cost;

    await maintenanceRecord.save();
    res.json(maintenanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating maintenance record', error });
  }
};

// Delete a maintenance record by ID
/**
 * Deletes a maintenance record by its ID.
 * @param {object} req - Express request object containing maintenance record ID
 * @param {object} res - Express response object
 * @returns {object} Success message or error message
 */
const deleteMaintenanceRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const maintenanceRecord = await Maintenance.findByPk(id);
    if (!maintenanceRecord) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    await maintenanceRecord.destroy();
    res.json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting maintenance record', error });
  }
};

// Find maintenance records by vehicle ID
/**
 * Finds maintenance records by vehicle ID.
 * @param {object} req - Express request object containing vehicle ID
 * @param {object} res - Express response object
 * @returns {object} List of maintenance records or error message
 */
const findMaintenanceRecordsByVehicle = async (req, res) => {
  const { vehicle_id } = req.params;

  try {
    const maintenanceRecords = await Maintenance.findAll({ where: { vehicle_id } });
    if (!maintenanceRecords.length) {
      return res.status(404).json({ message: 'No maintenance records found for this vehicle' });
    }

    res.json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error finding maintenance records', error });
  }
};

// Find Maintenance by driver ID (using JWT's driverId)
const findMaintenanceRecordsByDriver = async (req, res) => {
  try {
    const driverId = req.user.driver_id; // Access the driverId from the JWT payload (req.user.id is set by authMiddleware)
    if (!driverId) {
      return res.status(400).send({
        success: false,
        message: "Driver Id not found in the token. "
      })
    }


    const maintenanceRecords = await Maintenance.findAll({
      where: { driver_id: driverId }
    });
    if (!maintenanceRecords || maintenanceRecords.length === 0) {
      return res.status(404).json({ message: 'No maintenance records found for this driver' });
    }

    res.status(200).json(maintenanceRecords);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Error finding maintenance records',
      error: error.message
    });
  }
};


module.exports = {
  getAllMaintenanceRecords,
  addMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
  findMaintenanceRecordsByVehicle,
  findMaintenanceRecordsByDriver
};
