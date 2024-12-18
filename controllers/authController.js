const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  console.log("Register request body:", req.body);

  const { fullName, email, password, contactNo, pinCode, address, gender } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Save new user
    const newUser = new User({
      fullName,
      email,
      password,
      contactNo,
      pinCode,
      address,
      gender,
    });

    console.log("Saving new user...");
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("User registered successfully");
    res.status(201).json({ token, user: { id: newUser._id, fullName, email } });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  console.log("Login request body:", req.body);

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("User logged in successfully");
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (error) {
    console.error("Error logging in user:", error.message);
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
