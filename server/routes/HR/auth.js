const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../../controllers/HR/authControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;