// routes/applicationRoutes.js

const express = require('express');
const router = express.Router();
const { applyJob, getApplications } = require('../../controllers/HR/applicationControllers');
const { protect, admin } = require('../../middleware/authmiddleware');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Resumes must be PDF or DOC/DOCX'));
    }
  },
});

// Routes
router.post('/', upload.single('resume'), applyJob);
router.get('/', protect, admin, getApplications);

module.exports = router;
