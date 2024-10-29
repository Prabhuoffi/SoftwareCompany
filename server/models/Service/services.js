const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  title: {  // Updated from 'name' to 'title'
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Services', servicesSchema);
