const express = require('express');
const router = express.Router();

const { testPageHandler, resultPageHandler } = require('../handlers');

// Test page endpoint
router.get('/test', testPageHandler);

// Result page endpoint
router.post('/result', resultPageHandler);

module.exports = router;
