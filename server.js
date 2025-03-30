const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { authenticateDatabase } = require('./config/db');

// Import Routes
const authRoutes = require('./routes/auth');
const driverRoutes = require('./routes/driverRoutes');
const fleetRoutes = require('./routes/fleetRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tripRoutes = require('./routes/tripRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const fuelRoutes = require('./routes/fuelRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  process.env.FRONTEND_URL // Ensure frontend URL is in env for production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed for this origin'), false);
  },
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/fuel', fuelRoutes);

// Root Route
app.get('/', (req, res) => {
  res.status(200).send("API is working properly!");
});

// Start Server & Authenticate Database
app.listen(PORT, async () => {
  try {
    await authenticateDatabase();
    console.log(`✅ Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process if DB fails
  }
});