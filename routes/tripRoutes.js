const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');  // Import your JWT auth middleware
const { getAllTrips, addTrip, updateTrip, deleteTrip, findTripsByDriver } = require('../controllers/tripController');

// Route to get all trips
router.get('/', getAllTrips);

// Route to add a new trip
router.post('/', authMiddleware,addTrip);

// Route to update a trip by ID
router.put('/:id', authMiddleware, updateTrip);

// Route to delete a trip by ID
router.delete('/:id', authMiddleware, deleteTrip);

// Route to find trips by driver ID
router.get('/driver', authMiddleware, findTripsByDriver);

module.exports = router;
