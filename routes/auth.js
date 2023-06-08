const express = require('express');
const router = express.Router();

const { registerHandler, loginHandler } = require('../handlers');

// Register endpoint
router.post('/register', registerHandler);

// Login endpoint
router.post('/login', loginHandler);

module.exports = router;
