const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fullName, email, password, contactNo, pinCode, address, gender } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newUser = new User({ fullName, email, password, contactNo, pinCode, address, gender });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: newUser._id, fullName, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (error) {
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