// server.js
require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');
const authRoutes = require('./routes/HR/auth');
const jobRoutes = require('./routes/HR/jobsRoute');
const applicationRoutes = require('./routes/HR/applicationRoutes');
const featureRoutes = require('./routes/LandingPage/featureRoutes');
const emailRouter = require('./email'); // Import the email router
const testimonialsRoute = require('./routes/LandingPage/testimonials');
const servicesRoute = require('./routes/LandingPage/services');
const AboutusRoute = require('./routes/Aboutus/team');
const serviceRoutes = require('./routes/Service/servicesRoutes');
const faqRoutes = require('./routes/FAQ/faqRoutes');
const partnerRoutes = require('./routes/Partner/partners');
const blogPostRoutes = require('./routes/Blog/blogPostRoutes');
const contactRoutes = require('./routes/Contact/contactRoutes')

const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
ConnectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.get('/', (req, res) => {
    res.send("Start server");
});
app.use('/', emailRouter);

// admin-routes

app.use('/api/testimonials', testimonialsRoute);
app.use('/api/features', featureRoutes);
app.use('/api/services', servicesRoute);
app.use('/api/team',AboutusRoute);
app.use('/api/services/service', serviceRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use("/api/contact-info", contactRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
