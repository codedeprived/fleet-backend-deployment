const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const { authenticateDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const driverRoutes = require('./routes/driverRoutes');
const fleetRoutes = require('./routes/fleetRoutes'); 
const adminRoutes = require('./routes/adminRoutes')
const tripRoutes = require('./routes/tripRoutes')
const maintenanceRoutes = require('./routes/maintenanceRoutes')
const fuelRoutes = require('./routes/fuelRoutes')

const dotenv = require ('dotenv')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175'] // Add this line to allow requests from your frontend
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);  // auth routes
app.use('/api/drivers', driverRoutes); // Add the driver routes 
app.use('/api/fleet', fleetRoutes); // Add the fleet routes 
app.use('/api/admin', adminRoutes); // Add the admiin routes 
app.use('/api/trip', tripRoutes); // Add the trip routes 
app.use('/api/maintenance', maintenanceRoutes); // Add the maintenance routes 
app.use('/api/fuel' , fuelRoutes);// Fuel Routes;

// Define a route to handle GET requests to the root URL ('/')
app.get('/', (req, res) => {
  return res.send("API is working properly yup");
});

// Start the server and authenticate the database
app.listen(PORT, async () => {
  console.log(`Server started successfully on http://localhost:${PORT}`);
  await authenticateDatabase();
});
