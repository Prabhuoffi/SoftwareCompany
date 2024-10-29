// models/Feature.js
const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Feature = mongoose.model('Feature', FeatureSchema);
module.exports = Feature;
