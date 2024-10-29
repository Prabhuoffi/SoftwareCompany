// models/ContactInfo.js
const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
