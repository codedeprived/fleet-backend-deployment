const Fuel = require('../models/Fuel');

// Fetch all fuel logs
const getAllFuelLogs = async (req, res) => {
    try {
        const fuelLogs = await Fuel.findAll();

        if (!fuelLogs.length) {
            return res.status(404).json({ message: 'No fuel logs found' });
        }

        res.status(200).json(fuelLogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all fuel logs', error: error.message });
    }
};

// Fetch fuel logs for a specific driver
const findFuelLogsByDriver = async (req, res) => {
    try {
        const { driver_id } = req.user;

        if (!driver_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const fuelLogs = await Fuel.findAll({
            where: { driver_id },
        });

        if (!fuelLogs.length) {
            return res.status(404).json({ message: 'No fuel logs found for this driver' });
        }

        res.status(200).json(fuelLogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fuel logs for driver', error: error.message });
    }
};

// Add a new fuel log
const addFuelLog = async (req, res) => {
    try {
        const { driver_id } = req.user;

        if (!driver_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { vehicle_id, fuel_in_liters, cost, location } = req.body;

        if (!vehicle_id || !fuel_in_liters || !cost || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newFuelLog = await Fuel.create({
            vehicle_id,
            driver_id,
            fuel_in_liters,
            cost,
            location,
        });

        res.status(201).json(newFuelLog);
    } catch (error) {
        res.status(500).json({ message: 'Error adding fuel log', error: error.message });
    }
};

const getFuelAnalytics = async (req, res) => {
    try {
      // Total fuel consumed
      const totalFuel = await Fuel.sum('fuel_in_liters');
  
      // Fetch detailed logs
      const logs = await Fuel.findAll({
        attributes: ['fuel_in_liters', 'cost', 'location', 'vehicle_id', 'driver_id', 'created_at'],
        order: [['created_at', 'DESC']],
      });
  
      res.status(200).json({
        totalFuel,
        logs,
      });
    } catch (error) {
      console.error('Error fetching fuel analytics:', error);
      res.status(500).json({ error: 'An error occurred while fetching fuel analytics.' });
    }
  };

// Update a fuel log by ID
const updateFuelLog = async (req, res) => {
    const { id } = req.params;

    try {
        const { role, driver_id } = req.user;
        const fuelLog = await Fuel.findByPk(id);

        if (!fuelLog) {
            return res.status(404).json({ message: 'Fuel log not found' });
        }

        if (role !== 'admin' && fuelLog.driver_id !== driver_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { vehicle_id, fuel_in_liters, cost, location } = req.body;

        fuelLog.vehicle_id = vehicle_id || fuelLog.vehicle_id;
        fuelLog.fuel_in_liters = fuel_in_liters || fuelLog.fuel_in_liters;
        fuelLog.cost = cost || fuelLog.cost;
        fuelLog.location = location || fuelLog.location;

        await fuelLog.save();

        res.status(200).json(fuelLog);
    } catch (error) {
        res.status(500).json({ message: 'Error updating fuel log', error: error.message });
    }
};

// Delete a fuel log by ID
const deleteFuelLog = async (req, res) => {
    const { id } = req.params;

    try {
        const { role, driver_id } = req.user;
        const fuelLog = await Fuel.findByPk(id);

        if (!fuelLog) {
            return res.status(404).json({ message: 'Fuel log not found' });
        }

        if (role !== 'admin' && fuelLog.driver_id !== driver_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await fuelLog.destroy();

        res.json({ message: 'Fuel log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fuel log', error: error.message });
    }
};

module.exports = {
    getAllFuelLogs,
    findFuelLogsByDriver,
    addFuelLog,
    updateFuelLog,
    deleteFuelLog,
    getFuelAnalytics,
};
