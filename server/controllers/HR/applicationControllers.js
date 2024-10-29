// controllers/applicationControllers.js

const Application = require('../../models/HR/Applications');

// Apply for a Job
exports.applyJob = async (req, res) => {
  const { name, email, position } = req.body;
  const resumePath = req.file ? req.file.path.replace(/\\/g, '/') : null; // Normalize path for Windows

  if (!resumePath) {
    return res.status(400).json({ message: 'Resume is required' });
  }

  // Construct the URL for the resume
  const resumeUrl = `${req.protocol}://${req.get('host')}/${resumePath}`;

  try {
    const application = await Application.create({
      name,
      email,
      position,
      resume: resumeUrl, // Store the URL instead of the path
    });
    res.status(201).json({ message: 'Application submitted successfully', applicationId: application._id });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Applications (Admin)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.json(applications); // Each application will have the resume URL
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
