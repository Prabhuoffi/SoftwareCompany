const Service = require('../../models/Service/services');

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new service
const addService = async (req, res) => {
  const { icon, title, description } = req.body;

  const newService = new Service({
    icon,
    title,
    description,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllServices, addService };
