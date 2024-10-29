// controllers/featureController.js
const Feature = require('../../models/LandingPage/Feature');

// Get all features
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new feature
exports.createFeature = async (req, res) => {
  const { title, description, image } = req.body; // Ensure 'image' is being used correctly
  try {
    const newFeature = new Feature({ title, description, image }); // Use 'image' instead of 'icon'
    await newFeature.save();
    res.status(201).json(newFeature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a feature
exports.updateFeature = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  try {
    const updatedFeature = await Feature.findByIdAndUpdate(
      id,
      { title, description, image }, // Ensure 'image' is used here as well
      { new: true }
    );
    res.json(updatedFeature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a feature
exports.deleteFeature = async (req, res) => {
  const { id } = req.params;
  try {
    await Feature.findByIdAndDelete(id);
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
