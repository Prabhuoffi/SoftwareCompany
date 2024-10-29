const express = require('express');
const router = express.Router();
const { getAllServices, addService, updateService, deleteService } = require('../../controllers/LandingPage/services');

// Get all services
router.get('/', getAllServices);

// Add a new service
router.post('/', addService);

// Update a service by ID
router.put('/:id', updateService);

// Delete a service by ID
router.delete('/:id', deleteService);

module.exports = router;
