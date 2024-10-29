const express = require('express');
const router = express.Router();
const { getAllServices, addService } = require('../../controllers/Service/serviceController');

// Get all services
router.get('/', getAllServices);

// Add a new service
router.post('/', addService);

module.exports = router;
