// controllers/tripController.js
const Trip = require('../models/Trip'); // Sequelize Trip model

// Get all trips
const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll(); // Fetch all trips
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trips', error });
    }
};

// Add a new trip
const addTrip = async (req, res) => {
    try {
        // Extract driver_id from the JWT token (assuming you have middleware to decode the JWT and add driver_id to req)
        const driver_id = req.user.driver_id; // req.user should have been populated by authentication middleware

        // Destructure fields from req.body
        const { start_location, end_location, start_time, end_time, distance_km, purpose } = req.body;

        // Create a new trip record
        const trip = await Trip.create({
            driver_id,
            start_location,
            end_location,
            start_time,
            end_time,
            distance_km,
            purpose
        });

        // Respond with the created trip
        res.status(201).json(trip);
    } catch (error) {
        console.error('Error adding trip:', error);
        res.status(500).json({ message: 'Error adding trip', error });
    }
};


// Update a trip by ID
const updateTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTrip = await Trip.update(req.body, {
            where: { id },
            returning: true, // Get the updated trip back
        });

        if (updatedTrip[0] === 0) return res.status(404).json({ message: 'Trip not found' });

        res.status(200).json(updatedTrip[1][0]); // Return the updated trip
    } catch (error) {
        res.status(500).json({ message: 'Error updating trip', error });
    }
};

// Delete a trip by ID
const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTrip = await Trip.destroy({
            where: { id },
        });

        if (deletedTrip === 0) return res.status(404).json({ message: 'Trip not found' });

        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trip', error });
    }
};

// Find trips by driver ID (using JWT's driverId)
const findTripsByDriver = async (req, res) => {
    try {
        const driverId = req.user.driver_id; // Access the driverId from the JWT payload (req.user.id is set by authMiddleware)
        if (!driverId) {
            return res.status(400).json({ message: 'Driver ID not found in the token.' });
        }

        // Assuming you have the driver_id field in the trips table
        const trips = await Trip.findAll({
            where: { driver_id: driverId },
        });

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found for this driver.' });
        }

        res.status(200).json(trips); // Return the trips for the logged-in driver
    } catch (error) {
        console.error('Error retrieving trips by driver:', error);
        res.status(500).json({ message: 'Error retrieving trips by driver', error: error.message });
    }
};


module.exports = {
    getAllTrips,
    addTrip,
    updateTrip,
    deleteTrip,
    findTripsByDriver,
};
