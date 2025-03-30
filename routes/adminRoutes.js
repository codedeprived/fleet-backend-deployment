const express = require('express');
const router = express.Router();
const {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  findAdminByUsername,
} = require('../controllers/adminController');

// Get all admins
router.get('/', getAllAdmins);

// Add a new admin
router.post('/', addAdmin);

// Update an admin by ID
router.put('/:id', updateAdmin);

// Delete an admin by ID
router.delete('/:id', deleteAdmin);

// Find an admin by username
router.get('/username/:username', findAdminByUsername);

module.exports = router;

