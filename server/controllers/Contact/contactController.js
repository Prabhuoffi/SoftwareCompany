// controllers/contactController.js
const ContactInfo = require("../../models/Contact/ContactInfo");

// Create new contact info
exports.createContactInfo = async (req, res) => {
  const { phone, location, email } = req.body;

  const newContactInfo = new ContactInfo({
    phone,
    location,
    email,
  });

  try {
    const savedContactInfo = await newContactInfo.save();
    res.status(201).json(savedContactInfo);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact info" });
  }
};

// Get contact info
exports.getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findOne(); // Assume single entry
    if (!contactInfo) {
      return res.status(404).json({ message: "Contact info not found" });
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact info" });
  }
};

// Update contact info
exports.updateContactInfo = async (req, res) => {
  const { id } = req.params; // Extract the id from the route parameter
  const { phone, location, email } = req.body;

  try {
    const contactInfo = await ContactInfo.findByIdAndUpdate(
      id, // Use the provided id to find the document
      { phone, location, email },
      { new: true } // Return the updated document
    );

    if (!contactInfo) {
      return res.status(404).json({ message: "Contact info not found" });
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact info" });
  }
};

// Delete contact info
exports.deleteContactInfo = async (req, res) => {
  const { id } = req.params; // Extract the id from the route parameter

  try {
    const result = await ContactInfo.findByIdAndDelete(id); // Delete the document by id
    if (!result) {
      return res.status(404).json({ message: "Contact info not found" });
    }
    res.json({ message: "Contact information deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact info" });
  }
};
