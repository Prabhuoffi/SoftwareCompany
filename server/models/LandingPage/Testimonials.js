// models/Testimonial.js
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String },
  image: { type: String },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
