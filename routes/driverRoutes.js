const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Route to get all drivers Route = http://localhost:5001/api/drivers
router.get('/', driverController.getAllDrivers);

// Route to add a new driver Route = http://localhost:5001/api/drivers
router.post('/', driverController.addDriver);

// Route to update a driver by ID Route = http://localhost:5001/api/drivers/id
router.put('/:id', driverController.updateDriver);

router.get('/:id', driverController.getDriverById);

// Route to delete a driver by ID Route = http://localhost:5001/api/drivers/id
router.delete('/:id', driverController.deleteDriver);

// Route to find a driver by username Route = http://localhost:5001/api/drivers//username/driver_name
router.get('/username/:username', driverController.findDriverByUsername);

module.exports = router;
