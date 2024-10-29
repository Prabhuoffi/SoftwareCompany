// routes/partners.js
const express = require('express');
const router = express.Router();
const partnerController = require('../../controllers/Partner/partnerController');

// Get all partners
router.get('/', partnerController.getPartners);

// Add or update a partner
router.post('/', partnerController.addOrUpdatePartner);

// Delete a partner
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
