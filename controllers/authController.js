const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation Errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, contactNo, pinCode, address, gender } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('Email already registered:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      contactNo,
      pinCode,
      address,
      gender,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: newUser._id, fullName, email } });
  } catch (error) {
    console.error('Error in register function:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation Errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (error) {
    console.error('Error in login function:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateProfile = async(req,res)=>{
  const {fullName, contactNo, pinCode, address, gender} = req.body;

  try{
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({message:'User not Found'});

    user.fullName = fullName || user.fullName;
    user.contactNo = contactNo || user.contactNo;
    user.pinCode = pinCode || user.pinCode;
    user.address = address || user.address;
    user.gender = gender || user.gender;
    await user.save();
    res.json({message: 'Profile updated successfully',user});
  }catch(error){
    res.status(500).json({message:'Server error'});
  }
};

exports.getCurrentUserProfile = async(req,res) =>{
  try{
    const user = await User.findById(req.user.id).select('-password');
    if(!user)return res.status(404).json({message: 'User not found'});

    res.json(user);
  }catch(error){
    res.status(500).json({ message: 'Server error'});
  }
};
