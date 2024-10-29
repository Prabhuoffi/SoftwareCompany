const express = require('express');
const router = express.Router();
const { getAllTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } = require('../../controllers/LandingPage/testimonials');

// Get all testimonials
router.get('/', getAllTestimonials);

// Add a new testimonial
router.post('/', addTestimonial);

// Update a testimonial by ID
router.put('/:id', updateTestimonial);

// Delete a testimonial by ID
router.delete('/:id', deleteTestimonial);

module.exports = router;
