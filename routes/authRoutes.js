const express = require('express');
const { check } = require('express-validator');
const { register, login, updateProfile, getCurrentUserProfile } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required and should be at least 6 characters').isLength({ min: 6 })
], register);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], login);

router.put('/updateProfile',authMiddleware,updateProfile);
router.get('/current', authMiddleware, getCurrentUserProfile);

module.exports = router;
