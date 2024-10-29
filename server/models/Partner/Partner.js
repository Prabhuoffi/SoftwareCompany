// models/Partner.js
const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  testimonial: {
    type: String,
    required: true,
  },
});

const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;
