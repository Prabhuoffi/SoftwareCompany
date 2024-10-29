// controllers/partnerController.js
const Partner = require('../../models/Partner/Partner');

// Get all partners
exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add or update a partner
exports.addOrUpdatePartner = async (req, res) => {
  const { id, name, logo, website, description, testimonial } = req.body;

  try {
    if (id) {
      // Update existing partner
      const updatedPartner = await Partner.findByIdAndUpdate(
        id,
        { name, logo, website, description, testimonial },
        { new: true }
      );
      return res.json(updatedPartner);
    } else {
      // Create a new partner
      const newPartner = new Partner({ name, logo, website, description, testimonial });
      const savedPartner = await newPartner.save();
      return res.status(201).json(savedPartner);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a partner
exports.deletePartner = async (req, res) => {
    try {
      const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
      
      // Check if the partner was found and deleted
      if (!deletedPartner) {
        return res.status(404).json({ message: "Partner not found" });
      }
  
      // Send a success message along with a 200 status
      res.status(200).json({ message: "Partner deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  