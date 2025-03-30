const express = require('express');
const router = express.Router();
const {
  getAllFleet,
  addVehicleToFleet,
  updateVehicleInFleet,
  deleteVehicleFromFleet,
  findVehicleByChassisNumber,
  unassignDriverFromFleet,
  AssignDriverToFleet,
} = require('../controllers/fleetController');

// Get all fleet vehicles
router.get('/', getAllFleet);

// Add a new vehicle to the fleet
router.post('/', addVehicleToFleet);

// Update a vehicle in the fleet by ID
router.put('/:id', updateVehicleInFleet);

// Delete a vehicle from the fleet by ID
router.delete('/:id', deleteVehicleFromFleet);

// Find a vehicle by chassis number
router.get('/chassis/:chassis_number', findVehicleByChassisNumber);

// Unassign driver route
router.post('/unassign-driver/:fleetId', unassignDriverFromFleet); 

// Assign driver to fleet
router.put('/assign-driver/:fleetId', AssignDriverToFleet);
// get all vehicle associated by driver id. 



module.exports = router;
