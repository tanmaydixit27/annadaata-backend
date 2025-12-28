const express = require('express');
const { chatCompletion } = require('../controllers/aiController');
// const { protect } = require('../middleware/authMiddleware'); // ← Comment out (or delete)

const router = express.Router();

// Temporarily without auth for testing
router.post('/chat', chatCompletion);  // ← No protect here

// For later (after testing): router.post('/chat', protect, chatCompletion);

module.exports = router;
