const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {

    const { fullName, age, city, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);  // Log hashed password to ensure it's being generated
    
    // Create the new user
    const newUser = await User.create({
      fullName,
      age,
      city,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully', users: newUser });
  } catch (error) {
    console.error('Error during registration:', error);  // Log detailed error
    res.status(500).json({ error: 'Error registering user.' });
  }
});


module.exports = router;
