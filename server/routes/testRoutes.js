const express = require('express');
const router = express.Router();
const { testConnection } = require('../controllers/testController');

// Test database connection endpoint
router.get('/db', testConnection);

module.exports = router;

