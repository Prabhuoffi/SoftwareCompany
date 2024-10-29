const Testimonial = require('../../models/LandingPage/testimonials');

// Get all testimonials
const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new testimonial
const addTestimonial = async (req, res) => {
    const testimonial = new Testimonial({
        quote: req.body.quote,
        name: req.body.name,
        position: req.body.position,
        image: req.body.image,
    });

    try {
        const newTestimonial = await testimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a testimonial
const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        // Update fields if provided
        if (req.body.quote) testimonial.quote = req.body.quote;
        if (req.body.name) testimonial.name = req.body.name;
        if (req.body.position) testimonial.position = req.body.position;
        if (req.body.image) testimonial.image = req.body.image;

        const updatedTestimonial = await testimonial.save();
        res.json(updatedTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        await Testimonial.deleteOne({ _id: req.params.id }); // Using deleteOne instead of remove
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getAllTestimonials, addTestimonial, updateTestimonial, deleteTestimonial };
