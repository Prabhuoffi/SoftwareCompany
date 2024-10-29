// routes/featureRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} = require('../../controllers/LandingPage/featureController');

// Get all features
router.get('/', getAllFeatures);

// Create a new feature
router.post('/', createFeature);

// Update a feature
router.put('/:id', updateFeature);

// Delete a feature
router.delete('/:id', deleteFeature);

module.exports = router;
