const Faq = require('../../models/FAQ/faq');

// Get all FAQs
const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new FAQ
const createFaq = async (req, res) => {
  const { question, answer } = req.body;

  const newFaq = new Faq({
    question,
    answer,
  });

  try {
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an FAQ
const updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const updatedFaq = await Faq.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    if (!updatedFaq) return res.status(404).json({ message: 'FAQ not found' });
    res.json(updatedFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete an FAQ
const deleteFaq = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq) return res.status(404).json({ message: 'FAQ not found' });
    res.json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
};

