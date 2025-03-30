// routes/auth.js
const express = require('express');
const { driverRegister ,adminRegister ,driverLogin, adminLogin} = require('../controllers/authController');

const router = express.Router();
 
// Registration route for driver 
router.post('/driver/register', driverRegister);
// Registration route admin
router.post('/admin/register', adminRegister);


// Post request for driver login 
router.post('/driver/login',driverLogin)
// Post request for admin login 
router.post('/admin/login',adminLogin)

module.exports = router;
