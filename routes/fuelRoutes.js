const express = require('express');
const router = express.Router();
const {
  getAllFuelLogs,
  addFuelLog,
  updateFuelLog,
  deleteFuelLog,
  findFuelLogsByDriver,
  getFuelAnalytics,
} = require('../controllers/fuelController');
const authMiddleware = require('../middleware/auth');

// Route to get all fuel logs
router.get('/', getAllFuelLogs);

// Route to add a new fuel log
router.post('/', authMiddleware, addFuelLog);

// Route to update a fuel log by ID
router.put('/:id', authMiddleware, updateFuelLog);

// Route to delete a fuel log by ID
router.delete('/:id', authMiddleware, deleteFuelLog);

// Route to find fuel logs by driver ID
router.get('/driver', authMiddleware, findFuelLogsByDriver);

router.get('/analytics' , getFuelAnalytics);

module.exports = router;
