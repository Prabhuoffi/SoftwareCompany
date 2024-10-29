// controllers/serviceController.js
const Service = require('../../models/LandingPage/services');

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
    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image, // Ensure this matches your property name
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a service
// Update a service
const updateService = async (req, res) => {
    try {
        // Find and update the service in one step
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                }
            },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Delete a service
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await Service.findByIdAndDelete(req.params.id); // Replace remove() with findByIdAndDelete()
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getAllServices, addService, updateService, deleteService };
