const express = require('express');
const router = express.Router();
const {
  getAllMaintenanceRecords,
  addMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
  findMaintenanceRecordsByVehicle,
  findMaintenanceRecordsByDriver
} = require('../controllers/maintenanceController');
const authMiddleware = require('../middleware/auth');

// Route to get all maintenance records
router.get('/' , getAllMaintenanceRecords);

// Route to add a new maintenance record
router.post('/', authMiddleware , addMaintenanceRecord);

// Route to update a maintenance record by ID
router.put('/:id', authMiddleware , updateMaintenanceRecord);

// Route to delete a maintenance record by ID
router.delete('/:id', authMiddleware , deleteMaintenanceRecord);

// Route to find maintenance records by vehicle ID
router.get('/vehicle/:vehicle_id', authMiddleware , findMaintenanceRecordsByVehicle);

// Route to find maintenance records by driver id 
router.get('/driver', authMiddleware , findMaintenanceRecordsByDriver); // New route
module.exports = router;
