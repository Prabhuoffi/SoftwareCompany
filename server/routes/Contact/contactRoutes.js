// routes/contactRoutes.js
const express = require("express");
const { getContactInfo, updateContactInfo, deleteContactInfo, createContactInfo } = require("../../controllers/Contact/contactController");

const router = express.Router();

// Route to get contact information
router.get("/", getContactInfo);

// Route to create new contact information
router.post("/", createContactInfo);

// Route to update contact information
router.put("/:id", updateContactInfo);

// Route to delete contact information
router.delete("/:id", deleteContactInfo);

module.exports = router;
