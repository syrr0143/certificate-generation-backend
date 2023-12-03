const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv')
const employee = require('../model/employeeModel');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();
dotenv.config();
router.get('/protected', authMiddleware, (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.status(200).json({ message: 'This is a protected route', user: req.employee });
});

// Signup route is POST: http://localhost:4000/signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { name, password, employee_id, dob, email, mobileNumber, address } = req.body;

    // Check if the username is already taken
    const existingEmployee = await employee.findOne({ employee_id });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Username already exists', existingEmployee });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee with the hashed password
    const newEmployee = new employee({
      name,
      "password": hashedPassword, // Save the hashed password
      employee_id,
      dob,
      email,
      mobileNumber,
      address,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Login route is POST: http://localhost:4000/login
router.post('/login', async (req, res) => {
  try {
    const { employee_id, password } = req.body;

    // Check if the employee exists
    const foundEmployee = await employee.findOne({ employee_id });

    if (!foundEmployee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(foundEmployee.password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password.trim(), foundEmployee.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ employeeId: foundEmployee._id }, process.env.secret_key, {
      expiresIn: '7d',
    }); // Replace 'your-secret-key' with your actual secret key

    // Set the token as a cookie (optional)
    res.cookie('token', token, { httpOnly: true, maxAge: 604800000 }); // Max age is set to 1 hour in milliseconds

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
