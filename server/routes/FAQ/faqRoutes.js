const express = require('express');
const { getAllFaqs, createFaq, updateFaq, deleteFaq } = require('../../controllers/FAQ/faqController');

const router = express.Router();

// @route GET /api/faqs
router.get('/', getAllFaqs);

// @route POST /api/faqs
router.post('/', createFaq);

// @route PUT /api/faqs/:id
router.put('/:id', updateFaq);

// @route DELETE /api/faqs/:id
router.delete('/:id', deleteFaq);

module.exports = router;
