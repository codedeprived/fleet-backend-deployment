const Fleet = require('../models/Fleet');

/**
 * Get all fleet vehicles
 * @route GET /api/fleet 
 */
const getAllFleet = async (req, res) => {
  try {
    const fleet = await Fleet.findAll(); // Fetch all fleet vehicles from the database
    res.json(fleet); // Send the fleet data as a JSON response
  } catch (error) {
    console.error('Error fetching fleet vehicles:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error fetching fleet vehicles', error: error.message }); // Return 500 status code with error message
  }
};

/**
 * Add a new vehicle to the fleet
 * @route POST /api/fleet
 */
const addVehicleToFleet = async (req, res) => {
  const { vehicle_type, chassis_number, kilometers_driven } = req.body; // Removed organization_id

  try {
    // Create a new fleet vehicle entry in the database
    const newVehicle = await Fleet.create({
      vehicle_type,
      chassis_number,
      kilometers_driven
    });

    res.status(201).json(newVehicle); // Return the newly created vehicle with a 201 status code
  } catch (error) {
    console.error('Error adding vehicle to fleet:', error); // Log the error for debugging purposes
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Chassis number already exists', error: error.message });
    } else {
      res.status(500).json({ message: 'Error adding vehicle to fleet', error: error.message }); // General error handler
    }
  }
};

/**
 * Update a fleet vehicle by ID
 * @route PUT /api/fleet/:id
 */
const updateVehicleInFleet = async (req, res) => {
  const { id } = req.params; // Extract vehicle ID from request params
  const { driver_id, vehicle_type, chassis_number, kilometers_driven } = req.body; // Extract fields to update from request body

  try {
    const vehicle = await Fleet.findByPk(id); // Find vehicle by primary key (ID)
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' }); // Return 404 if vehicle doesn't exist
    }

    // Update vehicle fields if they are provided, otherwise keep the existing values
    vehicle.driver_id = driver_id || vehicle.driver_id;
    vehicle.vehicle_type = vehicle_type || vehicle.vehicle_type;
    vehicle.chassis_number = chassis_number || vehicle.chassis_number;
    vehicle.kilometers_driven = kilometers_driven || vehicle.kilometers_driven;

    await vehicle.save(); // Save updated vehicle to the database
    res.json(vehicle); // Return the updated vehicle
  } catch (error) {
    console.error('Error updating vehicle in fleet:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error updating vehicle in fleet', error: error.message }); // Return 500 status code with error message
  }
};

/**
 * Delete a vehicle from the fleet by ID
 * @route DELETE /api/fleet/:id
 */
const deleteVehicleFromFleet = async (req, res) => {
  const { id } = req.params; // Extract vehicle ID from request params

  try {
    const vehicle = await Fleet.findByPk(id); // Find vehicle by primary key (ID)
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' }); // Return 404 if vehicle doesn't exist
    }

    await vehicle.destroy(); // Delete vehicle from the database
    res.json({ message: 'Vehicle deleted successfully' }); // Return success message
  } catch (error) {
    console.error('Error deleting vehicle from fleet:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error deleting vehicle from fleet', error: error.message }); // Return 500 status code with error message
  }
};

/**
 * Find a vehicle in the fleet by chassis number
 * @route GET /api/fleet/chassis/:chassis_number
 */
const findVehicleByChassisNumber = async (req, res) => {
  const { chassis_number } = req.params; // Extract chassis number from request params

  try {
    const vehicle = await Fleet.findOne({ where: { chassis_number } }); // Find vehicle by chassis number
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' }); // Return 404 if vehicle doesn't exist
    }

    res.json(vehicle); // Return the found vehicle as JSON
  } catch (error) {
    console.error('Error finding vehicle by chassis number:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error finding vehicle by chassis number', error: error.message }); // Return 500 status code with error message
  }
};

// controllers/fleetController.js
 const unassignDriverFromFleet = async (req, res) => {
  const  {fleetId}  = req.params;

  try {
    console.log(fleetId);
    const fleet = await Fleet.findByPk(fleetId);
    if (!fleet) return res.status(404).json({ message: "Fleet what vehicle not found." });

    if (!fleet.driver_id) return res.status(400).json({ message: "No driver is assigned to this vehicle." });

    fleet.driver_id = null;
    await fleet.save();

    res.status(200).json({ message: "Driver unassigned successfully.", fleet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Assing Driver to Fleet
 const AssignDriverToFleet = async (req, res) => {
  const  {fleetId}  = req.params;
  console.log(fleetId);
  const {driverId} = req.body;
  console.log(driverId);

  try {
    const fleet = await Fleet.findByPk(fleetId);
    if (!fleet) return res.status(404).json({ message: "Fleet vehicle not found." });

    if (fleet.driver_id) {
      return res.status(400).json({ message: "This vehicle already has a driver assigned." });
    }
    fleet.driver_id = driverId;
    await fleet.save();

    res.status(200).json({ message: "Driver assigned successfully.", fleet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllFleet,
  addVehicleToFleet,
  updateVehicleInFleet,
  deleteVehicleFromFleet,
  findVehicleByChassisNumber,
  unassignDriverFromFleet,
  AssignDriverToFleet,
};
